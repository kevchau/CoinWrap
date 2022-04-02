const crypto = require('crypto');
const pbkdf2 = require('pbkdf2');
const jwt = require('jsonwebtoken');

const config = require('../config');
const User = require('./user.model');

// Authenticate the user and generate a token
exports.login = async (username, password, res, next) => {

    try {
        // Get user
        let user = await User.query().findOne({ user: username });
        if (!user) {
            throw Error('Incorrect username or password');
        }

        // Hash password
        let hash = pbkdf2.pbkdf2Sync(password, user.salt, user.iterations, config.auth.keyLength, config.auth.digest).toString('base64');

        // Compare hashes
        if (hash != user.hash) {
            throw Error('Incorrect username or password');
        }

        // Generate jwt
        let token = jwt.sign({id: username}, config.auth.secret, { expiresIn: '2h' });
        res.json({ token: token });

    } catch (err) {
        next(err);
    }
};

// Create a new user
exports.createUser = async (username, password, res, next) => {

    try {
        // Check if user already exists
        let existingUser = await User.query().findOne({ user: username });
        if (existingUser) {
            throw Error('User already exists');
        }

        // Create new user
        let salt = crypto.randomBytes(128).toString('base64');
        let iterations = config.auth.iterations;
        let hash = pbkdf2.pbkdf2Sync(password, salt, iterations, config.auth.keyLength, config.auth.digest).toString('base64');

        await User.query().insert({
            user: username,
            hash: hash,
            salt: salt,
            iterations: iterations
        });

        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
};

// Validate the token
exports.verifyToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.sendStatus(401);
    } else {
        jwt.verify(token, config.auth.secret, (err, user) => {

            if (err) {
                res.sendStatus(401);
            } else {
                req.user = user.id
                next()
            }
        });
    }

};


