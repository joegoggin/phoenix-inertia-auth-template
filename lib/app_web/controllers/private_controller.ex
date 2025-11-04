defmodule AppWeb.PrivateController do
  use AppWeb, :controller

  alias App.Accounts

  @doc """
    route: get /dashboard

    Renders dashboard page if `user.hashed_password` is set. Otherwise redirects
    to `/set-password`
  """
  def dashboard_page(conn, _params) do
    token = get_session(conn, :user_token)
    {user, _} = Accounts.get_user_by_session_token(token)

    if !user.hashed_password do
      conn
      |> redirect(to: ~p"/set-password")
    else
      conn
      |> render_inertia("private/Dashboard")
    end
  end

  @doc """
    route: get /set-password

    Renders set password page
  """
  def set_password_page(conn, _params) do
    conn
    |> render_inertia("private/SetPassword")
  end
end
