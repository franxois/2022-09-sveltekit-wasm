import sqlite3InitModule, { type Database, type Sqlite3Static } from '@sqlite.org/sqlite-wasm';

const log = (...args: any) => console.log('[HellosRepository]', ...args);
const error = (...args: any) => console.error('[HellosRepository]', ...args);

export class HellosRepository {
	constructor() {}

	private db: Database | undefined = undefined;

	initializeSQLite = async () => {
		try {
			log('Loading and initializing SQLite3 module...');
			const sqlite3 = await sqlite3InitModule({ print: log, printErr: error });
			log('Done initializing. Running demo...');
			this.start(sqlite3);

			let opfsRoot = await navigator.storage.getDirectory();
			log({ opfsRoot });

			for await (let [name, handle] of opfsRoot) {
				log('ls:', { name, handle });
			}
		} catch (err) {
			if (err instanceof Error) {
				error('Initialization error:', err.name, err.message);
			} else {
				error('Initialization error:', err);
			}
		}
	};

	start = (sqlite3: Sqlite3Static) => {
		log('Running SQLite3 version', sqlite3.version.libVersion);
		this.db =
			'opfs' in sqlite3
				? new sqlite3.oo1.OpfsDb('/mydb.sqlite3')
				: new sqlite3.oo1.DB('/mydb.sqlite3', 'ct');
		log(
			'opfs' in sqlite3
				? `OPFS is available, created persisted database at ${this.db.filename}`
				: `OPFS is not available, created transient database ${this.db.filename}`
		);
		// Your SQLite code here.

		this.db.exec(
			`CREATE TABLE IF NOT EXISTS hellos(name TEXT , createdAt TIMESTAMP DATETIME DEFAULT(STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW')))`
		);
	};

	insertName = (name: string) => {
		console.log('insertName', name);
		this.db?.prepare('INSERT INTO hellos(name) VALUES(?)').bind(name).stepFinalize();
	};

	getAllHellos = () => {
		console.log("I'm in getAllHellos", this.db);

		return this.db?.selectObjects('SELECT * FROM hellos order by createdAt desc limit 10') as {
			name: string;
			createdAt: string;
		}[];
	};
}
