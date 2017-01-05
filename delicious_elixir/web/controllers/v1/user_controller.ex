defmodule DeliciousElixir.UserController do
  use DeliciousElixir.Web, :controller

  alias DeliciousElixir.{User, Link}

  plug Guardian.Plug.EnsureAuthenticated, handler: DeliciousElixir.SessionController

  def get_stats(username) do
    link_count = Link
               |> Link.by_user(username)
               |> Repo.aggregate(:count, :id)
    %{
      "link_count" => link_count,
    }
  end

  def show_current(conn, _) do
    user = Guardian.Plug.current_resource(conn)
    stats = get_stats(user.username)

    conn
    |> put_status(:ok)
    |> render("show.json", user: user, stats: stats)
  end

  def show(conn, %{"username" => username}) do
    user = Repo.get_by(User, username: username)
    stats = get_stats(username)

    conn
    |> put_status(:ok)
    |> render("show.json", user: user, stats: stats)
  end
end
