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
      title: link.title,
      url: link.url,
      description: link.description,
      user: link.user.email
    }
  end
end
