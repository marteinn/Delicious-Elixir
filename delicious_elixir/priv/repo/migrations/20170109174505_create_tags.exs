defmodule DeliciousElixir.Repo.Migrations.CreateTags do
  use Ecto.Migration

  def change do
    create table(:tags) do
      add :title, :string

      timestamps()
    end

    create unique_index(:tags, [:title])

    create table(:links_tags, primary_key: false) do
      add :link_id, references(:links)
      add :tag_id, references(:tags)
    end
  end
end
