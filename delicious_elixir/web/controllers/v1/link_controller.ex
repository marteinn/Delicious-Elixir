defmodule DeliciousElixir.LinkController do
  use DeliciousElixir.Web, :controller
  alias DeliciousElixir.{Repo, Link, Endpoint}

  plug Guardian.Plug.EnsureAuthenticated, handler: DeliciousElixir.SessionController


  def index(conn, params) do
    links = Link

    links = if Map.has_key?(params, "username") do
              username = Map.get(params, "username")
              links |> Link.by_user(username)
            else
              links
            end

    links = links
            |> Repo.all
            |> Repo.preload([:user])

    render conn, links: links
  end

  def create(conn, %{"link" => link_params}) do
    current_user = Guardian.Plug.current_resource(conn)
    link_params = Map.put(link_params, "user_id", current_user.id)

    changeset = Link.changeset(%Link{}, link_params)

    case Repo.insert(changeset) do
      {:ok, link} ->
        link = Repo.preload(link, [:user])

        channel = "links:" <> current_user.username
        Endpoint.broadcast(channel, "list:updated",
                           %{message: "hello from the console"})

        conn
        |> put_status(:created)
        |> render("show.json", link: link)
    end
  end
end
