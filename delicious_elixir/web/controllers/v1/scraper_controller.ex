defmodule DeliciousElixir.ScraperController do
  use DeliciousElixir.Web, :controller

  alias DeliciousElixir.{Repo, Link, Tag, Endpoint}

  plug Guardian.Plug.EnsureAuthenticated, handler: DeliciousElixir.SessionController

  def create(conn, %{"url" => url}) do
    html = HTTPoison.get!(url, [], [follow_redirect: true]).body

    title = html |> Floki.find("title") |> Floki.text
    description = html
                  |> Floki.find("meta[name=description]")
                  |> Floki.attribute("content")
                  |> List.first

    meta = %{
      :title => title,
      :description => description,
      :url => url,
    }

    conn
    |> put_status(:created)
    |> render("show.json", meta: meta)

  end
end
