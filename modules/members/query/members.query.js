const DATABASE_NAME = 'api';
const TABLE_NAME = 'user_info';
const Database = require('../../utils/database');
const db = new Database(DATABASE_NAME, TABLE_NAME);

console.log(db);
