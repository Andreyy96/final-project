
## Description

### User

- Login, refresh and sign-out can do only admin
- Using an access token, user can make a request to receive order data.

### Order

Each page displays 25 orders, you can also navigate between pages and sort them in descending and ascending order 
(?order=-name or ?order=name), except for group and manager.


## Installation

```bash
#install all dependencies and dev dependencies in package.json
$ cd backend
$ npm install
```

## Env File

- all configurations are in the main folder in the .env file

## Problems

- eslint and husky do not work

## Running the app

```bash

$ start:dev

```