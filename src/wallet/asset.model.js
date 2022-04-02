/*
 * Model representation for an asset in a wallet
 */

const { Model } = require('objection');
const Knex = require('knex');

const config = require('./../config');

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

class Asset extends Model {

    static get tableName() {
        return 'assets';
    }

    static get idColumn() {
        return 'assetID';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['user', 'assetType', 'quantity'],

            properties: {
                assetID: { type: 'integer' },
                user: { type: 'string' },
                assetType: { type: 'string' },
                quantity: { type: 'number' }
            }
        }
    }
}

module.exports = Asset;