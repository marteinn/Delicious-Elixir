defmodule DeliciousElixir.Router do
  use DeliciousElixir.Web, :router
  use ExAdmin.Router

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

  pipeline :browser_session do
    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.LoadResource
  end

  pipeline :require_auth do
    plug Guardian.Plug.EnsureAuthenticated,
      handler: DeliciousElixir.AuthController
  end

  scope "/api", DeliciousElixir do
    pipe_through :api

    scope "/v1" do
      resources "/links", LinkController
      post "/registrations", RegistrationController, :create
      post "/sessions", SessionController, :create
      get "/current-user", UserController, :show_current
      get "/users/:username", UserController, :show
    end
  end

  scope "/auth", DeliciousElixir do
    pipe_through [:browser, :browser_session]

    get "/sign-in", AuthController, :new
    post "/sign-in", AuthController, :create
    get "/sign-out", AuthController, :destroy
    patch "/sign-out", AuthController, :destroy
    delete "/sign-out", AuthController, :destroy
  end

  scope "/admin", ExAdmin do
    pipe_through [:browser, :browser_session, :require_auth]

    admin_routes
  end

  scope "/", DeliciousElixir do
    pipe_through :browser
    get "/*path", PageController, :index
  end
end
