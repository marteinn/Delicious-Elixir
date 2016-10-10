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
  end

  scope "/", DeliciousElixir do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    resources "/links", LinkController
    resources "/users", UserController
  end

  # Other scopes may use custom stacks.
  scope "/api", DeliciousElixir do
     pipe_through :api

     resources "/links", ApiLinkController
  end
end
