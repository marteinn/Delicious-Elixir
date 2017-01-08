defmodule DeliciousElixir.SettingProfileController do
  use DeliciousElixir.Web, :controller

  alias Ecto.Changeset
  alias DeliciousElixir.User

  plug Guardian.Plug.EnsureAuthenticated, handler: DeliciousElixir.SessionController

  def update(conn, params) do
    user = Guardian.Plug.current_resource(conn)

    changeset = user
                |> Changeset.cast(params, ~w(first_name last_name description url))

    case Repo.update(changeset) do
      {:ok, user} ->
        conn
        |> put_status(:ok)
        |> render("show.json", user: user)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", changeset: changeset)
    end
  end
end
