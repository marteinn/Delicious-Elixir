defmodule DeliciousElixir.UserController do
  use DeliciousElixir.Web, :controller

  alias DeliciousElixir.{User, Link}

  plug Guardian.Plug.EnsureAuthenticated, handler: DeliciousElixir.SessionController

  def get_stats(conn, username) do
    user = Guardian.Plug.current_resource(conn)
    link_count = Link
               |> Link.by_user(username)
               |> Link.public_only(username != user.username)
               |> Repo.aggregate(:count, :id)
    %{
      "link_count" => link_count,
    }
  end

  def show_current(conn, _) do
    user = Guardian.Plug.current_resource(conn)
    stats = get_stats(conn, user.username)

    conn
    |> put_status(:ok)
    |> render("show.json", user: user, stats: stats)
  end

  def show(conn, %{"username" => username}) do
    user = Repo.get_by(User, username: username)
    stats = get_stats(conn, username)

    conn
    |> put_status(:ok)
    |> render("show.json", user: user, stats: stats)
  end
end
