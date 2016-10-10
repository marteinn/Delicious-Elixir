defmodule DeliciousElixir.ApiLinkController do
  use DeliciousElixir.Web, :controller
  alias DeliciousElixir.Repo
  alias DeliciousElixir.Link

  def index(conn, _params) do
    api_links = Repo.all(Link)
    render conn, api_links: api_links
  end
end
