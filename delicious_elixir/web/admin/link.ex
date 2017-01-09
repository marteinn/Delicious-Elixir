defmodule DeliciousElixir.ExAdmin.Link do
  use ExAdmin.Register

  register_resource DeliciousElixir.Link do
    index do
      selectable_column

      column :title
      column :url
      column :description
      column :private
      column :user
      column :tags, fn(link) ->
        if link.tags, do: Enum.reduce(link.tags, "", &(&2 <> " " <> &1.title))
      end
    end

    form link do
      inputs do
        input link, :title
        input link, :url
        input link, :description
        input link, :private
        input link, :user, collection: DeliciousElixir.User.all
      end

      inputs "Tags" do
        inputs :tags, as: :checkboxes, collection: DeliciousElixir.Tag.all
      end
    end

    show link do
      attributes_table do
        row :title
        row :url
        row :description
        row :private
        row :user
      end

      panel "Tags" do
        table_for link.tags do
          column :title, link: true
        end
      end
    end

    query do
      %{all: [preload: [:tags, :user]]}
    end
  end
end
