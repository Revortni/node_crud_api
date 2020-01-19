const DATABASE_NAME = 'app';
const TABLE_NAME = 'user_info';
const Database = require('../../../utils/database');
const db = new Database({ database: DATABASE_NAME, table: TABLE_NAME });

const connect = params => {
  return db.connect(params);
};

//insert records
//Input: keys value pairs
const insertRecord = data => {
  return db.insert(data);
};

//Fetch a record from database with matching key value pair
const fetchRecord = param => {
  return db.fetch(param);
};

//delete a record from database with matching id
const updateRecord = ({ id, data }) => {
  return db.update({ id, data });
};

//delete a record from database with matching id
const deleteRecord = id => {
  return db.delete(id);
};

module.exports = {
  connect,
  insertRecord,
  fetchRecord,
  updateRecord,
  deleteRecord
};
