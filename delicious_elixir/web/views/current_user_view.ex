defmodule DeliciousElixir.CurrentUserView do
  use DeliciousElixir.Web, :view

  def render("show.json", %{user: user}) do
    user
  end
end
