require IEx

defmodule DeliciousElixir.LinkController do
  use DeliciousElixir.Web, :controller
  alias DeliciousElixir.{ Repo, Link}

  plug Guardian.Plug.EnsureAuthenticated, handler: DeliciousElixir.SessionController

  def index(conn, params) do
    filters = Ecto.Changeset.cast(
                                  %Link{},
                                  params,
                                  [],
                                  [:user_id]
                                )
                                |> Map.fetch!(:changes)
                                |> Map.to_list

    links = Link
            |> where(^filters)
            |> Repo.all()
            |> Repo.preload(:user)

    render conn, links: links
  end

  def create(conn, %{"link" => link_params}) do
    user = Guardian.Plug.current_resource(conn)
    link_params = Map.put(link_params, "user_id", user.id)

    changeset = Link.changeset(%Link{}, link_params)

    case Repo.insert(changeset) do
      {:ok, link} ->

        link = Repo.preload(link, [:user])

        conn
        |> put_status(:created)
        |> render("show.json", link: link)
    end
  end
end
