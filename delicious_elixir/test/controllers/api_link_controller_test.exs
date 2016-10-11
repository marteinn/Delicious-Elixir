defmodule DeliciousElixir.ApiLinkControllerTest do
  use DeliciousElixir.ConnCase

  alias DeliciousElixir.Link
  @valid_attrs %{url: "some content", title: "A"}
  @invalid_attrs %{}

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, api_link_path(conn, :index)
    assert json_response(conn, 200) == []
  end
end
