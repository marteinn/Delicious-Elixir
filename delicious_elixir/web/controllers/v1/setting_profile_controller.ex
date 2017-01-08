defmodule DeliciousElixir.SettingProfileController do
  use DeliciousElixir.Web, :controller

  alias Ecto.Changeset

  plug Guardian.Plug.EnsureAuthenticated, handler: DeliciousElixir.SessionController

  def update(conn, %{"user" => user_params}) do
    user = Guardian.Plug.current_resource(conn)

    changeset = user
                |> Changeset.cast(user_params, ~w(first_name last_name description url))

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
