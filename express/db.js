const mysql = require('mysql');



//read global secret vars
const fs = require('fs');
let rawdata = fs.readFileSync('express/global.json');
let secretData = JSON.parse(rawdata);
//end of global secret vars

// ============================================================
// Database Connection Set Up
// ============================================================

const connection = mysql.createConnection({
    host: secretData.dbhost ,
    user: secretData.dbuser ,
    password: secretData.dbpassword ,
    database: secretData.dbname
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