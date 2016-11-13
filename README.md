# Delicious - Elxir

## Getting started

* Install dependencies with `mix deps.get`
* Create and migrate your database with `mix ecto.create && mix ecto.migrate`
* Install Node.js dependencies with `npm install`
* Start Phoenix endpoint with `mix phoenix.server`

## Debugging

- Start server: `iex -S mix phoenix.server`
- Import: `require IEx`
- Trigger debugger: `IEx.pry`


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
- https://medium.com/@diamondgfx/debugging-phoenix-with-iex-pry-5417256e1d11
- https://blog.drewolson.org/composable-queries-ecto/
- http://elixir-lang.org/getting-started/case-cond-and-if.html
- https://elixirnation.io/references/ecto-query-examples#limit_offset
