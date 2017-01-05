defmodule DeliciousElixir.UserController do
  use DeliciousElixir.Web, :controller

  alias DeliciousElixir.{User}

  plug Guardian.Plug.EnsureAuthenticated, handler: DeliciousElixir.SessionController

  def show_current(conn, _) do
    user = Guardian.Plug.current_resource(conn)

    conn
    |> put_status(:ok)
    |> render("show.json", user: user)
  end

  def show(conn, %{"username" => username}) do
    user = Repo.get_by(User, username: username)

    conn
    |> put_status(:ok)
    |> render("show.json", user: user)
  end
end
