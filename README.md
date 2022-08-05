# Express Templates

## Description 

Templates for using Express with different databases. Covers basic CRUD functions, user creation with hashed passwords, and user login with a JSON Web Token returned.

## Usage

From your command line, after cloning this repo, change directory to the folder you're interested in, run `npm install`, add a `.env` file to the folder with relevant variables added (details below), and `npm start` or `npm run dev` to start the application. 

Note that minimal validation is included in these templates and a database would need to be setup beforehand.

### MySQL

Uses [mysql](https://www.npmjs.com/package/mysql) package.

Sample `.env` file:
```
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PW=Test1234
DATABASE_NAME=example_db
JWT_SECRET=password
```
Optional environment variable: `PORT`

### MongoDB

Uses [mongoose](https://www.npmjs.com/package/mongoose) package.

Sample `.env` file:
```
DB_HOST=localhost
DB_NAME=example_db
JWT_SECRET=password
```
Optional environment variables: `PORT`, `DB_PORT`

### Filesystem

Uses Node's built-in `fs` module. Not a database but it's a way of managing data so I decided to include a template for it.

Sample `.env` file:
```
DATA_ITEMS_LOCATION=./data/items.json
DATA_USERS_LOCATION=./data/users.json
JWT_SECRET=password
```
Optional environment variable: `PORT`
