<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from '../sharedworker/$types';
	import * as Comlink from 'comlink';
	import type { Stepper } from './my.worker';
	import { page } from '$app/stores';

	let count: number;
	let stepper: Comlink.Remote<Stepper>;

	onMount(async () => {
		const worker = new SharedWorker(new URL('./my.worker', import.meta.url), { type: 'module' });
		stepper = Comlink.wrap<Stepper>(worker.port);

		count = await stepper.counter;
		worker.port.onmessage = async (event) => {
			count = await stepper.counter;
		};
	});
</script>

<h1>Test SharedWorker</h1>
<p>
	Open <a target="_blank" href={$page.route.id}>a new tab</a> in a new window and click the button
</p>

<p>count : {count}</p>

<button
	on:click={async () => {
		await stepper.inc();
	}}>Add 1</button
>
