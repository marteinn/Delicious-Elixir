defmodule DeliciousElixir.UserSocket do
  use Phoenix.Socket
  import Guardian.Phoenix.Socket

  ## Channels
  channel "users:*", DeliciousElixir.UserChannel
  channel "links:*", DeliciousElixir.LinkChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket, timeout: 45_000

  def connect(%{"token" => jwt} = params, socket) do
    case sign_in(socket, jwt) do
      {:ok, authed_socket, guardian_params} ->
        {:ok, authed_socket}
      {:error, reason} ->
        :error
    end
  end

  def connect(_params, _socket), do: :error

  def id(_socket), do: nil
end
