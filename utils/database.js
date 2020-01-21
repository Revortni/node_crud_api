//import sql
const mysql = require('mysql');

class Database {
  constructor({ database, table }) {
    this.database = database;
    this.table = table;
    this.connection = null;
  }

  //connect to database
  connect = param => {
    const { host, user, password } = param;
    const database = this.database;

    this.connection = mysql.createConnection({
      host,
      user,
      password,
      database
    });

    return new Promise((resolve, reject) => {
      //create connection
      this.connection.connect(err => {
        if (err) reject(err);
        resolve(`Connected to ${this.database} database ${this.table}`);
      });
    });
  };

  //execute the sql query
  runQuery = sql => {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  };

  //insert records
  //Input: keys value pairs
  insert = data => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const headers = keys.join(',');
    const records = values.map(x => `'${x}'`).join(',');
    const sql = `INSERT INTO ${this.table} (${headers}) VALUES (${records})`;
    return this.runQuery(sql);
  };

  /**
   * Fetch a record from database with matching key value pair
   *
   * @param { key : value, ... },   key: Header of column , value: value of column
   *
   * @return { array }, Returns array of records matching condition.
   */
  fetch = param => {
    let condition = '';
    if (Object.keys(param).length > 0) {
      const keys = Object.keys(param);
      const statement = keys.map(x => ` ${x} = '${param[x]}' `).join('AND');
      condition = ` WHERE${statement}`;
    }
    const sql = `SELECT * FROM ${this.table}${condition}`;
    return this.runQuery(sql);
  };

  /**
   * Deletes a record from database with matching id.
   *
   * @param id,   id of record to be deleted
   *
   * @param { key : value, ... }   key: Header of column , value: value of column
   *
   * @return { array }  status of database table
   */
  update = ({ id, data }) => {
    const keys = Object.keys(data);
    const statement = keys.map(x => `${x} = '${data[x]}'`).join(',');
    const sql = `UPDATE ${this.table} SET ${statement} WHERE id = ${id}`;
    return this.runQuery(sql);
  };

  //delete a record from database with matching id
  delete = id => {
    const sql = `DELETE FROM ${this.table} WHERE id = ${id}`;
    return this.runQuery(sql);
  };

  checkIfTableExists = () => {
    const sql = `SELECT * FROM information_schema.tables WHERE table_schema = '${this.database}' AND table_name = '${this.table}' LIMIT 1;`;
    return this.runQuery(sql);
  };

  //initialize a table
  createTable = () => {
    const sql = `CREATE TABLE ${this.table} (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255),username VARCHAR(255), phone VARCHAR(255),website VARCHAR(255),email VARCHAR(255))`;
    return this.runQuery(sql);
  };

  checkIfRecordExists = param => {
    let condition = '';
    if (Object.keys(param).length > 0) {
      const keys = Object.keys(param);
      const statement = keys.map(x => ` ${x} = '${param[x]}' `).join('OR');
      condition = ` WHERE${statement}`;
    }
    const sql = `SELECT * FROM ${this.table}${condition}`;
    return this.runQuery(sql);
  };
}

module.exports = Database;
