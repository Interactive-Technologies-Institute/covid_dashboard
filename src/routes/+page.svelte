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
	import SearchField from '$lib/components/SearchField.svelte';
	import { DataType, configs, type ChartData, type MapConfig } from '$lib/constants';
	import Sidebar from '$lib/components/Sidebar.svelte';
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
	let hFreguesia: string | null = null;

	$: dateIndex = dateToIndex(date);
	$: pixelsData = getPixelData(type);
	$: tradData = getTradData(type);
	$: chart2Data = getChart2Data(selectedACES);
</script>

<div class="flex flex-col min-h-screen w-screen">
	<div class="relative flex-grow h-screen flex">
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
		<Sidebar
			bind:isTrad={isTrad}
			bind:opacity={opacity}
			bind:distritos={distritos}
			bind:concelhos={concelhos}
			bind:freguesias={freguesias}
			bind:type={type}
			bind:data={data}
			chartData={chartData}
			chart2Data={chart2Data}
		/>
		<ColorScale config={getConfig(type)} />
		<InfoCard
			aces={hACES}
			concelho={hConcelho}
			freguesia={hFreguesia}
			value={hValue}
			label={getConfig(type).label}
			description={getConfig(type).description}
		/>
		<DateSelector minDate={data.minDate} maxDate={data.maxDate} bind:date />
	</div>
	<Footer />
</div>
