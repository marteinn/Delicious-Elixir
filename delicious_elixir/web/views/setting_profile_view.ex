defmodule DeliciousElixir.SettingProfileView do
  use DeliciousElixir.Web, :view

  def render("show.json", %{user: user}) do
    %{
      user: %{
        first_name: user.first_name,
        last_name: user.last_name,
        description: user.description,
        url: user.url,
      }
    }
  end

  def render("error.json", %{changeset: changeset}) do
    errors = Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
      Enum.reduce(opts, msg, fn {key, value}, acc ->
        String.replace(acc, "%{#{key}}", to_string(value))
      end)
    end)

    %{errors: errors}
  end
end
