defmodule DeliciousElixir.UserTest do
  use DeliciousElixir.ModelCase

  alias DeliciousElixir.TestHelpers
  alias DeliciousElixir.{Link, Tag}

  setup do
    user = %{
      username: "example",
      email: "example@example.com",
      first_name: "M",
      last_name: "S",
      password: "password",
    } |> TestHelpers.create_user

    %{
      user: user,
    }
  end
  #test "changeset with valid attributes" do
    #changeset = User.changeset(%User{}, @valid_attrs)
    #assert changeset.valid?
  #end

  #test "changeset with invalid attributes" do
    #changeset = User.changeset(%User{}, @invalid_attrs)
    #refute changeset.valid?
  #end

  test "add tags to model", %{user: user} do
    data = %{
      title: "TomWaits",
      url: "http://tomwaits.com",
      description: "Hello",
      user_id: user.id,
      tags: ["swordfishtrombones", "downbylaw"],
    }
    changeset = %Link{} |> Link.changeset(data)
    assert changeset.valid?

    link = Repo.insert!(changeset)
           |> Repo.preload([:user, :tags])

    tag_count = Tag |> Repo.aggregate(:count, :id)

    assert tag_count == 2
    assert length(link.tags) == 2
  end

  test "add and update tags to model", %{user: user} do
    data = %{
      title: "TomWaits",
      url: "http://tomwaits.com",
      description: "Hello",
      user_id: user.id,
      tags: ["swordfishtrombones", "downbylaw"],
    }
    changeset = %Link{} |> Link.changeset(data)
    assert changeset.valid?

    link = Repo.insert!(changeset) |> Repo.preload([:user, :tags])

    # Assign new data
    data = %{data | tags: ["Russian Dance"]}

    changeset = link |> Link.changeset(data)
    assert changeset.valid?

    link = Repo.update!(changeset) |> Repo.preload([:user, :tags])
    assert length(link.tags) == 1
    assert (link.tags |> List.first).title == "Russian Dance"

    tag_count = Tag |> Repo.aggregate(:count, :id)
    assert tag_count == 3

    # Assign new data
    data = %{data | tags: ["Russian Dance", "Blood money"]}

    changeset = link |> Link.changeset(data)
    assert changeset.valid?

    link = Repo.update!(changeset) |> Repo.preload([:user, :tags])
    assert length(link.tags) == 2
    assert (link.tags |> List.last).title == "Blood money"

    tag_count = Tag |> Repo.aggregate(:count, :id)
    assert tag_count == 4
  end

  test "makes sure empty tags are not created", %{user: user} do
    data = %{
      title: "TomWaits",
      url: "http://tomwaits.com",
      description: "Hello",
      user_id: user.id,
      tags: ["swordfishtrombones", ""],
    }
    changeset = %Link{} |> Link.changeset(data)
    assert changeset.valid?

    link = Repo.insert!(changeset)
           |> Repo.preload([:user, :tags])

    assert Tag |> Repo.aggregate(:count, :id) == 1
    assert length(link.tags) == 1
  end
end
