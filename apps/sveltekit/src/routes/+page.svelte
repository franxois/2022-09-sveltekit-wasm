<script lang="ts">
	import type { PageData } from './$types';
	import init, { get_message } from 'wasm';
	import { helloWorld } from 'wasi_component';

	export let data: PageData;

	let wasmMessage: string;
	let wasiComponentMessage: string = helloWorld();

	let backendMessage: string;

	init().then(() => {
		wasmMessage = get_message();
	});

	if (navigator.serviceWorker.controller?.state === 'activated')
		console.log('Service worker installed');
	else {
		console.log('Service worker not installed, please reload');
		setTimeout(() => {
			location.reload();
		}, 500);
	}

	fetch('/api/hello')
		.then((response) => response.json())
		.then((data) => {
			backendMessage = `"${data.message}" when calling /api/hello`;
		});
</script>

<h1>Welcome to SvelteKit</h1>

<ul>
	<li>"{data.message}" from {data.source}</li>
	<li>"{wasmMessage}" from wasm</li>
	<li>"{wasiComponentMessage}" from WASI component</li>
	{#if backendMessage !== undefined}
		<li>{backendMessage}</li>
	{/if}
</ul>
