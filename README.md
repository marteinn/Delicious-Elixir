# Delicious - Elxir

## Getting started

* Install dependencies with `mix deps.get`
* Create and migrate your database with `mix ecto.create && mix ecto.migrate`
* Install Node.js dependencies with `npm install`
* Start Phoenix endpoint with `mix phoenix.server`


## Snippets

- Create model

    ```elixir
    mix phoenix.gen.html Example examples field_name:field_type
    mix ecto.migrate
    ```

- Create migration

    ```elixir
    mix ecto.gen.migration <description>
    resources "/<model_name>", <Model>Controller
    mix ecto.migrate
    ```

- Create table
    `mix ecto.create`

- Create migration
    `mix ecto.gen.migration <description>`

- Run migration
    `mix ecto.migrate`

- Generate model
    `mix phoenix.gen.html Example examples field_name:field_type`



## References

- https://github.com/bigardone/phoenix-trello/

