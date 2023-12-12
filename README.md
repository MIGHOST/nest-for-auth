# Auth Backend

| Name | port | health  | swagger |
| ---- | ---- | ------- | ------- |
| api  | 3001 | /health | /docs   |

## Prerequisites

Install [Node](https://nodejs.org/en/) 20.10.0 or higher

Install docker and docker-compose

## Installation / Getting started

1. Clone the repository and move to the project dir (for this step you may
  
```bash
git clone https://github.com/MIGHOST/nest-for-auth
```

```bash
cd ./nest-for-auth
```

2. Install `node modules` dependencies via Npm:

```bash
$ npm install
```

3. Create a .env file at the root directory of your application by copying the .env.sample file.

```bash
cp .env.sample .env
```

- Don't forget add env variables :)

## Running the app

### Local dev environment

For the services to work, we need a working PostgreSQL database.
Let's run it using Docker using the following command:

```bash
$ docker compose up

Local running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# debug mode
$ npm run start:debug

```
## Migrations

```bash
# run migrations
$ npm run migration:run

# generate migration
$ npm run typeorm:migration:generate --name=MIGRATION_NAME

# create empty migration
$ npm run typeorm:migration:create --name=MIGRATION_NAME

# revert last migration
$ npm run typeorm:migration:revert
```

## Testing

You can import postman collection for testing main endpoint from folder 
