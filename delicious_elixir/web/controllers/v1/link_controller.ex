defmodule DeliciousElixir.LinkController do
  use DeliciousElixir.Web, :controller

  alias DeliciousElixir.{Repo, Link, Endpoint}
  alias DeliciousElixir.{Pagination}
  alias DeliciousElixir.{LinkView}

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

    link = Repo.get!(Link, id)
    changeset = Link.changeset(link, link_params)

    case Repo.update(changeset) do
      {:ok, link} ->
        link = Repo.preload(link, [:user])

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

    conn
    |> put_status(:unprocessable_entity)
    |> render("update.json", user: current_user)
  end


  def delete(conn, %{"id" => id}) do
    {id, _} = Integer.parse(id)
    current_user = Guardian.Plug.current_resource(conn)

    link = Repo.get!(Link, id) |> Repo.preload([:user])
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
