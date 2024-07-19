/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { build, files, prerendered, version } from '$service-worker';
import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

const log = console.log;
const error = console.error;

const start = (sqlite3) => {
	log('Running SQLite3 version', sqlite3.version.libVersion);

	console.log('start:', { sqlite3 });

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
		error('Initialization error:', err.name, err.message);
	}
};

initializeSQLite();

const respondWith = (event: FetchEvent, data: unknown) => {
	event.respondWith(
		new Response(JSON.stringify(data), {
			headers: { 'content-type': 'text/json' }
		})
	);
};

console.log('serviceworker:', 'service worker loaded');
console.log('serviceworker:', { build, files, prerendered, version });

self.addEventListener('install', (event) => {
	// Make the script refresh after reload, not only after closing all tabs
	(self as unknown as ServiceWorkerGlobalScope).skipWaiting();
});

self.addEventListener('fetch', (event) => {
	if (event instanceof FetchEvent) {
		if (event.request.url.endsWith('/api/hello')) {
			const response = {
				message: `Service Worker ${version} says hello !`
			};

			respondWith(event, response);
		}
	}
});
