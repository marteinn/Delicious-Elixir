defmodule DeliciousElixir.CurrentUserController do
  use DeliciousElixir.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, handler: DeliciousElixir.SessionController

  def show(conn, _) do
    user = Guardian.Plug.current_resource(conn)

    conn
    |> put_status(:ok)
    |> render("show.json", user: user)
  end

end
