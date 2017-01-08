defmodule DeliciousElixir.SettingPasswordController do
  use DeliciousElixir.Web, :controller

  alias Ecto.Changeset
  alias DeliciousElixir.{Repo, User}
  alias DeliciousElixir.Session

  plug Guardian.Plug.EnsureAuthenticated, handler: DeliciousElixir.SessionController

  def update(conn, %{"current_password" => current_password, "new_password" => new_password}) do

    user = Guardian.Plug.current_resource(conn)

    valid = Session.authenticate(%{
                              "email" => user.email,
                              "password" => current_password
                            })

    valid = case valid do
      {:ok, user} ->
        changeset = User.changeset(user, %{"password" => new_password})
        case Repo.update(changeset) do
          {:ok, user} -> {:ok, user}
          {:error, changeset} -> {:error, changeset}
        end
      {:error, message} -> {:error, message}
    end

    case valid do
      {:ok, user} ->
        conn
        |> put_status(:ok)
        |> render("show.json", user: user)
      {:error, %Changeset{} = changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
      {:error, message} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", message: message)
      end
  end
end
