defmodule DeliciousElixir.UserTest do
  use DeliciousElixir.ModelCase

  alias DeliciousElixir.User

  @valid_attrs %{
    email: "m@m.se",
    username: "marteinn",
    password: "password",
    first_name: "Martin",
    last_name: "Sandström",
  }
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end
end
