<script lang="ts">
	import { onMount } from "svelte";
	import type { PageData } from "./$types";
	import { invalidateAll, goto } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import * as Comlink from 'comlink';
	import type { HellosRepository } from "./my.worker";

	let allHellos : {name:string,createdAt:string}[] = [];
	let dbRepository: Comlink.Remote<HellosRepository>

	onMount(async () => {
		console.log("+page.svelte mounted");

		 const MyWorker = Comlink.wrap<typeof HellosRepository>( new Worker(new URL('./my.worker', import.meta.url), { type: 'module' }) );

		 dbRepository = await new MyWorker();
		 await dbRepository.initializeSQLite();


		allHellos = await dbRepository.getAllHellos();
	});

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement}) {
		const formData = new FormData(event.currentTarget);

		await dbRepository.insertName(formData.get('name') as string);
		allHellos = await dbRepository.getAllHellos();

		// data.worker.postMessage({ name : formData.get('name')});

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
		<li>"{hello.name}" {hello.createdAt}</li>
	{/each}
</ul>
