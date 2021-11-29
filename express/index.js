const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const randtoken = require('rand-token');
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
const hosturl = process.env.hosturl || "http://localhost:3000";
const cors = require('cors');
const jwt = require('jsonwebtoken');

const connection = require ('./js/db');
const userRouter = require ('./routes/user');
const tempPageRouter = require ('./routes/tempPage');


//read global secret vars
const fs = require('fs');
let rawdata = fs.readFileSync('express/global.json');
let secretData = JSON.parse(rawdata);
//end of global secret vars

// ============================================================
// Express Server Set Up
// ============================================================

const app = express();

// Enable user routes in user.js
app.use('/',userRouter);
app.use('/',tempPageRouter);

//Enable temp pages in tempPage.js

// Middleware to connect Express and Angular
app.use(express.static(path.join(__dirname, '../build/')));
app.use(express.json());

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
    host: secretData.emailhost,
    port: '465',
    auth: {
      user: secretData.emailuser, // Your email id
      pass: secretData.emailpassword // Your password
    }
  });

  let mailOptions = {
    from: 'noreply@tigertalks.com',
    to: email,
    subject: 'Email verification - TigerTalks.com',
    html: `<p>You requested for email verification, kindly <a href="` + hosturl + `/api/verifytoken/${encodeURIComponent(token)}/email/${encodeURIComponent(email)}">click here to verify your email</a>.</p>`

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

function generateJWT(id) {
  let payload = { subject: id };
  let options = { expiresIn: secretData.jwtexpiration };
  return jwt.sign(payload, secretData.jwtkey, options);
}

//body parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));



// Use cors to bypass cross origin security error
app.use(cors());

// ============================================================
// Endpoints
// ============================================================
// '/' is an "endpoint", more can be made to make requests to backend (e.g. app.get('/getRecentPosts) etc)


//display the host URL which can be an environmetal variable
app.get('/api/hosturl', function (request, response) {
  response.send(hosturl);
  console.log(hosturl);
});

app.get('/api/verifytoken/:token/email/:email', (req, res) => {
  let email = decodeURIComponent(req.params.email);
  let token = decodeURIComponent(req.params.token);
  let isVerified = 0;
  console.log(req.params)
  connection.query('SELECT * FROM user WHERE Email = ?', [email], function (error, results, fields) {
    if (error) {
      throw error;
    }
    if (results.length > 0) {
      if (results[0].Token === token) {
        isVerified = 1;
        console.log("did update to 1!")
      } else {
        res.send("Wrong token/email!");
      }
    } else {
      console.log("error here");
    }

    if (isVerified == 1) {
      connection.query(`UPDATE user SET isVerified='1' WHERE Token =?`, [token], function (err, result) {
        if (err) throw err;
        console.log("Record updated");
        res.redirect('/#/signin');

      })
    }
  })
})

// Authorize login
app.post('/api/auth', function (req, res) {
  let netID = req.body.netID;
  let password = req.body.password;
  
  //ensure user entered login
  if (netID && password) {
    //query database for username
    connection.query(`SELECT * FROM user WHERE Id = ?`, [netID], function (error, results, fields) {
      if (error) {
        throw error;
      }
      if (results.length > 0) {
        if (results[0].IsVerified !== 1) {
          res.status(403).send("Please Verify Email!")
        } else {
          //check password hash validity
          let hash = results[0].Password;
          if (bcrypt.compareSync(password, hash)) {
            req.session.loggedin = true;
            req.session.netID = netID;
            req.session.name = results[0].FirstName;

            // generate jwt token
            let token = generateJWT(netID);
            res.status(200).cookie('token', token).send({message: 'Login successful!'});
          } else {
            res.status(401).send('Incorrect Username and/or Password!'); //wrong password but don't tell user
          }
        }
      } else {
        res.status(401).send('Incorrect Username and/or Password!'); //wrong username but don't tell user
      }
      res.end();
    });
  } else {
    res.status(401).send('Please enter Username and Password!');
    res.end();
  }
});

// logout user; delete server-session and local cookie
app.get('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/#/home');
  });
  res.clearCookie('token');
});

//Verify if user is logged in
app.get('/api/loggedin', function (request, response) {
  if (request.session.loggedin) {
    console.log(request.session);
    response.send('Welcome back, ' + request.session.name + '!');
  } else {
    response.send('Please login to view this page!');
  }
  response.end();
});

//reads req and verifies user doesnt exist already
app.post('/api/registerUser', (req, res) => {
  let user = {
    id: req.body.Id,
    fName: req.body.FirstName,
    lName: req.body.LastName,
    email: req.body.Email,
    userType: req.body.UserType,
    permission: req.body.Permission,
    bio: req.body.Bio || '',
    pName: req.body.PreferredName || '',
    pronouns: req.body.Pronouns || '',
    password: bcrypt.hashSync(req.body.Password, 10), //hash/salting function
    isVerified: 0,
    token: randtoken.generate(10)
  }
  
  //check if user exists
  connection.query(`SELECT * FROM user WHERE Id=\'${user.id}\' OR Email=\'${user.email}\';`, function (err, result) {
    if (err) {
      console.log(err);
      throw err;
    }
    if (result[0] !== undefined) {
      console.log('User exists');
      res.status(403).send("User already exists");
    } else {
      console.log("New user, proceeding to insert");
      //insert into database. Report error if fail, otherwise redirect user to login page
      connection.query(`INSERT INTO user (Id,FirstName,LastName,Email,UserType,Permission,Bio,PName,Pronouns,isVerified,Password,Token) 
                        VALUES ('${user.id}','${user.fName}','${user.lName}','${user.email}','${user.userType}','${user.permission}','
                                ${user.bio}','${user.pName}','${user.pronouns}','${user.isVerified}','${user.password}','${user.token}') `, 
        function (err, result) {
          if (err) {
            console.log("Error: ", err);
          } else {
            // send verification email
            sendEmail(user.email, user.token);
            res.status(200).send({message: 'Account created.'});
          }
        }
      );
    }
  })
  
});

app.get('/api/sendEmail/verify/:id', (req, res) => {
  let userID = decodeURIComponent(req.params.id);
  
  connection.query(`SELECT Email, Token FROM user WHERE Id=\'${userID}\';`, function (err, result) {
    if (err) {
        throw err;
    }
    if (result.length > 0) {
      let email = result[0].Email;
      let token = result[0].Token;
      sendEmail(email, token);
      res.status(200).send({ message: 'Verification email sent!'});
    } else {
      console.log('User does not exist');
      res.status(401).send({ message: 'User does not exist.'});
    }

  })
});
