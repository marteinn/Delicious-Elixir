defmodule DeliciousElixir.Repo.Migrations.AddTitleDescription do
  use Ecto.Migration

  def change do
    alter table(:links) do
      add :title, :string
      add :description, :text
    end
  end
end
