<script lang="ts">
	import { base } from '$app/paths';
	import TypeSelector from '$lib/components/TypeSelector.svelte';
	import Toggle from '$lib/components/Toggle.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import LineChart from '$lib/components/LineChart.svelte';
	import LinesChart from '$lib/components/LinesChart.svelte';
	import { type ChartData, DataType } from '$lib/constants';

	export let data;

	export let isTrad: boolean;
	export let opacity: number = 1;
	export let distritos: boolean;
	export let concelhos: boolean;
	export let freguesias: boolean;
	export let type: DataType;

	export let chartData: number[];
	export let chart2Data: ChartData[] | null;
	let date = data.minDate;

	let isOpen = false;
</script>


<div class="content absolute top-0 left-0 z-20 w-1/4 min-h-screen">
	<button class="absolute top-5 left-5 z-20" on:click={() => (isOpen = !isOpen)}>
		<img src="{base}/icons/menu.svg" alt="MENU" class="h-8" />
	</button>
	<div class="sidebar absolute z-10 top-0 left-0 pt-20 pl-5 bg-gray-600 min-h-screen self-center" style="width: 420px" class:is-open={isOpen}>
		<div class="w-96 flex flex-col space-y-8 center">
			{#if !isTrad}
				<TypeSelector bind:value={type} />
			{/if}
			<Slider bind:value={opacity} />
			<div class="flex flex-col space-y-1">
				<Toggle label="ACES" bind:value={distritos} />
				<Toggle label="Concelhos" bind:value={concelhos} />
				<Toggle label="Freguesias" bind:value={freguesias} />
			</div>
			<LineChart minDate={data.minDate} maxDate={data.maxDate} {date} data={chartData} />
			<LinesChart minDate={data.minDate} maxDate={data.maxDate} {date} data={chart2Data} />
		</div>
	</div>
</div>

<style>
    .sidebar {
        transition: transform 0.6s ease-in-out;
        transform: translateX(-1000px);
    }
    .sidebar.is-open {
        transform: translateX(0);
		}
</style>



