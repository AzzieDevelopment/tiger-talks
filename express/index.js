const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('express-flash');
const session = require('express-session');
const mysql = require('mysql');
const e = require('express');
const randtoken = require('rand-token');
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
const hosturl = process.env.hosturl || "http://localhost:3000";


// ============================================================
// Express Server Set Up
// ============================================================

// Middleware to connect Express and Angular
app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json());

// Catch all requests and return Angular HTML file
// app.all('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build/index.html'))
// });


// Listen for requests on defined port
const port = process.env.PORT || 3000;
var server = app.listen(port, 'localhost', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('TigerTalks listening at http://%s:%s', host, port);
});


// Send email
function sendEmail(email, token) {
  let mail = nodemailer.createTransport({
    host: 'mail.azziedevelopment.com',
    port: '465',
    auth: {
      user: 'tigertalks484@azziedevelopment.com', // Your email id
      pass: 'cosc484JAL' // Your password
    }
  });

  let mailOptions = {
    from: 'noreply@tigertalks.com',
    to: email,
    subject: 'Email verification - TigerTalks.com',
    html: `<p>You requested for email verification, kindly <a href="` + hosturl + `/verifyToken/${encodeURIComponent(token)}/email/${encodeURIComponent(email)}">click here to verify your email</a>.</p>`

  };

  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return 1
    } else {
      console.log("Email Sent");
      return 0
    }
  });
}

//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// ============================================================
// Database Connection Set Up
// ============================================================

//connection data for the database
var connection = mysql.createConnection({
  host: '64.20.43.250',
  user: 'azziedev_tigertalksdb',
  password: 'NOX3-PJ]9i-s',
  database: 'azziedev_tigertalks'
})

//Database connect status
connection.connect((err) => {
  if (!err) {
    console.log("Connected");
  }
  else {
    console.log("Connection Failed");
  }
})

// ============================================================
// Endpoints
// ============================================================
// '/' is an "endpoint", more can be made to make requests to backend (e.g. app.get('/getRecentPosts) etc)

// landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

//display the host URL which can be an environmetal variable
app.get('/hosturl', function (request, response) {
  response.send(hosturl);
  console.log(hosturl);
});

app.get('/verifyToken/:token/email/:email', (req, res) => {
  let email = decodeURIComponent(req.params.email);
  let token = decodeURIComponent(req.params.token);
  let isVerified = 0;
  console.log(req.params)
  connection.query('SELECT * FROM user WHERE Email = ?', [email], function (error, results, fields) {
    if (results.length > 0) {
      if (results[0].token == token) {
        isVerified = 1;
        console.log("did update to 1!")
      }
      else {
        res.send("Wrong token/email!");
      }
    } else {
      console.log("error here");
    }

    if (isVerified == 1) {
      console.log("Here");
      connection.query(`UPDATE user SET isVerified='1' WHERE token =?`, [token], function (err, result) {
        if (err) throw err;
        console.log("Record updated");
        res.redirect('/login');

      })
    }
  })
})

//Authorize login
app.post('/auth', function (request, response) {
  let netID = request.body.netID;
  let password = request.body.password;
  let neededVerification = 1;
  //ensure user entered login
  if (netID && password) {
    //query database for username
    connection.query('SELECT * FROM user WHERE ID = ?', [netID], function (error, results, fields) {
      if (results.length > 0) {
        if (neededVerification != results[0].IsVerified) {
          response.send("Please Verify Email!")
        } else {
          //check password hash validity
          let hash = results[0].Password;
          if (bcrypt.compareSync(password, hash)) {
            request.session.loggedin = true;
            request.session.netID = netID;
            request.session.name = results[0].FirstName;
            response.redirect('/loggedIn');
          } else {
            response.send('Incorrect Username and/or Password!'); //wrong password but don't tell user
          }
        }
      } else {
        response.send('Incorrect Username and/or Password!'); //wrong username but don't tell user
      }
      response.end();
    });
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
});

//Verify if user is logged in
app.get('/loggedIn', function (request, response) {
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
  let email = req.body.Email;
  let fName = req.body.fName;
  let lName = req.body.lName;
  let nName = req.body.nName;
  let pWord = req.body.pword;
  let pNoun = req.body.pronoun;
  let bio = req.body.bio;
  let token = randtoken.generate(10);
  //check if user exists
  connection.query(`SELECT * FROM user WHERE ID=${id};`, function (err, result) {
    if (!(typeof result[0] === "undefined")) {
      res.send('<script>alert("User already exists")</script>');
    }
    else {
      console.log("New user, proceeding to insert");
    }
  })

  //hash/salting function
  const hpWord = bcrypt.hashSync(pWord, 10);

  //insert into database. Report error if fail, otherwise redirect user to login page
  connection.query(`INSERT INTO user (ID,FirstName,LastName,Email,UserType,Permission,Bio,PName,Pronouns,isVerified,Password,token) VALUES ('${id}','${fName}','${lName}','${email}','1','1','${bio}','${nName}','${pNoun}','0','${hpWord}','${token}') `, function (err, result) {
    if (err) {
      console.log("Error: ", err);
    }
    else {
      sendEmail(email, token);
      res.redirect('/login');
    }
  })

});

// Temp Register page
app.get('/register', (req, res) => {
  res.send('Register Form<form id="logintest" action="/registerVerify" method="post" name="logintest">Net ID<input id="netID" name="netID" type="text" required/><br />Email<input id="netID" name="Email" type="Email" required/><br />First Name<input id="fName" name="fName" type="text" required/><br />Last Name<input id="lName" name="lName" type="text" required/><br />Preferred Name<input id="nName" name="nName" type="text" required/><br />Password<input id="pword" name="pword" type="text" required/><br />Verify Password<input id="vPword" name="vPword" type="text" /><br required/>Pronoun<input id="pronoun" name="pronoun" type="text" required/><br />Bio<input id="bio" name="bio" type="text" style="height:100px;width:500px" required/><br /><input type="submit" value="Register" /></form>');
});

// Temp Login Page
app.get('/login', (req, res) => {
  res.send('<h1>Login Form</h1> <form action="/auth" method="POST"> <input type="text" name="netID" placeholder="Net-ID" required> <input type="password" name="password" placeholder="Password" required> <input type="submit"> </form>');
});

// basic request
app.get('/hello', (req, res) => {
  res.send('Hello friends!');
});


//dump users from db
app.get('/selectExample', (req, res) => {

  connection.query("SELECT * FROM user", function (err, result, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    res.send(result);
  });

});


// Per group advice, changed to clickable link
// Verify email and token from verifyEmailForm Page
// app.post('/verifyEmail', (req,res)=> {
//   let email=req.body.email;
//   let token=req.body.token;
//   let isVerified=0;
//   connection.query('SELECT * FROM user WHERE Email = ?', [email], function(error, results, fields) {
//     if(results.length>0){
//       if (results[0].token==token){
//           isVerified=1;
//           console.log("did update to 1!")
//       }
//       else{
//         res.send("Wrong token/email!");
//       }
//     } else {
//       console.log("error here");
//     }

//     if(isVerified==1){
//       console.log("Here");
//     connection.query(`UPDATE user SET isVerified='1' WHERE token =?`,[token], function(err,result){
//       if (err) throw err;
//       console.log("Record updated");
//       res.redirect('/login');

//     })
//   }
//   })
// })

// Form to verify email before logging in, not needed with clickable link
//app.get('/verifyEmailForm', (req, res) => {res.send('<form action="/verifyEmail" method="post" name="verifyEmail">Email: <input name="email" type="text" placeholder="Email goes here" /> <br>Token: <input name="token" type="text" placeholder="Token goes here" /><br /><input type="submit" value="Register" /></form>');})
