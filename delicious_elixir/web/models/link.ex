defmodule DeliciousElixir.Link do
  use DeliciousElixir.Web, :model
  import Ecto.Query

  schema "links" do
    field :title, :string
    field :url, :string
    field :description, :string
    field :private, :boolean, default: false

    belongs_to :user, DeliciousElixir.User
    has_many :link_tags, DeliciousElixir.LinkTag
    has_many :tags, through: [:link_tags, :tag]

    timestamps()
  end

  @required_fields ~w(title url user_id)
  @optional_fields ~w(description private)

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields, @optional_fields)
    |> validate_url(:url, message: "not valid")
  end

  def validate_url(changeset, field, options \\ []) do
    validate_change changeset, field, fn(_, url) ->
      case url |> String.to_char_list |> :http_uri.parse do
        {:ok, _} -> []
        {:error, msg} -> [{field, options[:message] || "invalid url: #{inspect msg}"}]
      end
    end
  end

  def public_only(query, status \\ true) do
    if !status do
      query
    else
      from l in query,
        where: l.private == false
    end
  end

  def by_user(query, username) do
    if username == nil do
      query
    else
      from l in query,
        left_join: u in assoc(l, :user),
        where: u.username == ^username
    end
  end
end
