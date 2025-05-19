require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    jwt:{
      secret:process.env.JWT_SECRET,
      expiresIn:process.env.JWT_EXPIRES_IN
    },
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: true
      }
    }
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    jwt:{
      secret:process.env.JWT_SECRET,
      expiresIn:process.env.JWT_EXPIRES_IN,
    },
    dialect: 'mssql'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    jwt:{
      secret:process.env.JWT_SECRET,
      expiresIn:process.env.JWT_EXPIRES_IN
    },
    dialect: 'mssql'
  }
};