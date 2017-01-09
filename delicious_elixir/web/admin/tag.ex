defmodule DeliciousElixir.ExAdmin.Tag do
  use ExAdmin.Register

  register_resource DeliciousElixir.Tag do

    show tag do
      attributes_table do
        row :title
      end

      panel "Links" do
        table_for tag.links do
          column :title, link: true
        end
      end
    end

    query do
      %{all: [preload: :links]}
    end

  end
end
