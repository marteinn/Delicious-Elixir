# Delicious - Elxir

## Requirements

- Docker
- Node + NPM
- Elixir
    - [OSX](http://elixir-lang.org/install.html#mac-os-x)

## Getting started

1. Start with opening the phoenix src: `cd delicious_elixir`
1. Install dependencies: `mix deps.get`
1. Start postgres: `docker-compose up -d`
1. Create and migrate your database: `mix ecto.create && mix ecto.migrate`
1. Switch to frontend dir: `cd ../frontend`
1. Install node packages: `yarn`
1. Run webpack: `npm run build`
1. Start Phoenix endpoint: `mix phoenix.server`
1. Done!


## Frontend

### CLI

The cli will scaffold a new component with scss, js, test and automatically add it to index.js and index.scss.

Create a component will both scss and classbase

    npm run new ComponentName

Create a component without scss file

    npm run new ComponentName no-scss

Create a component without classbase (it will be a functional component), and no scss

    npm run new ComponentName no-scss no-class

no-scss and no-class is both optional.

index.scss and index.js will be automatically updated when adding a component through the cli.

You can also override the html if you want/need to for your component by adding a html file in the components folder, or have it created by adding this to the cli:

    npm run new ComponentName add-html


## Phoenix

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

## Roadmap

- [ ] Create link modal
- [ ] Edit link modal
- [ ] Tag support
- [ ] Sign up styling
- [ ] Register styling


## References

- https://github.com/bigardone/phoenix-trello/
- https://medium.com/@diamondgfx/debugging-phoenix-with-iex-pry-5417256e1d11
- https://blog.drewolson.org/composable-queries-ecto/
- http://elixir-lang.org/getting-started/case-cond-and-if.html
- https://elixirnation.io/references/ecto-query-examples#limit_offset
