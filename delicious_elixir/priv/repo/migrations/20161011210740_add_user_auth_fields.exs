defmodule DeliciousElixir.Repo.Migrations.AddUserAuthFields do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :username, :string, null: false
      add :first_name, :string, null: false
      add :last_name, :string, null: false
      add :encrypted_password, :string, null: false
    end

    create unique_index(:users, [:email])
  end
end
