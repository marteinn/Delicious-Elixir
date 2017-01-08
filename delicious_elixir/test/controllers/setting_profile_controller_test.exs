defmodule DeliciousElixir.SettingProfileControllerTest do
  use DeliciousElixir.ConnCase

  alias DeliciousElixir.{TestHelpers, Repo, User}

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

  test "updates requires auth", %{conn: conn} do
    user_params = %{
      first_name: "A",
      last_name: "B",
      description: "C",
      url: "http://exampled.com",
    }

    conn = conn |> put("/api/v1/settings/profile", user_params)
    assert json_response(conn, 403) == %{"error" => "Not Authenticated"}
  end

  test "updates profile", %{conn: conn, user: user} do
    user_params = %{
      first_name: "A",
      last_name: "B",
      description: "C",
      url: "http://exampled.com",
    }

    conn = conn
           |> TestHelpers.sign_api(user)
           |> put("/api/v1/settings/profile", user_params)

    response = json_response(conn, 200)
    response_user = response["user"]

    assert response_user["first_name"] == "A"
    assert response_user["last_name"] == "B"
    assert response_user["description"] == "C"
    assert response_user["url"] == "http://exampled.com"

    changed_user = User |> Repo.get!(user.id)
    assert changed_user.last_name == "B"
  end
end
