//import sql
const mysql = require('mysql');
const TABLE_NAME = 'user_info';

//create connection
const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'api'
});

//execute the sql query
const runQuery = sql => {
	return new Promise((resolve, reject) => {
		con.query(sql, (err, result) => {
			if (err) return reject(err);
			return resolve(result);
		});
	});
};

//insert a single record
const insertRecord = data => {
	const keys = Object.keys(data);
	const values = Object.values(data);
	const headers = keys.join(',');
	const records = values.map(x => `'${x}'`).join(',');
	const sql = `INSERT INTO ${TABLE_NAME} (${headers}) VALUES (${records})`;
	return runQuery(sql);
};

//Fetch a record from database with matching id
const fetchRecord = id => {
	const sql = `SELECT * FROM ${TABLE_NAME} where id=${id}`;
	return runQuery(sql);
};

//fetch all records from database
const fetchAll = () => {
	const sql = `SELECT * FROM ${TABLE_NAME}`;
	return runQuery(sql);
};

//delete a record from database with matching id
const updateRecord = ({ id, data }) => {
	const keys = Object.keys(data);
	const statement = keys.map(x => `${x} = '${data[x]}'`).join(',');
	const sql = `UPDATE ${TABLE_NAME} SET ${statement} WHERE id = ${id}`;
	// return runQuery(sql);
	return runQuery(sql);
};

//delete a record from database with matching id
const deleteRecord = id => {
	const sql = `DELETE FROM ${TABLE_NAME} WHERE id = ${id}`;
	return runQuery(sql);
};

//initialize a table
const createTable = () => {
	const sql = `CREATE TABLE user_info (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255),username VARCHAR(255), phone VARCHAR(255),website VARCHAR(255))`;
	runQuery(sql);
};

//insert data from file
const insertFromFile = () => {
	//static data
	const DATA = require('./data.json');

	DATA.forEach(x => {
		const keys = Object.keys(x);
		const values = Object.values(x);
		insertRecord(keys, values);
	});
};

//connect to database
const connect = () => {
	con.connect(err => {
		if (err) throw err;
		console.log('connected');
	});
};

module.exports = {
	runQuery,
	insertRecord,
	fetchRecord,
	updateRecord,
	deleteRecord,
	connect,
	fetchAll
};
