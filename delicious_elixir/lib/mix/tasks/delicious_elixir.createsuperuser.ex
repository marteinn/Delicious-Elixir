defmodule Mix.Tasks.DeliciousElixir.Greeting do
  use Mix.Task
  alias DeliciousElixir.{Repo, User}

  @shortdoc "Sends a greeting to us from Hello Phoenix"

  @moduledoc """
    This is where we would put any long form documentation or doctests.
  """

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
