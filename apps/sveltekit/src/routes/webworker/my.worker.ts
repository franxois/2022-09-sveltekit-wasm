// In `worker.js`.
import sqlite3InitModule, { type Database, type Sqlite3Static } from '@sqlite.org/sqlite-wasm';

const log = console.log;
const error = console.error;

let db: Database;

const start = (sqlite3: Sqlite3Static) => {
	log('Running SQLite3 version', sqlite3.version.libVersion);
	db =
		'opfs' in sqlite3
			? new sqlite3.oo1.OpfsDb('/mydb.sqlite3')
			: new sqlite3.oo1.DB('/mydb.sqlite3', 'ct');
	log(
		'opfs' in sqlite3
			? `OPFS is available, created persisted database at ${db.filename}`
			: `OPFS is not available, created transient database ${db.filename}`
	);
	// Your SQLite code here.

	db.exec(
		`CREATE TABLE IF NOT EXISTS hellos(name TEXT , createAt TIMESTAMP DATETIME DEFAULT(STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW')))`
	);
};

const initializeSQLite = async () => {
	try {
		log('Loading and initializing SQLite3 module...');
		const sqlite3 = await sqlite3InitModule({ print: log, printErr: error });
		log('Done initializing. Running demo...');
		start(sqlite3);

		const res = db.selectObjects('SELECT * FROM hellos order by createAt desc limit 10');
		postMessage({ allHellos: res });
	} catch (err) {
		if (err instanceof Error) {
			error('Initialization error:', err.name, err.message);
		} else {
			error('Initialization error:', err);
		}
	}
};

onmessage = (e) => {
	console.log('worker received message', e.data);

	if (e.data.name) {
		db.prepare('INSERT INTO hellos(name) VALUES(?)').bind(e.data.name).stepFinalize();
	}

	const res = db.selectObjects('SELECT * FROM hellos order by createAt desc limit 10');

	console.log('All hellos:', res);

	postMessage({ allHellos: res });
};

initializeSQLite();
