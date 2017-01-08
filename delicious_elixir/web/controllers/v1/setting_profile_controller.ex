defmodule DeliciousElixir.SettingProfileController do
  use DeliciousElixir.Web, :controller
  alias DeliciousElixir.User

  plug Guardian.Plug.EnsureAuthenticated, handler: DeliciousElixir.SessionController

  def update(conn, params) do
    user = Guardian.Plug.current_resource(conn)

    conn
    |> put_status(:ok)
    |> render("show.json", user: user)
  end

  #def change_password(conn, params) do
  #end
end
