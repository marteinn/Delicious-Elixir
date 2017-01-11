defmodule DeliciousElixir.LinkController do
  use DeliciousElixir.Web, :controller

  alias DeliciousElixir.{Repo, Link, Tag, Endpoint}
  alias DeliciousElixir.{Pagination}
  alias DeliciousElixir.{LinkView}

  plug Guardian.Plug.EnsureAuthenticated, handler: DeliciousElixir.SessionController

  def index(conn, params) do
    user = Guardian.Plug.current_resource(conn)
    username = Map.get(params, "username", nil)

    links = Link
            |> Link.by_user(username)
            |> Link.public_only(username != user.username)

    total_count = links |> Repo.aggregate(:count, :id)

    page_params = params
                  |> Pagination.parse_params
                  |> Map.put("total_count", total_count)

    links = links
            |> Ecto.Query.order_by(desc: :inserted_at)
            |> Pagination.paginate(page_params)
            |> Repo.all
            |> Repo.preload([:user, :tags])

    conn
    |> Pagination.headers(page_params)
    |> render(links: links)
  end

  def create(conn, %{"link" => link_params}) do
    current_user = Guardian.Plug.current_resource(conn)
    link_params = Map.put(link_params, "user_id", current_user.id)

    changeset = %Link{} |> Link.changeset(link_params)
    case Repo.insert(changeset) do
      {:ok, link} ->
        link = link |> Repo.preload([:user, :tags])

        channel = "links:" <> current_user.username

        broadcast_data = LinkView.render("show.json", link: link)

        Endpoint.broadcast(channel, "item:created", broadcast_data)

        conn
        |> put_status(:created)
        |> render("show.json", link: link)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
    end
  end

  def update(conn, %{"id" => id, "link" => link_params}) do
    {id, _} = Integer.parse(id)
    current_user = Guardian.Plug.current_resource(conn)

    link = Repo.get!(Link, id) |> Repo.preload([:user, :tags])
    changeset = Link.changeset(link, link_params)

    case Repo.update(changeset) do
      {:ok, link} ->
        link = Repo.preload(link, [:user, :tags])

        channel = "links:" <> current_user.username
        broadcast_data = Dict.merge(LinkView.render("show.json", link: link),
                                    %{}
        )
        Endpoint.broadcast(channel, "item:updated", broadcast_data)

        conn
        |> put_status(:ok)
        |> render("show.json", link: link)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    {id, _} = Integer.parse(id)
    current_user = Guardian.Plug.current_resource(conn)

    link = Repo.get!(Link, id) |> Repo.preload([:user, :tags])
    broadcast_data = Dict.merge(LinkView.render("show.json", link: link),
                                %{}
                              )
    Repo.delete!(link)

    channel = "links:" <> current_user.username
    Endpoint.broadcast(channel, "item:deleted", broadcast_data)

    conn
    |> send_resp(204, "")
  end
end
