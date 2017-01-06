defimpl ExAdmin.Authentication, for: Plug.Conn do
  alias DeliciousElixir.Router.Helpers
  alias DeliciousElixir.Authentication, as: Auth

  def use_authentication?(_), do: true

  def current_user(conn), do: Auth.current_user(conn)

  def current_user_name(conn) do
    user = Auth.current_user(conn).username
  end

  def session_path(conn, action), do: Helpers.auth_path(conn, action)
end


defmodule DeliciousElixir.Authentication do
  def current_user(conn) do
    Guardian.Plug.current_resource(conn)
  end
end
