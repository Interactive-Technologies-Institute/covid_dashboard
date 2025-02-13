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
	export let opacity = 1;
	export let distritos: boolean;
	export let concelhos: boolean;
	export let freguesias: boolean;
	export let hospitais: boolean;
	export let escolas: boolean;
	export let casasDeRepouso: boolean;
	export let type: DataType;

	export let accessibility: boolean;


	export let chartData: number[];
	export let chart2Data: ChartData[] | null;
	let date = data.minDate;

	export let hoveredConcelho: number | null;

	const isLargeScreen = window.innerWidth > 1340;

	let isOpen= isLargeScreen;

</script>

<style>
    .sidebar {
        transition: transform 0.6s ease-in-out;
        transform: translateX(-1000px);
    }
    .sidebar.is-open {
        transform: translateX(0);
    }

    .content.sidebar-open{
        z-index: 30;
    }

    .content{
        z-index: -10;
    }

    .menu-button {
        background-color: #ffffff;
        border: 2px solid #2563eb;
        border-radius: 100%;
        padding: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }

    .menu-button:hover {
        background-color: #e0e0e0;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    .menu-button img {
        display: block;
        margin: 0 auto; /* Center the image inside the button */
        height: 1rem;
    }

    @media (max-height: 900px) {
			.sidebar {
          overflow-y: scroll;
      }
    }
		@media (max-width: 420px) {
				.sidebar-open div {
						width: 350px;
				}
				.sidebar div {
						width: 320px;
				}
    }
</style>

{#if isOpen}
	<div class="sidebar-open content absolute top-0 left-0 z-30 w-1/4 h-screen">
		<div class="sidebar absolute z-10 top-0 left-0 pt-20 w-[420px] bg-gray-600 h-screen self-center" class:is-open={isOpen}>
			<button class="menu-button absolute top-[10px] left-[10px] z-20"
							on:click={() => (isOpen = !isOpen)}
							class:open={isOpen}>
				<img src="{base}/icons/menu.svg" alt="CLOSE" />
			</button>
			<div class="sidebar-content w-96 flex flex-col space-y-4 center mx-auto">
				{#if !isTrad}
					<TypeSelector bind:value={type} />
				{/if}
				<Slider bind:value={opacity} />
				<div class=" flex items-center justify-center">
					<Toggle label="Acessibilidade" bind:value={accessibility} />
				</div>
				<div class="flex flex-row justify-start space-x-24">
					<div class="flex flex-col space-y-1 pl-4">
						<Toggle label="ACES" bind:value={distritos} />
						<Toggle label="Concelhos" bind:value={concelhos} />
						<Toggle label="Freguesias" bind:value={freguesias} />
					</div>
					<div class="flex flex-col space-y-1">
						<Toggle label="Saúde" bind:value={hospitais} />
						<Toggle label="Ensino" bind:value={escolas} />
						<Toggle label="Social" bind:value={casasDeRepouso} />
					</div>
					<div class="flex flex-col space-y-1">
						
					</div>
				</div>
				<LineChart minDate={data.minDate} maxDate={data.maxDate} {date} data={chartData} />
				<LinesChart
					minDate={data.minDate}
					maxDate={data.maxDate}
					{date}
					data={chart2Data}
					bind:hoveredConcelho={hoveredConcelho} />
			</div>
		</div>
	</div>
{:else}
	<div class="content absolute top-0 left-0 z-30 w-1/4 h-screen" class:sidebar-open={isOpen}>
		<div class="sidebar absolute z-10 top-0 left-0 pt-20 bg-gray-600 h-screen self-center" style="width: 420px" class:is-open={isOpen}>
			<div class="w-96 flex flex-col space-y-8 center mx-auto">
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
	<button class="menu-button absolute top-[10px] left-[10px] z-20"
					on:click={() => (isOpen = !isOpen)}
					class:open={isOpen}
	>
			<img src="{base}/icons/menu.svg" alt="MENU" />
	</button>
{/if}





