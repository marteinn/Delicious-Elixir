defmodule DeliciousElixir.AdminLinkControllerTest do
  use DeliciousElixir.ConnCase

  alias DeliciousElixir.AdminLink
  @valid_attrs %{}
  @invalid_attrs %{}

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, admin_link_path(conn, :index)
    assert html_response(conn, 200) =~ "Listing adminlinks"
  end

  test "renders form for new resources", %{conn: conn} do
    conn = get conn, admin_link_path(conn, :new)
    assert html_response(conn, 200) =~ "New admin link"
  end

  test "creates resource and redirects when data is valid", %{conn: conn} do
    conn = post conn, admin_link_path(conn, :create), admin_link: @valid_attrs
    assert redirected_to(conn) == admin_link_path(conn, :index)
    assert Repo.get_by(AdminLink, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, admin_link_path(conn, :create), admin_link: @invalid_attrs
    assert html_response(conn, 200) =~ "New admin link"
  end

  test "shows chosen resource", %{conn: conn} do
    admin_link = Repo.insert! %AdminLink{}
    conn = get conn, admin_link_path(conn, :show, admin_link)
    assert html_response(conn, 200) =~ "Show admin link"
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, admin_link_path(conn, :show, -1)
    end
  end

  test "renders form for editing chosen resource", %{conn: conn} do
    admin_link = Repo.insert! %AdminLink{}
    conn = get conn, admin_link_path(conn, :edit, admin_link)
    assert html_response(conn, 200) =~ "Edit admin link"
  end

  test "updates chosen resource and redirects when data is valid", %{conn: conn} do
    admin_link = Repo.insert! %AdminLink{}
    conn = put conn, admin_link_path(conn, :update, admin_link), admin_link: @valid_attrs
    assert redirected_to(conn) == admin_link_path(conn, :show, admin_link)
    assert Repo.get_by(AdminLink, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    admin_link = Repo.insert! %AdminLink{}
    conn = put conn, admin_link_path(conn, :update, admin_link), admin_link: @invalid_attrs
    assert html_response(conn, 200) =~ "Edit admin link"
  end

  test "deletes chosen resource", %{conn: conn} do
    admin_link = Repo.insert! %AdminLink{}
    conn = delete conn, admin_link_path(conn, :delete, admin_link)
    assert redirected_to(conn) == admin_link_path(conn, :index)
    refute Repo.get(AdminLink, admin_link.id)
  end
end
