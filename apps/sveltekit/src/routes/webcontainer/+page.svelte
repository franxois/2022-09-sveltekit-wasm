<script lang="ts">
	import { onMount } from 'svelte';
	import { WebContainer } from '@webcontainer/api';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(async () => {
		const webcontainerInstance = await WebContainer.boot();

		console.log(webcontainerInstance);
		await webcontainerInstance.mount(data.files);

		// const packageJSON = await webcontainerInstance.fs.readFile('package.json', 'utf-8');

		const res = await webcontainerInstance.spawn('pnpm', ['run', 'test']);
		const reader = res.output.getReader();

		while (true) {
			const { done, value } = await reader.read();

			console.log(value);
			if (done) {
				break;
			}
		}
	});
</script>

<h1>Test WebContainer</h1>
<p>Open your console</p>
