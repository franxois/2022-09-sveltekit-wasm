<script lang="ts">
	import { onMount } from 'svelte';
	import { WebContainer } from '@webcontainer/api';
	import type { PageData } from './$types';
	import { xterm } from './xterm';

	export let data: PageData;

	let output: string = '';

	onMount(async () => {
		const webcontainerInstance = await WebContainer.boot();

		console.log(webcontainerInstance);
		await webcontainerInstance.mount(data.files);

		// const packageJSON = await webcontainerInstance.fs.readFile('package.json', 'utf-8');

		const res = await webcontainerInstance.spawn('pnpm', ['run', 'test']);
		const reader = res.output.getReader();

		while (true) {
			const { done, value } = await reader.read();

			console.log(value);

			output += value;

			console.log(done);
			console.log(webcontainerInstance);

			if (done) {
				// We enter never here. TODO : teardown on route change
				webcontainerInstance.teardown();
				console.log(webcontainerInstance);
				break;
			}
		}
	});
</script>

<h1>Test WebContainer</h1>
<div use:xterm={output} />

<style>
	@import '@xterm/xterm/css/xterm.css';
</style>
