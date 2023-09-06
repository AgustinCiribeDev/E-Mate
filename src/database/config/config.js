require('dotenv').config();

module.exports = {

  "development": {
    "username": process.env.DB_USERNAME_DEVELOPMENT,
    "password": process.env.DB_PASSWORD_DEVELOPMENT,
    "database": process.env.DB_DATABASE_DEVELOPMENT,
    "host": process.env.DB_HOST_DEVELOPMENT,
    "dialect": process.env.DB_DIALECT_DEVELOPMENT
  },

  "test": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
 
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}