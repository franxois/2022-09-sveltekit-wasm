import {
	WASI,
	File,
	OpenFile,
	PreopenDirectory,
	SyncOPFSFile,
	OpenDirectory,
	Directory,
	Inode,
	ConsoleStdout
} from '@bjorn3/browser_wasi_shim';

// Run only on client side
export const ssr = false;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	console.log('Hello from load function');

	let args = ['bin', 'index.js'];
	let env = ['FOO=bar'];

	// const opfs = await navigator.storage.getDirectory();
	// const subDir = await opfs.getDirectoryHandle('helloworld', { create: true });
	// const file = await subDir.getFileHandle('helloworld.txt', { create: true });
	// const handle = await file.createSyncAccessHandle(); // only usable in web workers

	const rootPath = new PreopenDirectory(
		'.',
		new Map<string, Inode>([
			['helloworld', new Directory(new Map<string, Inode>([]))],
			[
				'greetings.js',
				new File(new TextEncoder().encode(`export const greeting = 'Hello from QuickJS-ng!' ;`))
			],
			[
				'index.js',
				new File(
					new TextEncoder().encode(
						`import { greeting } from './greetings.js'; console.log(greeting);`
					)
				)
			]
		])
	);

	let fds = [
		new OpenFile(new File([])), // stdin
		ConsoleStdout.lineBuffered((msg) => console.log(`[WASI stdout] ${msg}`)),
		ConsoleStdout.lineBuffered((msg) => console.warn(`[WASI stderr] ${msg}`)),
		rootPath
	];
	let wasi = new WASI(args, env, fds);

	let wasm = await WebAssembly.compileStreaming(fetch('qjs-wasi.wasm'));
	let inst = await WebAssembly.instantiate(wasm, {
		wasi_snapshot_preview1: wasi.wasiImport
	});

	try {
		wasi.start(inst as { exports: { memory: WebAssembly.Memory; _start: () => unknown } });

		console.log(rootPath.dir.contents);

		// console.log(await file.getFile());
	} catch (err) {
		console.error(err);
	}
}
