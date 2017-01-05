defmodule DeliciousElixir.Repo.Migrations.AddInfoUrlToUser do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :description, :string
      add :url, :string
    end
  end
end
