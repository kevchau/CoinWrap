/*
 * Model representation of a user
 */

const { Model } = require('objection');
const Knex = require('knex');

const config = require('../config');

// Initialize knex.
const knex = Knex({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: config.db.dbFile
    }
});

// Give the knex instance to objection.
Model.knex(knex);

class User extends Model {

    static get tableName() {
        return 'users';
    }

    static get idColumn() {
        return 'userID';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['user', 'hash'],

            properties: {
                userID: { type: 'integer' },
                user: { type: 'string' },
                hash: { type: 'string' }
            }
        }
    }
}

module.exports = User;