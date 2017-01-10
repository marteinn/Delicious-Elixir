defmodule DeliciousElixir.LinkTest do
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
    data = %{data | tags: ["russian-dance"]}

    changeset = link |> Link.changeset(data)
    assert changeset.valid?

    link = Repo.update!(changeset) |> Repo.preload([:user, :tags])
    assert length(link.tags) == 1
    assert (link.tags |> List.first).title == "russian-dance"

    tag_count = Tag |> Repo.aggregate(:count, :id)
    assert tag_count == 3

    # Assign new data
    data = %{data | tags: ["russian-dance", "blood-money"]}

    changeset = link |> Link.changeset(data)
    assert changeset.valid?

    link = Repo.update!(changeset) |> Repo.preload([:user, :tags])
    assert length(link.tags) == 2
    assert (link.tags |> List.last).title == "blood-money"

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

  test "make sure tags get slugged", %{user: user} do
    data = %{
      title: "TomWaits",
      url: "http://tomwaits.com",
      description: "Hello",
      user_id: user.id,
      tags: ["Alice", "Bone Machine"],
    }
    changeset = %Link{} |> Link.changeset(data)
    link = Repo.insert!(changeset) |> Repo.preload([:user, :tags])

    assert (link.tags |> List.first).title == "alice"
    assert (link.tags |> List.last).title == "bone-machine"
  end
end
