<script lang="ts">
	import { base } from '$app/paths';
	import ColorScale from '$lib/components/ColorScale.svelte';
	import DateSelector from '$lib/components/DateSelector.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import InfoCard from '$lib/components/InfoCard.svelte';
	import LineChart from '$lib/components/LineChart.svelte';
	import LinesChart from '$lib/components/LinesChart.svelte';
	import BorderLayer from '$lib/components/Map/BorderLayer.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import PixelLayer from '$lib/components/Map/PixelLayer.svelte';
	import TradLayer from '$lib/components/Map/TradLayer.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import Toggle from '$lib/components/Toggle.svelte';
	import TypeSelector from '$lib/components/TypeSelector.svelte';
	import SearchField from '$lib/components/SearchField.svelte';
	import { DataType, configs, type ChartData, type MapConfig } from '$lib/constants';
	import PoisLayer from '$lib/components/Map/PoisLayer.svelte';

	export let data;

	const dateToIndex = (date: Date): number => {
		var millis = date.valueOf();
		return (millis - data.minDate.valueOf()) / 86400000;
	};

	const getPixelData = (type: DataType): ([number, number, number] | number)[][] => {
		return data.pixels[type];
	};

	const getTradData = (type: DataType): number[][] => {
		return data.trad[type];
	};

	const getChart2Data = (aces: number | null): ChartData[] | null => {
		if (aces === null) {
			return null;
		}
		return data.chart2.filter((d) => d.fids.includes(aces));
	};

	const getConfig = (type: DataType): MapConfig => {
		return configs[type];
	};

	let date = data.minDate;
	let dateIndex = dateToIndex(date);
	let type = DataType.INCIDENCE;
	let isTrad = data.isTrad;
	let pixelsData = getPixelData(type);
	let tradData = getTradData(type);
	let chartData = data.chart;
	let selectedACES: number | null = null;
	let chart2Data = getChart2Data(selectedACES);

	let distritos = true;
	let concelhos = isTrad;
	let freguesias = false;
	let hospitais = false;
	let escolas = false;
	let casasDeRepouso = false;
	let opacity = 1;

	let hValue: number | null = null;
	let hACES: string | null = null;
	let hConcelho: string | null = null;
	let hConcelhoId: string | null = null;
	let hFreguesia: string | null = null;

	$: dateIndex = dateToIndex(date);
	$: pixelsData = getPixelData(type);
	$: tradData = getTradData(type);
	$: chart2Data = getChart2Data(selectedACES);
</script>

<div class="flex flex-col h-screen w-screen">
	<div class="grow relative">
		<Map>
			{#if isTrad}
				<TradLayer
					data={tradData[dateIndex]}
					stops={getConfig(type).stops}
					{opacity}
					bind:hoveredValue={hValue}
				/>
			{:else}
				<PixelLayer
					data={pixelsData[dateIndex]}
					stops={getConfig(type).stops}
					{opacity}
					bind:hoveredValue={hValue}
				/>
			{/if}
			<BorderLayer
				id="freguesias"
				url={base + '/data/freguesias.json'}
				visiblity={freguesias}
				bind:hoveredLabel={hFreguesia}
			/>
			<BorderLayer
				id="concelhos"
				url={base + '/data/concelhos.json'}
				visiblity={concelhos}
				bind:hoveredLabel={hConcelho}
				bind:hoveredId={hConcelhoId}
			/>
			<BorderLayer
				id="aces"
				url={base + '/data/aces.json'}
				visiblity={distritos}
				selectable={true}
				bind:selectedId={selectedACES}
				bind:hoveredLabel={hACES}
			/>
			<PoisLayer
			    id="hospitais"
				url={base + '/data/hospitals.json'}
				visibility={hospitais}
				icon="hospital"
			/>
			<PoisLayer
			    id="escolas"
				url={base + '/data/schools.json'}
				visibility={escolas}
				icon="college"
			/>
			<PoisLayer
			    id="casasDeRepouso"
				url={base + '/data/nursing-homes.json'}
				visibility={casasDeRepouso}
				icon="lodging"
			/>

		
			<SearchField />
		</Map>
		<div class="absolute z-10 top-5 left-5 flex flex-col space-y-4 w-96">
			{#if !isTrad}
				<TypeSelector bind:value={type} />
			{/if}
			<Slider bind:value={opacity} />
			<div class="flex flex-row space-x-4">
				<div class="flex flex-col space-y-1">
					<Toggle label="ACES" bind:value={distritos} />
					<Toggle label="Concelhos" bind:value={concelhos} />
					<Toggle label="Freguesias" bind:value={freguesias} />
				</div>
				<div class="flex flex-col space-y-1">
					<Toggle label="Saúde" bind:value={hospitais} />
					<Toggle label="Ensino" bind:value={escolas} />
					<Toggle label="Social" bind:value={casasDeRepouso} />
				</div>
			</div>
			<LineChart minDate={data.minDate} maxDate={data.maxDate} {date} data={chartData} />
			<LinesChart minDate={data.minDate} maxDate={data.maxDate} {date} data={chart2Data} />
		</div>
		<div class="absolute z-10 bottom-2 left-0 right-0 mx-auto w-[42rem]">
			<DateSelector minDate={data.minDate} maxDate={data.maxDate} bind:date />
		</div>
		<div class="absolute z-10 bottom-5 right-5">
			<ColorScale config={getConfig(type)} />
		</div>
		<div class="absolute z-10 top-5 right-5">
			<InfoCard
				aces={hACES}
				concelho={hConcelho}
				concelhoId={hConcelhoId}
				freguesia={hFreguesia}
				value={hValue}
				label={getConfig(type).label}
				description={getConfig(type).description}
				url={base + '/data/casos-covid.json'}
				{date}
			/>
		</div>
	</div>
	<Footer />
</div>
