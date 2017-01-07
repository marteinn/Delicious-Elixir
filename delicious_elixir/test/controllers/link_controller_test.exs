defmodule DeliciousElixir.LinkControllerTest do
  use DeliciousElixir.ConnCase

  alias DeliciousElixir.TestHelpers
  alias DeliciousElixir.Link

  @valid_attrs %{url: "some content", title: "A"}
  @invalid_attrs %{}

  setup do
    user = %{
      username: "example",
      email: "example@example.com",
      first_name: "M",
      last_name: "S",
      password: "password",
    } |> TestHelpers.create_user

    user2 = %{
      username: "example2",
      email: "example2@example.com",
      first_name: "M",
      last_name: "S",
      password: "password",
    } |> TestHelpers.create_user

    %{
      user: user,
      user2: user2,
    }
  end

  test "links requires auth", %{conn: conn} do
    conn = conn |> get("/api/v1/links")

    assert json_response(conn, 403) == %{"error" => "Not Authenticated"}
  end

  test "lists all links on index", %{conn: conn, user: user} do
    conn = conn
           |> TestHelpers.sign_api(user)
           |> get("/api/v1/links")

    assert json_response(conn, 200) == []
  end

  test "lists all user links on index", %{conn: conn, user: user, user2: user2} do
    link = Repo.insert!(%Link{
                          url: "http://user.com",
                          title: "Title",
                          user_id: user.id
                        })

    link2 = Repo.insert!(%Link{
                           url: "http://user2.com",
                           title: "Title",
                           user_id: user2.id
                         })

    conn = conn
           |> TestHelpers.sign_api(user)
           |> get("/api/v1/links")

    response = json_response(conn, 200)
    assert length(response) == 2
    assert Enum.at(response, 0)["url"] == link.url
    assert Enum.at(response, 1)["url"] == link2.url
  end

  test "lists user links on index", %{conn: conn, user: user, user2: user2} do
    link = Repo.insert!(%Link{
                          url: "http://example.com",
                          title: "Title",
                          user_id: user.id
                        })

    Repo.insert!(%Link{
                          url: "http://example.com",
                          title: "Title",
                          user_id: user2.id
                        })

    conn = conn
           |> TestHelpers.sign_api(user)
           |> get(link_path(conn, :index) <> "?username=" <> user.username)

    response = json_response(conn, 200)
    assert length(response) == 1
    assert Enum.at(response, 0)["url"] == link.url
  end
end
