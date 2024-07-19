<script lang="ts">
	import { onMount } from "svelte";
	import type { PageData } from "./$types";
	import { invalidateAll, goto } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';


	export let data : PageData;

	let allHellos : {name:string,createAt:string}[] = [];

	onMount(() => {
		console.log("+page.svelte mounted");

		console.log(data);

		data.worker.onmessage = async (e) => {
			console.log('page received message :', e.data);
			allHellos = e.data.allHellos;
		}
	});

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement}) {
		const formData = new FormData(event.currentTarget);

		data.worker.postMessage({ name : formData.get('name')});

		// if (result.type === 'success') {
		// 	// rerun all `load` functions, following the successful update
		// 	await invalidateAll();
		// }


	}

</script>

<h1>Test WebWorker</h1>
<p>Store values using SQLite wasm. Data is persisted across page reloads thanks to OPFS</p>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<label for="name">Your name</label>
	<input type="text" name="name" id="name"/>
	<button type="submit">Send</button>
</form>

<ul>
	{#each allHellos as hello}
		<li>"{hello.name}" {hello.createAt}</li>
	{/each}
</ul>
