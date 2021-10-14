const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
var mysql = require('mysql');
//body parser
app.use(bodyParser.urlencoded({ extended: true }));

//connection data for the database
var connection = mysql.createConnection({
  host: '64.20.43.250',
  user: 'azziedev_tigertalksdb',
  password: 'NOX3-PJ]9i-s',
  database: 'azziedev_tigertalks'
})

//reads any and all POST data sent to /loginVerify
app.post('/loginVerify', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});

//Database connect status
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
  res.send('Hello friends!');
})

app.get('/login', (req, res) => {
	res.send('<form name ="logintest" id="logintest" action="/loginVerify" method="post">User<input type="text" id="un" name="un">Pass<input type="text" id="pw" name="pw"><input type="submit" value="Login"></form>');
})

//dump users from db
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
