const nedb = require('nedb');
const thenify = require('thenify');

/**
 * NeDB methods
 * https://github.com/louischatriot/nedb#api
 * TODO: support skip/limit/sort/exec
 */
const methods = [
	'loadDatabase',
	'insert',
	'find',
	'findOne',
	'count',
	'update',
	'remove',
	'removeIndex',
	'ensureIndex',
];

function getInstance(dbInstance) {
	const neDB = { nedb: dbInstance };
	methods.forEach((m, i) => {
		neDB[m] = thenify(dbInstance[m].bind(dbInstance));
	});
	return neDB;
}

function dataStore(options) {
	var dbInstance = new nedb(options)
	return getInstance(dbInstance)
}

dataStore.init = dataStore;

/**
 * USAGE
 * const asyncNedb = require('./lib/asyncNedb');
 * const db = asyncNedb.init(options);
 * await db.find({}); / db.find({}).then();
 * // 同 NeDB(https://github.com/louischatriot/nedb#api)
 */
module.exports = dataStore;