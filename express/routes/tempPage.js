const express = require('express');
const router = express.Router();

// Temp Register page
router.get('/api/register', (req, res) => {
  res.send('Register Form<form id="logintest" action="/api/registerverify" method="post" name="logintest">Net ID<input id="netID" name="netID" type="text" required/><br />Email<input id="netID" name="Email" type="Email" required/><br />First Name<input id="fName" name="fName" type="text" required/><br />Last Name<input id="lName" name="lName" type="text" required/><br />Preferred Name<input id="nName" name="nName" type="text" required/><br />Password<input id="pword" name="pword" type="text" required/><br />Verify Password<input id="vPword" name="vPword" type="text" /><br required/>Pronoun<input id="pronoun" name="pronoun" type="text" required/><br />Bio<input id="bio" name="bio" type="text" style="height:100px;width:500px" required/><br /><input type="submit" value="Register" /></form>');
});

// Temp Login Page
router.get('/api/login', (req, res) => {
  res.send('<h1>Login Form</h1> <form action="/api/auth" method="POST"> <input type="text" name="netID" placeholder="Net-ID" required> <input type="password" name="password" placeholder="Password" required> <input type="submit"> </form>');
});

module.exports = router;