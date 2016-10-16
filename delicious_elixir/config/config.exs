# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :delicious_elixir,
  ecto_repos: [DeliciousElixir.Repo]

# Configures the endpoint
config :delicious_elixir, DeliciousElixir.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "SD1mjBiRcQV0JmWiYibG2Iiy36bjOszOFPOBaQkmBt/MFKz3LTgBZtcjiE41KOQ/",
  render_errors: [view: DeliciousElixir.ErrorView, accepts: ~w(html json)],
  pubsub: [name: DeliciousElixir.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"


config :guardian, Guardian,
  issuer: "PhoenixTrello",
  ttl: {3, :days},
  verify_issuer: true,
  secret_key: "pqCVzbQhE2NL4cYtyRHecyTsxeBWzxPqLZfpGBVMikYQXBMynL",
  serializer: DeliciousElixir.GuardianSerializer
