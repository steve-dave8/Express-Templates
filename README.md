# Express Templates

## Description 

Templates for using Express with different databases. 

Usage: from your command line, after cloning this repo, change directory to the folder you're interested in, run `npm install`, add a `.env` file to the folder with relevant variables added (details below).

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