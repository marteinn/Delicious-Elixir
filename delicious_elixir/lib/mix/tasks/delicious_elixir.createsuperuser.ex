defmodule Mix.Tasks.DeliciousElixir.CreateSuperUser do
  use Mix.Task
  alias DeliciousElixir.{Repo, User}

  def run([username, email, password]) do
    Mix.Task.run "app.start"

    params = %{
      username: username,
      email: email,
      password: password,
      superuser: true,
    }

    changeset = %User{} |> User.changeset(params)
    case Repo.insert(changeset) do
      {:ok, user} ->
        Mix.shell.info "User #{user.username} was created"
      {:error, _changeset} ->
        Mix.shell.info "Could not create user #{username}"
    end
  end
end
