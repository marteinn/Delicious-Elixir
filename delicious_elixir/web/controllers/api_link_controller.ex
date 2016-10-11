defmodule DeliciousElixir.ApiLinkController do
  use DeliciousElixir.Web, :controller
  alias DeliciousElixir.Repo
  alias DeliciousElixir.Link

  def index(conn, params) do
    filters = Ecto.Changeset.cast(
                                  %Link{},
                                  params,
                                  [],
                                  [:user_id]
                                )
      |> Map.fetch!(:changes)
      |> Map.to_list

    api_links = Link
                |> where(^filters)
                |> Repo.all()
                |> Repo.preload(:user)

    render conn, api_links: api_links
  end
end
