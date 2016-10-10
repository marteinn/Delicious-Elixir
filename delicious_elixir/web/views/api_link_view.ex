defmodule DeliciousElixir.ApiLinkView do
  use DeliciousElixir.Web, :view

  def render("index.json", %{api_links: api_links}) do
    render_many(api_links, __MODULE__, "link.json")
  end

  def render("show.json", %{api_link: api_link}) do
    %{data: render_one(api_link, __MODULE__, "link.json")}
  end

  def render("link.json", %{api_link: api_link}) do
    %{
      title: api_link.title,
      url: api_link.url,
      description: api_link.description
    }
  end

end
