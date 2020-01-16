//import sql
const mysql = require('mysql');

class Database {
	constructor({ database, tableName }) {
		this.database = database;
		this.table = tableName;
	}

	//connect to database
	connect = () => {
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database: this.database
		});

		//create connection
		connection.connect(err => {
			if (err) throw console.log(err);
			console.log('connected');
		});
		this.connection = connection;
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
	insertRecord = data => {
		const keys = Object.keys(data);
		const values = Object.values(data);
		const headers = keys.join(',');
		const records = values.map(x => `'${x}'`).join(',');
		const sql = `INSERT INTO ${this.table} (${headers}) VALUES (${records})`;
		return runQuery(sql);
	};

	//Fetch a record from database with matching key value pair
	fetchRecord = ({ key, value }) => {
		const sql = `SELECT * FROM ${this.table} where ${key}=${value}`;
		return runQuery(sql);
	};

	//fetch all records from database
	fetchAll = () => {
		const sql = `SELECT * FROM ${this.table}`;
		return runQuery(sql);
	};

	//delete a record from database with matching id
	updateRecord = ({ id, data }) => {
		const keys = Object.keys(data);
		const statement = keys.map(x => `${x} = '${data[x]}'`).join(',');
		const sql = `UPDATE ${this.table} SET ${statement} WHERE id = ${id}`;
		return runQuery(sql);
	};

	//delete a record from database with matching id
	deleteRecord = id => {
		const sql = `DELETE FROM ${this.table} WHERE id = ${id}`;
		return runQuery(sql);
	};

	checkIfTableExists = () => {
		const sql = `SELECT * FROM information_schema.tables WHERE table_schema = '${this.database}' AND table_name = '${this.table}' LIMIT 1;`;
		return runQuery(sql);
	};

	//initialize a table
	createTable = () => {
		const sql = `CREATE TABLE ${this.table} (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255),username VARCHAR(255), phone VARCHAR(255),website VARCHAR(255),email VARCHAR(255))`;
		return runQuery(sql);
	};
}

module.exports = Database;
