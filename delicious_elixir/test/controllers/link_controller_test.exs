defmodule DeliciousElixir.LinkControllerTest do
  use DeliciousElixir.ConnCase

  alias DeliciousElixir.TestHelpers
  alias DeliciousElixir.{Link, Tag, Repo}

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

  test "create link", %{conn: conn, user: user} do
    data = %{
      title: "title",
      url: "http://tomwaits.com",
      description: "Hello",
    }


    conn = conn
           |> TestHelpers.sign_api(user)
           |> post(link_path(conn, :create), link: data)

    response = json_response(conn, 201)
    response_link = response["data"]

    assert response_link["description"] == "Hello"
  end

  test "create link with tags", %{conn: conn, user: user} do
    data = %{
      title: "TomWaits",
      url: "http://tomwaits.com",
      description: "Hello",
      tags: ["swordfishtrombones", "downbylaw"],
    }

    conn = conn
           |> TestHelpers.sign_api(user)
           |> post(link_path(conn, :create), link: data)

    response = json_response(conn, 201)
    response_link = response["data"]

    link_count = Link |> Repo.aggregate(:count, :id)
    tag_count = Tag |> Repo.aggregate(:count, :id)

    assert response_link["title"] == "TomWaits"
    assert link_count == 1
    assert tag_count == 2

    link = Link.all
           |> List.first
           |> Repo.preload([:user, :tags])
    assert length(link.tags) == 2
  end
end
