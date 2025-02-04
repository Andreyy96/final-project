
## Description

### User

- role: Admin or Manager
- Login, refresh and sign-out can do only admin
- Using an access token, user can make a request to receive order data.

### Order

Each page displays 25 orders, you can also navigate between pages and sort them in descending and ascending order 
(?order=-name or ?order=name), except for group.

### Comment

The user can leave comments under the order only where there is no manager or he himself is the manager of this order, 
after which his name is entered in the manager column and the status changes to “In work”.

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