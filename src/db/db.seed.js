/*
    Seed a new database with the wallet and users table. Will delete any existing db.
*/

var fs = require('fs');
const sqlite3 = require('sqlite3');

var config = require('../config');

function createAssetsTable(db) {
    return db.run(
        `CREATE TABLE assets (
            assetID INTEGER PRIMARY KEY,
            user TEXT NOT NULL,
            assetType TEXT,
            quantity REAL,
            UNIQUE(user, assetType)
        )`
    );
}

function createUsersTable(db) {
    return db.run(
        `CREATE TABLE users (
            userID INTEGER PRIMARY KEY,
            user TEXT NOT NULL,
            hash TEXT NOT NULL,
            salt TEXT NOT NULL,
            iterations INTEGER NOT NULL,
            UNIQUE(user)
        )`);
}

function initDB() {
    // Delete existing database
    if (fs.existsSync(config.db.dbFile)) {
        fs.unlinkSync(config.db.dbFile);
    }

    // Create new database
    let db = new sqlite3.Database(config.db.dbFile);

    createAssetsTable(db);
    createUsersTable(db);
};

if (require.main === module) {
    initDB();
}

module.exports = initDB;





