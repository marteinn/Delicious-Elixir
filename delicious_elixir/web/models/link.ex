defmodule DeliciousElixir.Link do
  use DeliciousElixir.Web, :model

  schema "links" do
    field :title, :string
    field :url, :string
    field :description, :string

    belongs_to :user, User

    timestamps()
  end

  @required_fields ~w(title url user_id)
  @optional_fields ~w(description)

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields, @optional_fields)
  end
end
