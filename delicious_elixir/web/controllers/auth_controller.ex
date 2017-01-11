defmodule DeliciousElixir.AuthController do
  use DeliciousElixir.Web, :controller

  alias DeliciousElixir.{User, Session}

  def new(conn, _params) do
    render(conn, "login.html")
  end

  def create(conn, %{"login" => login}) do
    case Session.authenticate(login) do
      {:ok, user} ->
        case user.superuser do
          true ->
            conn
            |> Guardian.Plug.sign_in(user)
            |> put_flash(:info, "Logged in")
            |> redirect(to: "/admin")
          _ ->
            conn
            |> put_flash(:error, "Not enough permissions")
            |> render("login.html")
        end
      {:error, msg} ->
        conn
        |> put_flash(:error, "Wrong email or password")
        |> render("login.html")
    end
  end

  def destroy(conn, _params) do
    conn
    |> Guardian.Plug.sign_out
    |> put_flash(:info, "You have been logged out")
    |> redirect(to: "/admin")
  end

  def unauthenticated(conn, _params) do
    redirect(conn, to: auth_path(conn, :new))
  end
end
