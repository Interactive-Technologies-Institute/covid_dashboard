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

	const isLargeScreen = window.innerWidth > 1000;

	let isOpen= isLargeScreen;
</script>

<div class="content absolute top-0 left-0 z-30 w-1/4 min-h-screen">
	<button class="menu-button absolute top-5 left-5 z-20"
					on:click={() => (isOpen = !isOpen)}
					class:open={isOpen}
	>
		{#if isOpen}
			<!-- Cross icon when menu is open -->
			<img src="{base}/icons/close.svg" alt="CLOSE" class="h-8" />
		{:else}
			<!-- Menu icon when menu is closed -->
			<img src="{base}/icons/menu.svg" alt="MENU" class="h-8" />
		{/if}
	</button>

	<div class="sidebar absolute z-10 top-0 left-0 pt-24 pl-5 bg-gray-600 min-h-screen self-center" style="width: 420px" class:is-open={isOpen}>
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

    .menu-button {
        background-color: #ffffff;
        border: 2px solid #2563eb; /* Blue border */
        border-radius: 100%; /* Rounded corners */
        padding: 10px; /* Add padding around the icon */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Optional: Add a shadow for depth */
        cursor: pointer; /* Change cursor to pointer on hover */
        transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Add hover effect */
    }

    .menu-button:hover {
        background-color: #e0e0e0; /* Slightly darker background on hover */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Enhance shadow on hover */
    }

    .menu-button img {
        display: block;
        margin: 0 auto; /* Center the image inside the button */
    }

		@media (max-width: 640px) {

    }
</style>



