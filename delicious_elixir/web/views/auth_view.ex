defmodule DeliciousElixir.AuthView do
  use DeliciousElixir.Web, :view

  def current_user(conn) do
    DeliciousElixir.Authentication.current_user(conn)
  end
end

