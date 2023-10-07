import {
	WASI,
	File,
	OpenFile,
	PreopenDirectory,
	SyncOPFSFile,
	OpenDirectory,
	Directory
} from '@bjorn3/browser_wasi_shim';

// Run only on client side
export const ssr = false;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	console.log('Hello from load function');

	let args = ['bin', 'arg1', 'arg2'];
	let env = ['FOO=bar'];

	const stdout = new File([]);
	const stderr = new File([]);

	// const opfs = await navigator.storage.getDirectory();
	// const subDir = await opfs.getDirectoryHandle('helloworld', { create: true });
	// const file = await subDir.getFileHandle('helloworld.txt', { create: true });
	// const handle = await file.createSyncAccessHandle(); // only usable in web workers

	const rootPath = new PreopenDirectory('.', {
		// helloworld: new Directory({ 'helloworld.txt': new SyncOPFSFile(handle) })
	});

	let fds = [
		new OpenFile(new File([])), // stdin
		new OpenFile(stdout), // stdout
		new OpenFile(stderr), // stderr
		rootPath
	];
	let wasi = new WASI(args, env, fds);

	let wasm = await WebAssembly.compileStreaming(fetch('wasi_hello_world.wasm'));
	let inst = await WebAssembly.instantiate(wasm, {
		wasi_snapshot_preview1: wasi.wasiImport
	});

	try {
		wasi.start(inst);

		console.log('stdout : ', new TextDecoder().decode(stdout.data));
		console.log('stderr : ', new TextDecoder().decode(stderr.data));

		console.log(rootPath.dir.contents);

		// console.log(await file.getFile());
	} catch (err) {
		console.error(err);
	}
}
