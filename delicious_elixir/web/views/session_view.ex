defmodule DeliciousElixir.SessionView do
  use DeliciousElixir.Web, :view

  def render("show.json", %{jwt: jwt, user: user}) do
    %{
      jwt: jwt,
      user: user,
    }
  end
end