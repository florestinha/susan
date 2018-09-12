# one-stack

## Project setup

### Docker
We have a docker file to set up your dev env. To build the docker containers, go to the root of the project and run

`docker-compose up`
`docker-compose up -d` to run in background

This sets up four docker containers: One for the backend code (/server), one for the frontend code (/client), one for the postgres database, and one for pgAdmin.

If you run `docker-compose ps` you will be presented with these containers:

```text
       Name                     Command              State           Ports         
-----------------------------------------------------------------------------------
onestack_client_1    npm start                       Up      0.0.0.0:3000->3000/tcp
onestack_db_1        docker-entrypoint.sh postgres   Up      0.0.0.0:5433->5432/tcp
onestack_pgadmin_1   docker-entrypoint.sh pgadmin4   Up      0.0.0.0:5050->5050/tcp
onestack_server_1    npm run start-dev               Up      0.0.0.0:4000->4000/tcp
```

As you can see, you can acess the client on port 3000 and the backend on port 4000. 

### Environment setup

Before we can run our server, we need to configure the environment variables. Create a new ".env" file in the server root directory (/server) and add the following contents to it.
```
// .env
DB_HOST=db
POSTGRES_USER=postgres
POSTGRES_DB=one-stack
```
Now create a ".env" file in "/client" and write
```
REACT_APP_ENV=dev
REACT_APP_DEV_URL=localhost:4000
REACT_APP_PROD_URL=one-stack.herokuapp.com
```
Notice you need to restart the containers manually every time you change environment variables, since changes in .env are not automatically recognized.

The .env file won't be commited to the repository since it's added on the .gitignore. 
 
### Database setup

Now we need to run the migrations to build our tables. And to run the seeds to add test data to our database. 
To do this, access your server container bash shell: 

`docker exec -it onestack_server_1 bash`

Once inside the container, run the migrations with 

`knex migrate:latest`, 

then the seeds with 

`knex seed:run`.

* if you get a connection error, review the .env section above. 

To make sure data was inserted, access the graphql playground on `localhost:4000` and run a query like:
```graphql
{
  users{
    name
  }
}
```

If you see the results, your server is up, running and seeded with data. 

### Setup pgAdmin

* Go to localhost:5050 on a web browser
* Login with the following credentials:
    user: pgadmin4@pgadmin.org
    passord: admin
* Go to Object > Create > Server
* Name your server whatever you like
* In the Connection tab, set:
  Host name/address: db
  Username: postgres
* Click save

That's it. You should now see the "one-stack" database in the left, under Servers/yourServer/Databases

## Heroku Deploy
We can use [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli) to deploy to heroku in a simple manner. We will deploy both our server and client subtrees.

OBS: notice that since we will have multiple heroku apps associated with our project, we will need to append --app 'app-name' to every heroku-cli command.

### Deploy server
1. create the heroku app with `heroku create 'server-name'`
1. add heroku-postgres add-on with `heroku addons:create heroku-postgresql:hobby-dev`. OBS:  you can run a [psql](https://www.postgresql.org/docs/current/static/app-psql.html) session with your heroku database with `heroku pg:psql`
1. add the node environment with `heroku config:set NODE_ENV=production`
1. push the server directory to the new heroku remote with `git subtree push --prefix server heroku-server master`
1. run seed and migrations by opening a bash in heroku: `heroku run bash` then running `knex migrate:latest && knex seed:run`. Exit the bash with `exit`
1. rename the git remote so it doesn't conflict with our client deploy: `git remote rename heroku heroku-server`

We can access our heroku app by running `heroku open`, and open bash with `heroku run bash`.

### Deploy client
1. If you haven't, make sure to rename the git remote pointing to the server
1. create the heroku app with `heroku create 'client-name'`
1. rename the remote with `git remote rename heroku heroku-client`
1. push the client directory with `git subtree push --prefix client heroku-client master`
1. set environment variables: `heroku config:set REACT_APP_ENV=prod REACT_APP_PROD_URL=https://onestack-server.herokuapp.com --app 'app-name'`

To push local changes to heroku, simply run `git subtree push --prefix server heroku-server master` or `git subtree push --prefix client heroku-client master`. OBS: notice this command will push the current branch, not necessarily master.


### Enabling Graphql Playground in production
Since the playground is not enabled by defalut in production environments, we can explicitly ask for it by setting a couple of fields in our ApolloServer declaration:
```js
const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context,
  introspection: true,
  playground: true,
});
```
the `introspection` and `playground` fields must be set to true. Accessing the app page, we can see it now displays the playground.

For more information on heroku-cli and heroku in general, check out [the official docs](https://devcenter.heroku.com/categories/reference).

We also recommed following [this tutorial](https://devcenter.heroku.com/articles/getting-started-with-nodejs) for a simple introduction.

## Syncing local and production databases

You can copy the state of the production database in heroku to your local docker database in a couple of simple steps
1. Delete development database

    to do this, you can run either `dropdb -h localhost -p 5433 -U postgres one-stack`, which takes advantage of the port maping in your docker-compose file, or `docker exec onestack_db_1 dropdb -U postgres one-stack`, which accesses the database directly from within the docker container.

1. Pull the production database

    Heroku provides a command that does that for you. Simply run `heroku pg:pull DATABASE_URL postgres://postgres@localhost:5433/one-stack`. You might need to change the developlent database url (the last argument) according to your local configuration.

## Other topics

Password reset setup:
* See server/src/config/README.md
