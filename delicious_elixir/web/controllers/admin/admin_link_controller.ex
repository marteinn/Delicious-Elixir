defmodule DeliciousElixir.AdminLinkController do
  use DeliciousElixir.Web, :controller

  alias DeliciousElixir.Link

  #plug :put_view, DeliciousElixir.AdminLinkView

  def index(conn, _params) do
    links = Repo.all(Link)
    render(conn, "index.html", links: links)
  end

  def new(conn, _params) do
    changeset = Link.changeset(%Link{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"link" => link}) do
    changeset = Link.changeset(%Link{}, link)

    case Repo.insert(changeset) do
      {:ok, _link} ->
        conn
        |> put_flash(:info, "Admin link created successfully.")
        |> redirect(to: admin_link_path(conn, :index))
      {:error, changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    link = Repo.get!(Link, id)
    render(conn, "show.html", link: link)
  end

  def edit(conn, %{"id" => id}) do
    link = Repo.get!(Link, id)
    changeset = Link.changeset(link)
    render(conn, "edit.html", link: link, changeset: changeset)
  end

  def update(conn, %{"id" => id, "link" => admin_link_params}) do
    link = Repo.get!(Link, id)
    changeset = Link.changeset(link, admin_link_params)

    case Repo.update(changeset) do
      {:ok, link} ->
        conn
        |> put_flash(:info, "Admin link updated successfully.")
        |> redirect(to: admin_link_path(conn, :show, link))
      {:error, changeset} ->
        render(conn, "edit.html", link: link, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    link = Repo.get!(Link, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(link)

    conn
    |> put_flash(:info, "Admin link deleted successfully.")
    |> redirect(to: admin_link_path(conn, :index))
  end
end
