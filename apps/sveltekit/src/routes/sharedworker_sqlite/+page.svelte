<script lang="ts">
	import { onMount } from 'svelte';
	import { invalidateAll, goto } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import * as Comlink from 'comlink';
	import type { HellosRepository } from '../../repositories/HellosRepository';

	let allHellos: { name: string; createdAt: string }[] = [];
	let dbRepository: Comlink.Remote<HellosRepository>;

	onMount(async () => {
		console.log('+page.svelte mounted');

		const myWorker = new SharedWorker(new URL('./my.worker', import.meta.url), { type: 'module' });
		dbRepository = Comlink.wrap<HellosRepository>(myWorker.port);
		await dbRepository.initializeSQLite();

		allHellos = await dbRepository.getAllHellos();
	});

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		const formData = new FormData(event.currentTarget);

		await dbRepository.insertName(formData.get('name') as string);
		allHellos = await dbRepository.getAllHellos();
	}
</script>

<h1>Test SharedWorker</h1>
<p>Store values using SQLite wasm. Data is persisted across page reloads thanks to OPFS</p>

<p>⚠️ this don't work with OPFS because it is not available in SharedWorker</p>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<label for="name">Your name</label>
	<input type="text" name="name" id="name" />
	<button type="submit">Send</button>
</form>

<ul>
	{#each allHellos as hello}
		<li>"{hello.name}" {hello.createdAt}</li>
	{/each}
</ul>
