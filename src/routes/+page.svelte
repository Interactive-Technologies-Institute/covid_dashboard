<script lang="ts">
	import { base } from '$app/paths';
	import ColorScale from '$lib/components/ColorScale.svelte';
	import DateSelector from '$lib/components/DateSelector.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import InfoCard from '$lib/components/InfoCard.svelte';
	import BorderLayer from '$lib/components/Map/BorderLayer.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import PixelLayer from '$lib/components/Map/PixelLayer.svelte';
	import TradLayer from '$lib/components/Map/TradLayer.svelte';
	import SearchField from '$lib/components/SearchField.svelte';
	import { DataType, configs, configsColorBlind, type ChartData, type MapConfig } from '$lib/constants';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import ConcelhoBorderLayer from '$lib/components/Map/ConcelhoBorderLayer.svelte';
	import HelpButton from '$lib/components/HelpButton.svelte';
	import PoisLayer from '$lib/components/Map/PoisLayer.svelte';

	type PixelJson = ([number, number, number] | number)[][];

	export let data;


	const dateToIndex = (date: Date): number => {
		const days = date.valueOf() / 86400000;

		const initialDay =  data.minDate.valueOf() / 86400000;

		return days - initialDay;
	};


	const dateToJsonNum = (date: Date): number => {
		return  Math.floor(dateToIndex(date) / 10);
	};

	const dateToIndexInJson = (date: Date): number => {
		return dateToIndex(date) % 10;
	};

	const getChart2Data = (aces: number | null): ChartData[] | null => {
		if (aces === null) {
			return null;
		}
		return data.chart2.filter((d) => d.fids.includes(aces));
	};

	const getConfig = (type: DataType, accessibility: boolean): MapConfig => {
		if (accessibility) {
			return configsColorBlind[type];
		}
		else {
			return configs[type];
		}
	};

	let date = data.minDate;
	let dateIndex = dateToIndex(date);
	let type = DataType.INCIDENCE;
	let isTrad = data.isTrad;
	let tradData: number[][] | null = null;
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

	let accessibility = false;

	let currentConfig = getConfig(type, accessibility);
	$: currentConfig = getConfig(type, accessibility);

	let hValue: number | null = null;
	let hACES: string | null = null;
	let hConcelho: string | null = null;
	let hConcelhoId: string | null = null;
	let hFreguesia: string | null = null;

	let hoveredConcelho: number | null = null;
	
	let segmentedInc: PixelJson[] = new Array(data.numJsons).fill(null);
	let segmentedIqd: PixelJson[] = new Array(data.numJsons).fill(null);
	let segmentedProb: PixelJson[] = new Array(data.numJsons).fill(null);


	let currentJson = dateToJsonNum(date);
	let indexInCurrentJson = dateToIndexInJson(date);


	let currentInc: PixelJson | null = null;
	let currentIqd: PixelJson | null = null;
	let currentProb:  PixelJson | null = null;
	let currentPixels: PixelJson | null = null;

	let pixelsToday:  ([number, number, number] | number)[] | null = null;

	$: dateIndex = dateToIndex(date);
	$: chart2Data = getChart2Data(selectedACES);

	$: currentJson = dateToJsonNum(date);
	$: indexInCurrentJson = dateToIndexInJson(date);

	$: currentInc = segmentedInc[currentJson];
	$: currentIqd = segmentedIqd[currentJson];
	$: currentProb = segmentedProb[currentJson];

	$: {
		if (currentPixels && indexInCurrentJson < currentPixels.length) {
			pixelsToday = currentPixels ? currentPixels[indexInCurrentJson] : null;
		}
		else {
			pixelsToday = null;
		}
	}


	$: {
		if (type == DataType.INCIDENCE) {
			currentPixels = currentInc;
		}
		else if (type == DataType.UNCERTAINTY) {
			currentPixels = currentIqd;
		}
		else {
			currentPixels = currentProb;
		}
	}

    $: {
		for (let i = 0; i < data.numJsons; i++) {
			data.segmentedIncPromise[i].then((x) => {
				segmentedInc[i] = x;
			});
			data.segmentedIqdPromise[i].then((x) => {
				segmentedIqd[i] = x;
			});
			data.segmentedProbPromise[i].then((x) => {
				segmentedProb[i] = x;
			});
			
		}
	}
	$: {
		data.trad[DataType.INCIDENCE].then((x) => {
			tradData = x;
		});
	}
</script>

<div class="flex flex-col min-h-screen w-screen">
	<div class="relative grow h-screen">
		<Map>
			{#if isTrad}
				{#if tradData}
					<TradLayer
						data={tradData[dateIndex]}
						stops={currentConfig.stops}
						{opacity}
						bind:hoveredValue={hValue}
					/>
				{/if}
			{:else}
				{#if pixelsToday}
					<PixelLayer
						data={pixelsToday}
						stops={currentConfig.stops}
						{opacity}
						bind:hoveredValue={hValue}
					/>
				{/if}
			{/if}
			<BorderLayer
				id="freguesias"
				url={base + '/data/freguesias.json'}
				visiblity={freguesias}
				lineWidth={1}
				normalColor='#d3d3d3'
				selectedColor=black
				bind:hoveredLabel={hFreguesia}
			/>
			<BorderLayer
				id="concelhos"
				url={base + '/data/concelhos.json'}
				visiblity={concelhos}
				selectable={true}
				lineWidth={2}
				normalColor=gray
				selectedColor=gray
				bind:hoveredLabel={hConcelho}
				bind:hoveredId={hConcelhoId}
			/>
			<BorderLayer
				id="aces"
				url={base + '/data/aces.json'}
				visiblity={distritos}
				selectable={true}
				lineWidth={2}
				normalColor=black
				selectedColor=black
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


			<ConcelhoBorderLayer
				id="hovered-concelho"
				url={base + '/data/concelhos.json'}
				{hoveredConcelho}
			/>
			<SearchField />
		</Map>
		<Sidebar
			bind:isTrad={isTrad}
			bind:opacity={opacity}
			bind:distritos={distritos}
			bind:concelhos={concelhos}
			bind:freguesias={freguesias}
			bind:hospitais={hospitais}
			bind:escolas={escolas}
			bind:casasDeRepouso={casasDeRepouso}
			bind:type={type}
			bind:data={data}
			bind:hoveredConcelho={hoveredConcelho}
			bind:accessibility={accessibility}
			chartData={chartData}
			chart2Data={chart2Data}
		/>
		<HelpButton/>
		<ColorScale config={currentConfig} />
		<InfoCard
			aces={hACES}
			concelho={hConcelho}
			concelhoId={hConcelhoId}
			freguesia={hFreguesia}
			value={hValue}
			type={type}
			label={currentConfig.label}
			description={currentConfig.description}
			url={base + '/data/casos-covid.json'}
			{date}
		/>
		<DateSelector minDate={data.minDate} maxDate={data.maxDate} bind:date />
	</div>
	<Footer />
</div>
