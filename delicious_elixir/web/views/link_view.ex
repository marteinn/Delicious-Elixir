defmodule DeliciousElixir.LinkView do
  use DeliciousElixir.Web, :view

  def render("index.json", %{links: links}) do
    render_many(links, __MODULE__, "link.json")
  end

  def render("show.json", %{link: link}) do
    %{data: render_one(link, __MODULE__, "link.json")}
  end

  def render("link.json", %{link: link}) do
    %{
      id: link.id,
      title: link.title,
      url: link.url,
      description: link.description,
      inserted_at: link.inserted_at,
      user: %{
        email: link.user.email,
        username: link.user.username,
        id: link.user.id,
      }
    }
  end
end
