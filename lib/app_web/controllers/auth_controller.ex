defmodule AppWeb.AuthController do
  use AppWeb, :controller

  alias App.Accounts

  @doc """
    route: get /sign-in

    Renders sign up page
  """
  def sign_up_page(conn, _params) do
    conn
    |> render_inertia("auth/SignUp")
  end

  @doc """
    route: post /sign-in

    Creates account, sends confirmation emails, and redirects to
    `/confirm-email` 
  """
  def sign_up(conn, params) do
    case Accounts.register_user(params) do
      {:ok, user} ->
        Accounts.deliver_login_instructions(
          user,
          &url(~p"/log-in/#{&1}")
        )

        conn
        |> redirect(to: ~p"/confirm-email")

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> assign_errors(changeset)
        |> redirect(to: ~p"/sign-up")
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
    route: get /log-in

    Renders log in page
  """
  def log_in_page(conn, _params) do
    conn
    |> render_inertia("auth/LogIn")
  end
end
