defmodule DeliciousElixir.User do
  use DeliciousElixir.Web, :model
  alias DeliciousElixir.Repo

  @derive {Poison.Encoder, only: [:id, :username, :first_name, :last_name, :email,
                                  :inserted_at, :description, :url]}

  schema "users" do
    field :username, :string
    field :email, :string
    field :password, :string, virtual: true
    field :encrypted_password, :string
    field :first_name, :string, default: ""
    field :last_name, :string, default: ""
    field :description, :string, default: ""
    field :url, :string, default: ""

    has_many :owned_links, DeliciousElixir.Link

    timestamps()
  end

  @required_fields ~w(first_name last_name username email password)
  @optional_fields ~w(encrypted_password description url)

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields, @optional_fields)
    |> validate_length(:password, min: 5)
    |> validate_confirmation(:password, message: "Password does not match")
    |> unique_constraint(:email, message: "Email already taken")
    |> generate_encrypted_password
  end

  defp generate_encrypted_password(current_changeset) do
    case current_changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(current_changeset, :encrypted_password, Comeonin.Bcrypt.hashpwsalt(password))
      _ ->
        current_changeset
    end
  end

  def all, do: Repo.all(__MODULE__)
end
