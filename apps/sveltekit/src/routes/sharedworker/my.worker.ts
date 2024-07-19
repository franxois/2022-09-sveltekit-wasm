// In `worker.js`.
import sqlite3InitModule, { type Sqlite3Static } from '@sqlite.org/sqlite-wasm';

const log = console.log;
const error = console.error;

const start = (sqlite3: Sqlite3Static) => {
	log('Running SQLite3 version', sqlite3.version.libVersion);
	const db =
		'opfs' in sqlite3
			? new sqlite3.oo1.OpfsDb('/mydb.sqlite3')
			: new sqlite3.oo1.DB('/mydb.sqlite3', 'ct');
	log(
		'opfs' in sqlite3
			? `OPFS is available, created persisted database at ${db.filename}`
			: `OPFS is not available, created transient database ${db.filename}`
	);
	// Your SQLite code here.
};

const initializeSQLite = async () => {
	try {
		log('Loading and initializing SQLite3 module...');
		const sqlite3 = await sqlite3InitModule({ print: log, printErr: error });
		log('Done initializing. Running demo...');
		start(sqlite3);
	} catch (err) {
		if (err instanceof Error) {
			error('Initialization error:', err.name, err.message);
		} else {
			error('Initialization error:', err);
		}
	}
};

initializeSQLite();

(self as unknown as SharedWorkerGlobalScope).onconnect = (e) => {
	console.log('worker connected', e);

	const port = e.ports[0];
	port.onmessage = (e) => {
		console.log('worker received message', e.data);
	};

	port.onmessageerror = (e) => {
		console.log('worker received error', e.data);
	};

	port.onmessage = (e) => {
		console.log('worker received message', e.data);
	};

	port.postMessage('Hello from worker');

	port.start();
};
