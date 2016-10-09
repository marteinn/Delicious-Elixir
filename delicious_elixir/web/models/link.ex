defmodule DeliciousElixir.Link do
  use DeliciousElixir.Web, :model

  schema "links" do
    field :url, :string
    field :title, :string
    field :description, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :url, :description])
    |> validate_required([:title, :url])
  end
end
