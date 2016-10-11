defmodule DeliciousElixir.ApiLinkControllerTest do
  use DeliciousElixir.ConnCase

  alias DeliciousElixir.Link
  alias DeliciousElixir.User
  alias DeliciousElixir.ApiLinkView

  @valid_attrs %{url: "some content", title: "A"}
  @invalid_attrs %{}

  test "lists all links on index", %{conn: conn} do
    conn = get conn, api_link_path(conn, :index)
    assert json_response(conn, 200) == []
  end


  test "lists user links on index", %{conn: conn} do
    user = Repo.insert!(%User{email: "m@m.se"})
    link = Repo.insert!(%Link{
                        url: "a",
                        title: "Title",
                        user_id: user.id
                      })

    conn = get conn, api_link_path(conn, :index)

    api_links = Repo.all(Link) |> Repo.preload(:user)

    data = ApiLinkView.render("index.json", %{api_links: api_links})
    response = json_response(conn, 200)
    assert Enum.at(response, 0)["url"] == link.url
  end
end
