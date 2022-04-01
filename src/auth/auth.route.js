const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const authController = require('./auth.controller');

// Authenticate user 
router.post('/login', function (req, res, next) {
    let user = req.body.user;
    let password = req.body.password;

    if (user && password) {
        authController.login(user, password, res, next);
    } else {
        throw Error('Invalid username or password');
    }

});

// Create user
router.post('/new', function (req, res, next) {
    let user = req.body.user;
    let password = req.body.password;

    if (user && password) {
        authController.createUser(user, password, res, next);
    } else {
        throw Error('Invalid username or password');
    }

});

module.exports = router;