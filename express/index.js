const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const randtoken = require('rand-token');
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
const hosturl = process.env.hosturl || "http://localhost:3000";
const cors = require('cors');
const connection = require('./db');
const userRouter = require('./routes/user');
const tempPageRouter = require('./routes/tempPage')


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
app.use('/', userRouter);
app.use('/', tempPageRouter);

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

//Authorize login
app.post('/api/auth', function (request, response) {
  let netID = request.body.netID;
  let password = request.body.password;
  let neededVerification = 1;
  //ensure user entered login
  if (netID && password) {
    //query database for username
    connection.query(`SELECT * FROM user WHERE Id = ?`, [netID], function (error, results, fields) {
      if (error) {
        throw error;
      }
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
            response.redirect('/api/loggedin');
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
app.post('/api/signupVerify', (req, res) => {
  console.log(req.body);
  let id = req.body.netID;
  let email = req.body.email;
  let fName = req.body.firstName;
  let lName = req.body.lastName;
  let nName = req.body.preferredName;
  let pWord = req.body.password;
  let pNoun = req.body.pronouns;
  let bio = req.body.bio;
  let token = randtoken.generate(10);
  //check if user exists
  connection.query(`SELECT * FROM user WHERE Id=\'${id}\';`, function (err, result) {

    if (err) {
      throw err;
    }
    if (!(typeof result[0] === "undefined")) {
      res.send('<script>alert("User already exists")</script>');
    } else {
      console.log("New user, proceeding to insert");
    }
  })

  //hash/salting function
  const hpWord = bcrypt.hashSync(pWord, 10);

  //insert into database. Report error if fail, otherwise redirect user to login page
  connection.query(`INSERT INTO user (Id,FirstName,LastName,Email,UserType,Permission,Bio,PName,Pronouns,isVerified,Password,Token) VALUES ('${id}','${fName}','${lName}','${email}','1','1','${bio}','${nName}','${pNoun}','0','${hpWord}','${token}') `, function (err, result) {
    if (err) {
      console.log("Error: ", err);
    } else {
      sendEmail(email, token);
      res.redirect('/#/signin');
    }
  })

});


//create new post as most recent of previous posts
app.post('/api/createPost', (req, res) => {

  //SELECT COUNT(id) AS NumberOfPosts FROM post;

  //get number of posts
  connection.query(`SELECT COUNT(id) AS NumberOfPosts FROM post;`, function (err, result) {
    if (err) {
      throw err;
    }
    /*if (!(typeof result[0] === "undefined")) {
      res.send('<script>alert("User already exists")</script>');
    } else {
      console.log("New user, proceeding to insert");
    }*/
    console.log(result)
  })

/*

  console.log(req.body);
  let title = req.body.title;
  let postbody = req.body.postbody;
  let category = req.body.category;
  let upvotes = 1;
  let userid = req.body.userid;
  let tigerspaceid = req.body.tigerspaceid;
  
  //check if user exists
  connection.query(`SELECT * FROM user WHERE Id=\'${id}\';`, function (err, result) {

    if (err) {
      throw err;
    }
    if (!(typeof result[0] === "undefined")) {
      res.send('<script>alert("User already exists")</script>');
    } else {
      console.log("New user, proceeding to insert");
    }
  })

  //hash/salting function
  const hpWord = bcrypt.hashSync(pWord, 10);

  //insert into database. Report error if fail, otherwise redirect user to login page
  connection.query(`INSERT INTO user (Id,FirstName,LastName,Email,UserType,Permission,Bio,PName,Pronouns,isVerified,Password,Token) VALUES ('${id}','${fName}','${lName}','${email}','1','1','${bio}','${nName}','${pNoun}','0','${hpWord}','${token}') `, function (err, result) {
    if (err) {
      console.log("Error: ", err);
    } else {
      sendEmail(email, token);
      res.redirect('/#/signin');
    }
  })
*/
});