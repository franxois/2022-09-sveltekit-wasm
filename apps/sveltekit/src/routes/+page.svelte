<script lang="ts">
	import type { PageData } from './$types';
	import init, { get_message } from 'wasm';

	export let data: PageData;

	let wasmMessage: string;

	let backendMessage: string;

	init().then(() => {
		wasmMessage = get_message();
	});

	fetch('/backend/hello')
		.then((response) => response.json())
		.then((data) => {
			backendMessage = data.message;
		});
</script>

<h1>Welcome to SvelteKit</h1>
<ul>
	<li>{data.message} from {data.source}</li>
	<li>{wasmMessage} from wasm</li>
	{#if backendMessage !== undefined}
		<li>{backendMessage}</li>
	{/if}
</ul>
