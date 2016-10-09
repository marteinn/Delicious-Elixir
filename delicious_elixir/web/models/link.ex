defmodule DeliciousElixir.Link do
  use DeliciousElixir.Web, :model

  schema "links" do
    field :title, :string
    field :url, :string
    field :description, :text

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:url])
    |> validate_required([:url])
  end
end
