<script lang="ts">
	import type { PageData } from './$types';
	import init, { get_message } from 'wasm';

	export let data: PageData;

	let wasmMessage: string;

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

<nav>
	<a href="/">home</a>
	<a href="/wasi">wasi</a>
	<a href="/webcontainer">webcontainer</a>
	<a href="/webworker">webworker sqlite</a>
	<a href="/sharedworker_count">simple sharedworker</a>
	<a href="/sharedworker_sqlite">sharedworker sqlite</a>
</nav>

<ul>
	<li>{data.message} from {data.source}</li>
	<li>{wasmMessage} from wasm</li>
	{#if backendMessage !== undefined}
		<li>{backendMessage}</li>
	{/if}
</ul>
