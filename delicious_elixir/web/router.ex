defmodule DeliciousElixir.Router do
  use DeliciousElixir.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
  end

  # Other scopes may use custom stacks.
  scope "/api", DeliciousElixir do
    pipe_through :api

    scope "/v1" do
      resources "/links", ApiLinkController
      post "/registrations", RegistrationController, :create
      get "/current-user", CurrentUserController, :show
    end
  end

  scope "/", DeliciousElixir do
    pipe_through :browser # Use the default browser stack

    resources "/links", LinkController
    resources "/users", UserController
    get "/*path", PageController, :index
  end

  end
