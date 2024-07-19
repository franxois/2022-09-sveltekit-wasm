<script lang="ts">
	import { onMount } from "svelte";
	import type { PageData } from "./$types";

	export let data : PageData;

	onMount(() => {
		console.log("+page.svelte mounted");
		console.log(data)

		data.sharedWorker.port.onmessage = (e) => {
			console.log('page received message :', e.data);
			data.sharedWorker.port.postMessage('Hello from page');
		}

	});

</script>

<h1>Test SharedWorker</h1>
<p>Open your console</p>
