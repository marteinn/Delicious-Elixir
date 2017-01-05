defmodule DeliciousElixir.UserView do
  use DeliciousElixir.Web, :view

  def render("show.json", %{user: user, stats: stats}) do
    %{
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      inserted_at: user.inserted_at,
      stats: stats,
    }
  end
end
