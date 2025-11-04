defmodule AppWeb.AuthController do
  use AppWeb, :controller

  alias AppWeb.UserAuth
  alias App.Accounts

  @doc """
    route: get /auth/sign-in

    Renders sign up page
  """
  def sign_up_page(conn, _params) do
    conn
    |> render_inertia("auth/SignUp")
  end

  @doc """
    route: post /auth/sign-in

    Creates account, sends confirmation emails, and redirects to
    `/confirm-email` 
  """
  def sign_up(conn, params) do
    case Accounts.register_user(params) do
      {:ok, user} ->
        Accounts.deliver_login_instructions(
          user,
          &url(~p"/auth/log-in/#{&1}")
        )

        conn
        |> redirect(to: ~p"/auth/confirm-email")

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> assign_errors(changeset)
        |> redirect(to: ~p"/auth/sign-up")
    end
  end

  @doc """
    route: get /confirm-email

    Renders confirm email page  
  """
  def confirm_email_page(conn, _params) do
    conn
    |> render_inertia("auth/ConfirmEmail")
  end

  @doc """
    route: get /log-in/:token

    Attempts to log in user with magic link from email. if successful the user
    is redirected to `/set-password`. If log in fails an error screen is
    rendered.
  """
  def magic_link_log_in(conn, %{"token" => token}) do
    case Accounts.login_user_by_magic_link(token) do
      {:ok, {user, _expired_tokens}} ->
        conn
        |> UserAuth.log_in_user(user)
        |> redirect(to: ~p"/auth/set-password")

      {:error, :not_found} ->
        conn
        |> render_inertia("auth/InvalidTokenError")
    end
  end

  @doc """
    route: get /log-in

    Renders log in page
  """
  def log_in_page(conn, _params) do
    conn
    |> render_inertia("auth/LogIn")
  end
end
