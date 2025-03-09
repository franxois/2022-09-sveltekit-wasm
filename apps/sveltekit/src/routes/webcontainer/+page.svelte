<script lang="ts">
	import { onMount } from 'svelte';
	import { WebContainer, type FileSystemTree } from '@webcontainer/api';
	import type { PageData } from './$types';
	import { xterm } from '../../actions/xterm';

	export let data: PageData;

	let webContainerInstance: WebContainer;
	let output: string = '';

	const runProcess = async () => {
		webContainerInstance = await WebContainer.boot();
		console.log('WebContainer started');
		await webContainerInstance.mount(data.files);
		console.log('Mounted');

		// const packageJSON = await webcontainerInstance.fs.readFile('package.json', 'utf-8');

		const shellProcess = await webContainerInstance.spawn('pnpm', ['run', 'test']);

		shellProcess.output.pipeTo(
			new WritableStream({
				write: (chunk) => {
					output = chunk;
				}
			})
		);

		const exitCode = await shellProcess.exit;
		console.log({ exitCode });
	};

	onMount(() => {
		// Run without await on purpose so we can return an unmount function
		runProcess();

		return () => {
			webContainerInstance && webContainerInstance.teardown();
		};
	});
</script>

<h1>Test WebContainer</h1>
<p><i>Please wait for the webContainer to start</i></p>
<div use:xterm={output}></div>

<style>
	@import '@xterm/xterm/css/xterm.css';
</style>
