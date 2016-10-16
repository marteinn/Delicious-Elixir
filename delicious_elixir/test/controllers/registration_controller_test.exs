defmodule DeliciousElixir.RegistrationControllerTest do
  use DeliciousElixir.ConnCase

  alias DeliciousElixir.{Repo, User}

  test "creates user", %{conn: conn} do
    data = %{
      username: "marteinn",
      email: "m@m.se",
      first_name: "Martin",
      last_name: "Sandström",
      password: "password",
    }
    conn = post conn, registration_path(conn, :create), user: data
    response = json_response(conn, 201)

    assert Map.has_key?(response, "jwt") == true
    assert Map.has_key?(response, "user") == true

    response_user = response["user"]

    assert response_user["email"] == "m@m.se"
    assert response_user["first_name"] == "Martin"
    assert response_user["last_name"] == "Sandström"
  end
end
