defmodule DeliciousElixir.Repo do
  use Ecto.Repo, otp_app: :delicious_elixir
  use Scrivener, page_size: 10
end
