defmodule DeliciousElixir.ExAdmin.Link do
  use ExAdmin.Register

  register_resource DeliciousElixir.Link do
    query do
      %{all: [preload: [:user, :tags]]}
    end
  end
end
