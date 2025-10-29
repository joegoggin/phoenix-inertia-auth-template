defmodule AppWeb.Router do
  use AppWeb, :router

  import AppWeb.UserAuth

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {AppWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :fetch_current_scope_for_user
    plug Inertia.Plug
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  # Other scopes may use custom stacks.
  # scope "/api", AppWeb do
  #   pipe_through :api
  # end

  ## Authentication routes

  scope "/", AppWeb do
    pipe_through [:browser, :redirect_if_user_is_authenticated]

    get "/sign-up", UserRegistrationController, :new
    # post "/users/register", UserRegistrationController, :create

    get "/log-in", UserSessionController, :new
    # get "/users/log-in/:token", UserSessionController, :confirm
    # post "/users/log-in", UserSessionController, :create
    # delete "/users/log-out", UserSessionController, :delete
  end

  scope "/", AppWeb do
    pipe_through [:browser, :require_authenticated_user]

    # get "/users/settings", UserSettingsController, :edit
    # put "/users/settings", UserSettingsController, :update
    # get "/users/settings/confirm-email/:token", UserSettingsController, :confirm_email
  end

  scope "/", AppWeb do
    pipe_through :browser

    get "/", PageController, :home
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:app, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: AppWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
