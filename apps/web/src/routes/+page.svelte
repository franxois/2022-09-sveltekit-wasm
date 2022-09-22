<script lang="ts">
	import type { PageData } from './$types';
	import init from "wasm/wasm_bg.wasm?init"

	export let data: PageData;

	let addResult : number

	init({}).then(( instance )=>{
		addResult = instance.exports.add(1,2)
	})

</script>

<h1>Welcome to SvelteKit</h1>
<ul>
	<li>{data.message} from {data.source}</li>
	<li>{addResult} from wasm.add(1,2)</li>
</ul>
