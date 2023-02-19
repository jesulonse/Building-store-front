# Building Storefront Application Project

This is a backend API build in Nodejs for an online store. It shows a RESTful API that will be used by the frontend developer on the frontend.

The database schema and and API route information can be found in the [REQUIREMENT.md](REQUIREMENTS.md)

## Create User

CREATE USER store_owner WITH PASSWORD 'mypassword_112233';

## Create the following databases:

CREATE DATABASE my_new_database;
CREATE DATABASE mydb;

## Grant privileges to databases

GRANT ALL PRIVILEGES ON DATABASE my_new_database TO store_owner;

## Add env file

fill the .env file with the following data:
POSTGRES_HOST
POSTGRES_DB
POSTGRES_TEST_DB
POSTGRES_USER
POSTGRES_PASSWORD
ENV
BYCRYPT_PASSWORD
SALT_ROUNDS
TOKEN_SECRET

## Install packages in package.json file

Run the following command:
npm i    for install module to dependencies
npm i --save-dev   for install to dev dependencies

## Run migrations to create the tables of the database

Run the following command:
db-migrate up

## Testing

run the following command:
npm run test

## Running the server

run the following command:
npm run start
