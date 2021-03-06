const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./shared/db.json');
const db = low(adapter);

db.defaults({ books: [], users: [], trans: [] }).write();

module.exports = db;