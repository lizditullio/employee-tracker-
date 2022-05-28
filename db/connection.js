const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'liz72296E',
  database: 'company_db'
});

module.exports = connection;
