defmodule DeliciousElixir.AdminLinkTest do
  use DeliciousElixir.ModelCase

  alias DeliciousElixir.AdminLink

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = AdminLink.changeset(%AdminLink{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = AdminLink.changeset(%AdminLink{}, @invalid_attrs)
    refute changeset.valid?
  end
end
