ExUnit.start

Ecto.Adapters.SQL.Sandbox.mode(DeliciousElixir.Repo, :manual)

defmodule DeliciousElixir.TestHelpers do
  use DeliciousElixir.ConnCase
  alias DeliciousElixir.{User}

  def sign_api(conn, user) do
    {:ok, jwt, _} = user |> Guardian.encode_and_sign(:token)
    conn |> put_req_header("authorization", jwt)
  end

  def create_user(params) do
    %User{} |> User.changeset(params) |> Repo.insert!
  end
end
