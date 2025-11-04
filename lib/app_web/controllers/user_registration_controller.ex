defmodule AppWeb.UserRegistrationController do
  use AppWeb, :controller

  alias App.Accounts
  alias App.Accounts.User

  def sign_up_page(conn, _params) do
    conn
    |> render_inertia("SignUp")
  end

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
        render(conn, :new, changeset: changeset)
    end
  end
end
