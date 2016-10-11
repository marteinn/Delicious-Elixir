defmodule DeliciousElixir.User do
  use DeliciousElixir.Web, :model

  schema "users" do
    field :email, :string

    has_many :owned_links, DeliciousElixir.Link

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:email])
    |> validate_required([:email])
  end
end
