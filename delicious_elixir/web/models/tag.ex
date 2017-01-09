defmodule DeliciousElixir.Tag do
  use DeliciousElixir.Web, :model
  import Ecto.Query
  alias DeliciousElixir.Repo

  schema "tags" do
    field :title, :string

    has_many :link_tags, DeliciousElixir.LinkTag
    has_many :links, through: [:link_tags, :link]

    timestamps()
  end

  @required_fields ~w(title)
  @optional_fields ~w()

  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  def all, do: Repo.all(__MODULE__)
end
