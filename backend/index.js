const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('express-flash');
const session = require('express-session');
const mysql = require('mysql');
const e = require('express');

//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//connection data for the database
var connection = mysql.createConnection({
  host: '64.20.43.250',
  user: 'azziedev_tigertalksdb',
  password: 'NOX3-PJ]9i-s',
  database: 'azziedev_tigertalks'
})

//Authorize login
app.post('/auth', function(request, response) {
	var netID = request.body.netID;
	var password = request.body.password;
  var name;
	if (netID && password) {
		connection.query('SELECT * FROM user WHERE ID = ? AND password = ?', [netID, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.netID = netID;
        request.session.name=results[0].FirstName;
				response.redirect('/loggedIn');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

//Verify if user is logged in
app.get('/loggedIn', function(request, response) {
	if (request.session.loggedin) {
    console.log(request.session);
		response.send('Welcome back, ' + request.session.name + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

//reads req and verifies user doesnt exist already
app.post('/registerVerify', (req, res) => {
    let id = req.body.netID;
    let email=req.body.Email;
    let fName=req.body.fName;
    let lName=req.body.lName;
    let nName=req.body.nName;
    let pWord=req.body.pword;
    let pNoun=req.body.pronoun;
    let bio=req.body.bio;

    connection.query(`SELECT * FROM user WHERE ID=${id};`,function(err,result){
    if (!(typeof result[0] === "undefined")){
      res.send('<script>alert("User already exists")</script>');
    }
    else{
      console.log("New user, proceeding to insert");
    }
  })

  connection.query(`INSERT INTO user (ID,FirstName,LastName,Email,UserType,Permission,Bio,PName,Pronouns,isVerified,Password) VALUES ('${id}','${fName}','${lName}','${email}','1','1','${bio}','${nName}','${pNoun}','0','${pWord}') `,function(err,result){
    if (err){
      console.log("Error: ",err);
    }
    else{
      res.send("Registered!")
    }
  })
    
});

// Temp Register page
app.get('/register', (req, res) => {
	res.send('<form id="logintest" action="/registerVerify" method="post" name="logintest">Net ID<input id="netID" name="netID" type="text" required/><br />Email<input id="netID" name="Email" type="Email" required/><br />First Name<input id="fName" name="fName" type="text" required/><br />Last Name<input id="lName" name="lName" type="text" required/><br />Preferred Name<input id="nName" name="nName" type="text" required/><br />Password<input id="pword" name="pword" type="text" required/><br />Verify Password<input id="vPword" name="vPword" type="text" /><br required/>Pronoun<input id="pronoun" name="pronoun" type="text" required/><br />Bio<input id="bio" name="bio" type="text" style="height:100px;width:500px" required/><br /><input type="submit" value="Register" /></form>');
})

// Temp Login Page
app.get('/login', (req, res) => {
	res.send('<h1>Login Form</h1> <form action="/auth" method="POST"> <input type="text" name="netID" placeholder="Net-ID" required> <input type="password" name="password" placeholder="Password" required> <input type="submit"> </form>');
})


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


//dump users from db
app.get('/selectExample', (req, res) => {
  
  connection.query("SELECT * FROM user", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    res.send(result);
  });
  

})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
