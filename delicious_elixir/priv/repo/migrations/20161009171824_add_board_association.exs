defmodule DeliciousElixir.Repo.Migrations.AddBoardAssociation do
  use Ecto.Migration

  def change do
    alter table(:links) do
      add :user_id, references(:users, on_delete: :delete_all), null: false
    end

    create index(:links, [:user_id])

  end
end
