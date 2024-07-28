<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<nav>
	{#each data.sections as section}
		<a href={section.slug}>{section.title}</a>&nbsp;
	{/each}
</nav>

<slot></slot>
