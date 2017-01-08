defmodule DeliciousElixir.SettingPasswordView do
  use DeliciousElixir.Web, :view

  def render("show.json", %{user: user}) do
    %{
      "status": "Password has been changed",
    }
  end

  def render("error.json", %{message: message}) do
    %{errors: [message]}
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
