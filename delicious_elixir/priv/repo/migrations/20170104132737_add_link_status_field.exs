defmodule DeliciousElixir.Repo.Migrations.AddLinkStatusField do
  use Ecto.Migration

  def change do
    alter table(:links) do
      add :private, :boolean
    end
  end
end
