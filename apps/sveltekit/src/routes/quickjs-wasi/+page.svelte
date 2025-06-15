<script lang="ts">
	import { xterm } from '../../actions/xterm';
	import {
		WASI,
		File,
		OpenFile,
		PreopenDirectory,
		Inode,
		ConsoleStdout
	} from '@bjorn3/browser_wasi_shim';

	let output: string = '';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const runProcess = async () => {
		let args = ['bin', 'index.js'];
		let env = ['FOO=bar'];

		const rootPath = new PreopenDirectory(
			'.',
			new Map<string, Inode>(
				data.files.map(([fileName, fileContent]): readonly [string, Inode] => [
					fileName,
					new File(new TextEncoder().encode(fileContent))
				])
			)
		);

		let fds = [
			new OpenFile(new File([])), // stdin
			ConsoleStdout.lineBuffered((msg) => (output += `[WASI stdout] ${msg}\n\r`)),
			ConsoleStdout.lineBuffered((msg) => (output += `[WASI stderr] ${msg}\n\r`)),
			rootPath
		];
		let wasi = new WASI(args, env, fds);

		let wasm = await WebAssembly.compileStreaming(fetch('qjs-wasi-0.10.1.wasm'));
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
	};

	onMount(() => {
		console.log('+page.svelte mounted');

		runProcess();
	});
</script>

<h1>Test QuickJs-ng wasi</h1>

<div use:xterm={output}></div>

<style>
	@import '@xterm/xterm/css/xterm.css';
</style>
