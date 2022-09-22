<script lang="ts">
	import type { PageData } from './$types';
	import * as wasmModule from 'wasm/wasm_bg.wasm';

	export let data: PageData;

	let addResult: number = wasmModule.add(1, 2);
</script>

<h1>Welcome to SvelteKit</h1>
<ul>
	<li>{data.message} from {data.source}</li>
	<li>{addResult} from wasm.add(1,2)</li>
</ul>
