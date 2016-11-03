defmodule DeliciousElixir.PageController do
  use DeliciousElixir.Web, :controller
  plug :put_layout, "js.html"

  def index(conn, _params) do
    render conn, "index.html"
  end
end
