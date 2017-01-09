defmodule DeliciousElixir.LinkTag do
  use DeliciousElixir.Web, :model
  import Ecto.Query

  schema "link_tags" do
    belongs_to :tag, DeliciousElixir.Tag, foreign_key: :tag_id
    belongs_to :link, DeliciousElixir.Link, foreign_key: :link_id

    timestamps()
  end
end
