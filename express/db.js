const mysql = require('mysql');

// ============================================================
// Database Connection Set Up
// ============================================================

const connection = mysql.createConnection({
    host: '64.20.43.250',
    user: 'azziedev_tigertalksdb',
    password: 'NOX3-PJ]9i-s',
    database: 'azziedev_tigertalks'
  })
  
  //Database connect status
  connection.connect((err) => {
    if (!err) {
      console.log("Connected");
    } else {
      console.log("Connection Failed");
    }
  })

  module.exports = connection;