const express = require('express');
const router = express.Router();
const connection = require('../db');


//Get comments by ID
router.get('/api/getcomment/:id', (req, res) => {

    let commentId = decodeURIComponent(req.params.id);

    connection.query(`SELECT * FROM comment WHERE ID=${commentId};`, function (err, result) {
        if (err) {
            throw err;
        }
        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.json({
                "Id": "N/A",
                "FirstName": "N/A",
                "LastName": "N/A",
                "Email": "N/A",
                "UserType": "N/A",
                "Permission": "N/A",
                "Bio": "N/A",
                "PName": "N/A",
                "Pronouns": "N/A",
                "IsVerified": "N/A",
                "Password": "N/A"
            });
        }

    })

});

//Get user by ID
router.get('/api/getuser/:id', (req, res) => {

    let userID = decodeURIComponent(req.params.id);

    connection.query(`SELECT * FROM user WHERE Id=\'${userID}\';`, function (err, result) {
        if (err) {
            throw err;
        }
        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(200).json({
                "Id": "N/A",
                "FirstName": "N/A",
                "LastName": "N/A",
                "Email": "N/A",
                "UserType": "N/A",
                "Permission": "N/A",
                "Bio": "N/A",
                "PName": "N/A",
                "Pronouns": "N/A",
                "IsVerified": "N/A",
                "Password": "N/A"
            });
        }

    })

});

//Get all users
router.get('/api/getusers', (req, res) => {

    connection.query(`SELECT * FROM user`, function (err, result) {
        if (err) {
            throw err;
        }
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(200).json({
                "Id": "N/A",
                "FirstName": "N/A",
                "LastName": "N/A",
                "Email": "N/A",
                "UserType": "N/A",
                "Permission": "N/A",
                "Bio": "N/A",
                "PName": "N/A",
                "Pronouns": "N/A",
                "IsVerified": "N/A",
                "Password": "N/A"
            });
        }

    })

});

//Get tigerspace by id
router.get('/api/gettigerspace/:id', (req, res) => {

    let tigerId = decodeURIComponent(req.params.id);

    connection.query(`SELECT * FROM tigerspace WHERE ID=${tigerId};`, function (err, result) {
        if (err) {
            throw err;
        }
        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(200).json({
                "Id": "N/A",
                "UserId": "N/A",
                "Title": "N/A",
                "Description": "N/A",
                "Type": "N/A"
            });
        }

    })

});

//Get post by ID in URL
router.get('/api/getpost/:id', (req, res) => {

    let id = decodeURIComponent(req.params.id);

    connection.query(`SELECT * FROM post WHERE ID=${id};`, function (err, result) {
        if (err) {
            throw err;

        }
        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(200).json({
                "Id": "N/A",
                "Title": "N/A",
                "Body": "N/A",
                "Category": "N/A",
                "Upvotes": "N/A",
                "Timestamp": "N/A",
                "UserId": "N/A",
                "TIgerSpaceId": "N/A"
            });
        }

    })

});

//Get comments by postid
router.get('/api/getpostcomments/:postid', (req, res) => {

    let postId = decodeURIComponent(req.params.postid);

    connection.query(`SELECT * FROM comment WHERE PostId=${postId};`, function (err, result) {
        if (err) {
            throw err;
        }
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(200).json({
                "Id": "N/A",
                "UserId": "N/A",
                "PostId": "N/A",
                "Timestamp": "N/A",
                "Body": "N/A",
                "Upvotes": "N/A"
            });
        }

    })

});

//dump users from db
router.get('/api/selectexample', (req, res) => {

    connection.query("SELECT * FROM user", function (err, result, fields) {
        // if any error while executing above query, throw error
        if (err) throw err;
        // if there is no error, you have the result
        res.json(result);
    });

});

// basic request
router.get('/api/hello', (req, res) => {
    let jsonResponse = {
      message: "Hello friends!"
    };
    res.json(jsonResponse);
  });

module.exports = router;