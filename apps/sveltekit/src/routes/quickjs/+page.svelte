<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { type SandboxOptions, loadAsyncQuickJs } from '@sebastianwessel/quickjs';

	export let data: PageData;

	async function testQuickJS() {
		const { runSandboxed } = await loadAsyncQuickJs(
			'https://esm.sh/@jitl/quickjs-wasmfile-release-sync'
		);

		const options: SandboxOptions = {
			allowFetch: true, // inject fetch and allow the code to fetch data
			allowFs: true, // mount a virtual file system and provide node:fs module
			env: {
				MY_ENV_VAR: 'env var value'
			}
		};

		const code = `export default 1+1`;

		const result = await runSandboxed(async ({ evalCode }) => {
			const result = await evalCode(code);

			console.log('result', result);

			return result;
		}, options);
	}

	onMount(() => {
		testQuickJS();
	});
</script>

<h1>Test QuickJS</h1>
