defmodule DeliciousElixir.SettingPasswordControllerTest do
  use DeliciousElixir.ConnCase

  alias DeliciousElixir.{TestHelpers, Repo, User, Session}

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

  test "password change requires auth", %{conn: conn} do
    user_params = %{
      user: %{
        current_password: "password",
        new_password: "new-password",
      }
    }

    conn = conn |> put("/api/v1/settings/password", user_params)
    assert json_response(conn, 403) == %{"error" => "Not Authenticated"}
  end

  test "change user password", %{conn: conn, user: user} do
    user_params = %{
      current_password: "password",
      new_password: "new-password",
    }
    conn = conn
           |> TestHelpers.sign_api(user)
           |> put("/api/v1/settings/password", user_params)
    json_response(conn, 200)

    changed_user = User |> Repo.get!(user.id)
    assert Session.check_password(changed_user, "new-password") == true
  end

  test "password mismatch", %{conn: conn, user: user} do
    user_params = %{
      current_password: "password1",
      new_password: "new-password",
    }
    conn = conn
           |> TestHelpers.sign_api(user)
           |> put("/api/v1/settings/password", user_params)
    response = json_response(conn, 422)

    assert response == %{"errors" => ["Password does not match"]}
  end

  test "too short password", %{conn: conn, user: user} do
    user_params = %{
      current_password: "password",
      new_password: "abc",
    }
    conn = conn
           |> TestHelpers.sign_api(user)
           |> put("/api/v1/settings/password", user_params)
    response = json_response(conn, 422)

    assert response == %{"errors" => %{
      "password" => ["should be at least 5 character(s)"]}
    }
  end
end
