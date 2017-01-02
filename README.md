# Delicious - Elxir

## Requirements

- Docker
- Node + NPM
- Elixir
    - [OSX](http://elixir-lang.org/install.html#mac-os-x)

## Getting started

1. Make sure docker are running: `docker-machine start && eval "$(docker-machine env default)"`
1. Create db config: `cp docker/config/db.example.env docker/config/db.env`
1. Start db: `docker-compose up -d`
1. Open pheonix app: `cd delicious_elixir`
1. Install dependencies: `mix deps.get`
1. Create and migrate your database: `mix ecto.create && mix ecto.migrate`
1. Switch to frontend dir: `cd ../frontend`
1. Install node packages: `yarn`
1. Start Phoenix endpoint: `mix phoenix.server`
1. Open the application: [http://localhost:4000](http://localhost:4000)
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
- Create table: `mix ecto.create`
- Create migration: `mix ecto.gen.migration <description>`
- Run migration: `mix ecto.migrate`
- Generate model: `mix phoenix.gen.html Example examples field_name:field_type`

## Roadmap

- [x] Create link modal
- [x] Add put support to link api controller
- [x] Edit link modal
- [x] Url validation when saving link
- [x] Update link list with changes happen
- [ ] Delete link from list
- [ ] Sign up styling
- [ ] Auto reload list if new links arrive (through socket)
- [ ] Register styling
- [ ] Bulk editing
- [ ] Settings (Change password / email)
- [ ] Tag support
- [ ] Convert app to docker container


## References

- https://github.com/bigardone/phoenix-trello/
- https://medium.com/@diamondgfx/debugging-phoenix-with-iex-pry-5417256e1d11
- https://blog.drewolson.org/composable-queries-ecto/
- http://elixir-lang.org/getting-started/case-cond-and-if.html
- https://elixirnation.io/references/ecto-query-examples#limit_offset
- [Nested Associations & Changeset Errors in Ecto](https://medium.com/@cjbell_/nested-associations-changeset-errors-in-ecto-f0ce6a4fec70#.f6eiiep25)
- [Adding Edit and Update Functionality](http://phoenix.thefirehoseproject.com/7.html)
- [Useful Ecto Validators](http://blog.danielberkompas.com/elixir/2015/05/20/useful-ecto-validators.html)
