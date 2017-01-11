defmodule DeliciousElixir.Repo.Migrations.AddSuperadminField do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :superuser, :boolean
    end
  end
end
