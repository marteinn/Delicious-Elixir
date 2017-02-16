defmodule DeliciousElixir.ScraperView do
  use DeliciousElixir.Web, :view

  def render("show.json", %{meta: meta}) do
    %{
      scraper: %{
        title: meta.title,
        description: meta.description,
        url: meta.url,
      }
    }
  end
end
