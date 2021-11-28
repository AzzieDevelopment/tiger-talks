const jwt = require('jsonwebtoken');

//read global secret vars
const fs = require('fs');
let rawdata = fs.readFileSync('express/global.json');
let secretData = JSON.parse(rawdata);

// verify token middleware
function verifyToken(req, res, next) {
    // check if headers contain authorization
    if (!req.headers.authorization) {
      return res.status(401).send('Unauthorized request.');
    }

    // get token from authorization header
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
      return res.status(401).send('Unauthorized request.');
    }

    try {
        // attempt to verify token
        let payload = jwt.verify(token, secretData.jwtkey);
        if (!payload) {
          return res.status(401).send('Unauthorized request.');
        }
        req.userId = payload.subject;
        next(); // continue with request
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            res.status(401).send({ message: "Session expired." });
        } else if (err instanceof jwt.JsonWebTokenError) {
            res.status(403).send({ message: "Invalid token." });
        } else {
            console.error(err);
        }
        // note: request goes no further on error
    }
  }

  module.exports = verifyToken;