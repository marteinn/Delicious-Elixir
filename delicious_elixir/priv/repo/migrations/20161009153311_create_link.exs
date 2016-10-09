defmodule DeliciousElixir.Repo.Migrations.CreateLink do
  use Ecto.Migration

  def change do
    create table(:links) do
      add :url, :string
      add :title, :string
      add :description, :text

      timestamps()
    end

  end
end
