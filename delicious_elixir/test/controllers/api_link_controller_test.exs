defmodule DeliciousElixir.ApiLinkControllerTest do
  use DeliciousElixir.ConnCase

  alias DeliciousElixir.{Link, User}

  @valid_attrs %{url: "some content", title: "A"}
  @invalid_attrs %{}

  test "lists all links on index", %{conn: conn} do
    conn = get conn, api_link_path(conn, :index)
    assert json_response(conn, 200) == []
  end

  test "lists all user links on index", %{conn: conn} do
    changeset = User.changeset(%User{}, %{
                        username: "marteinn",
                        email: "m@m.se",
                        first_name: "Martin",
                        last_name: "Sandström",
                        password: "password",
                      })
    user = Repo.insert!(changeset)
    link = Repo.insert!(%Link{
                        url: "a",
                        title: "Title",
                        user_id: user.id
                      })

    conn = get conn, api_link_path(conn, :index)

    response = json_response(conn, 200)
    assert Enum.at(response, 0)["url"] == link.url
  end


  test "lists user links on index", %{conn: conn} do
    changeset = User.changeset(%User{}, %{
                        username: "marteinn",
                        email: "m@m.se",
                        first_name: "Martin",
                        last_name: "Sandström",
                        password: "password",
                      })
    user = Repo.insert!(changeset)
    Repo.insert!(%Link{
                 url: "a",
                 title: "Title",
                 user_id: user.id
               })

    conn = get conn, api_link_path(conn, :index), %{user_id: 2}
    response = json_response(conn, 200)
    assert response == []
  end
end
