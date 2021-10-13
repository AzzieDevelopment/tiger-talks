const express = require('express');
const app = express();
const port = 3000;
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: '64.20.43.250',
  user: 'azziedev_tigertalksdb',
  password: 'NOX3-PJ]9i-s',
  database: 'azziedev_tigertalks'
})

connection.connect((err)=>{
  if(!err) {
    console.log("Connected");
  }
  else {
    console.log("Connection Failed");
  }
})


/* '/' is an "endpoint", more can be made to make requests to backend (e.g. app.get('/getRecentPosts) etc) */
app.get('/', (req, res) => {
  res.send('Hello Friends!')
})
app.get('/selectExample', (req, res) => {
  
  connection.query("SELECT * FROM testUsers", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    res.send(result);
  });
  

})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
