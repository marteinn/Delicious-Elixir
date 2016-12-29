defmodule DeliciousElixir.LinkController do
  require IEx

  use DeliciousElixir.Web, :controller

  alias DeliciousElixir.{Repo, Link, Endpoint}
  alias DeliciousElixir.{Pagination}

  plug Guardian.Plug.EnsureAuthenticated, handler: DeliciousElixir.SessionController

  def index(conn, params) do
    links = Link
    links = if Map.has_key?(params, "username") do
              username = Map.get(params, "username")
              links |> Link.by_user(username)
            else
              links
            end

    total_count = links |> Repo.aggregate(:count, :id)

    page_params = params
                  |> Pagination.parse_params
                  |> Map.put("total_count", total_count)

    links = links
            |> Pagination.paginate(page_params)
            |> Repo.all
            |> Repo.preload([:user])

    conn
    |> Pagination.headers(page_params)
    |> render(links: links)
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

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
    end
  end
end
