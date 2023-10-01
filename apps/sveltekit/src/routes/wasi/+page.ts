import { WASI, File, OpenFile, PreopenDirectory, Fd, Directory } from '@bjorn3/browser_wasi_shim';
import type { Ciovec } from '@bjorn3/browser_wasi_shim/typings/wasi_defs.js';

// Run only on client side
export const ssr = false;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	console.log('Hello from load function');

	let args = ['bin', 'arg1', 'arg2'];
	let env = ['FOO=bar'];

	const stdout = new File([]);
	const stderr = new File([]);

	const rootPath = new PreopenDirectory('.', {});

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
	} catch (err) {
		console.error(err);
	}
}
