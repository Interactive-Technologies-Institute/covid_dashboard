<script lang="ts">
	import type { MapConfig } from '$lib/constants';
	export let config: MapConfig;
	let gradient: string;

	$: gradient = `linear-gradient(to bottom, ${config.stops.map((stop) => stop.color).join(', ')})`;
</script>

{#if config}
	<div
		class="absolute z-10 bottom-5 right-5 bg-white border border-gray-200 rounded-lg shadow w-56 flex flex-col justify-center items-start"
	>
		<div class="rounded-t-lg bg-blue-600 w-full p-5 flex flex-col">
			<span class="text-lg font-medium leading-tight text-white pb-2">{config.label}</span>
			{#if config.description !== ''}
				<span class="text-base font-medium leading-tight text-white">{config.description}</span>
			{/if}
		</div>
		<div class="m-5 flex flex-row justify-start items-stretch space-x-5 h-52">
			<div class="w-16" style={`background: ${gradient};`} />
			<div class="flex flex-col justify-between">
				{#each config.labels as label}
					<span class="text-lg font-medium text-black">{label}</span>
				{/each}
			</div>
		</div>
	</div>
{/if}
