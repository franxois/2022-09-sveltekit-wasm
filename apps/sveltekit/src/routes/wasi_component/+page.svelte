<script lang="ts">
	import { onMount } from 'svelte';
	import { helloWorld } from 'wasi_component';

	onMount(() => {
		console.log(helloWorld());
	});
</script>

<h1>Test WASI component</h1>
<p>Open your console</p>
