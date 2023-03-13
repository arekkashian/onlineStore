const fs = require('fs');

let connection = null;
let initSQL = fs.readFileSync("initDB.sql").toString();

const sqlite3 = require('sqlite3').verbose();

module.exports.liteConnect = () => {
	if (connection == null) {
		connection = new sqlite3.Database(':memory:', (err) => {
			if (err) {
				return console.error('Connection error');
			}
			console.log("Connected to SQlite");
		});
	}
	
	connection.exec(initSQL);
	return connection;
};
