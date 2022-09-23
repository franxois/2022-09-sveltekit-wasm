<script lang="ts">
	import type { PageData } from './$types';
	import init, { get_message } from 'wasm';

	export let data: PageData;

	let wasmMessage: String;

	init().then(() => {
		wasmMessage = get_message();
	});
</script>

<h1>Welcome to SvelteKit</h1>
<ul>
	<li>{data.message} from {data.source}</li>
	<li>{wasmMessage} from wasm</li>
</ul>
