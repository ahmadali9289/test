# node-ts-postgres

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Contributing](../CONTRIBUTING.md)

## About <a name = "about"></a>

This project contains the docker implementation of a card game using docker-compose to fire up the backend as well the database Postgres.

## Getting Started <a name = "getting_started"></a>

The `docker-compose.yml` file contains the services that would be able to fire up the api and the DB.

### How to run the project

Using a single command you could fire-up both the API and database as 

```
docker-compose up --build
```

### Endpoint available

Following are the endpoints that are available. For a very High level overview of the system, I have create a `db-model.dio` file which represents the underlying models create along with the endpoints being targtted.


```
POST: /deck - Creates the deck of cards
GET: /deck/:deckId - Opens a deck using the deckId
GET: /deck/:deckId/:drawCount - Draws a card from the deck and returns the drawed cards
```

You can test the project using the command:

```
npm run test
```

You could also go with yarn if preferred. 

## Usage <a name = "Migration Scripts"></a>

I have added a sample migration script which allows to create a sample deck and cards. It is present inside `src/db` folder.