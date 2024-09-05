<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { quickJS } from '@sebastianwessel/quickjs';

	export let data: PageData;

	async function testQuickJS() {
		const { createRuntime } = await quickJS('https://esm.sh/@jitl/quickjs-wasmfile-release-sync');

		const { evalCode } = await createRuntime({
			allowFetch: true, // inject fetch and allow the code to fetch data
			allowFs: true, // mount a virtual file system and provide node:fs module
			env: {
				MY_ENV_VAR: 'env var value'
			}
		});

		console.log(await evalCode('export default 1+1'));
	}

	onMount(() => {
		testQuickJS();
	});
</script>

<h1>Test QuickJS</h1>
