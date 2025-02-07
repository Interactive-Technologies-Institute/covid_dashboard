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
	import { DataType, configs, type ChartData, type MapConfig } from '$lib/constants';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import ConcelhoBorderLayer from '$lib/components/Map/ConcelhoBorderLayer.svelte';
	import HelpButton from '$lib/components/HelpButton.svelte';
	import PoisLayer from '$lib/components/Map/PoisLayer.svelte';
	import { onMount } from 'svelte';

	export let data;

	const dateToIndex = (date: Date): number => {
		var millis = date.valueOf();
		return (millis - data.minDate.valueOf()) / 86400000;
	};

	const getPixelData = (type: DataType): Promise<([number, number, number] | number)[][]> => {
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
	let pixelsData: (number | [number, number, number])[][] | null = null;
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

	let hoveredConcelho: number | null = null;

	$: dateIndex = dateToIndex(date);
	$: tradData = getTradData(type);
	$: chart2Data = getChart2Data(selectedACES);

    $: {
		getPixelData(type).then((d) => {
			pixelsData = d;
		});
	}

</script>

<div class="flex flex-col min-h-screen w-screen">
	<div class="relative grow h-screen">
		<Map>
			{#if isTrad}
				<TradLayer
					data={tradData[dateIndex]}
					stops={getConfig(type).stops}
					{opacity}
					bind:hoveredValue={hValue}
				/>
			{:else}
				{#if pixelsData}
					<PixelLayer
						data={pixelsData[dateIndex]}
						stops={getConfig(type).stops}
						{opacity}
						bind:hoveredValue={hValue}
					/>
				{/if}
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
				selectable={true}
				lineWidth={2.5}
				bind:hoveredLabel={hConcelho}
				bind:hoveredId={hConcelhoId}
			/>
			<BorderLayer
				id="aces"
				url={base + '/data/aces.json'}
				visiblity={distritos}
				selectable={true}
				lineWidth={4}
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
			chartData={chartData}
			chart2Data={chart2Data}
		/>
		<HelpButton/>
		<ColorScale config={getConfig(type)} />
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
		<DateSelector minDate={data.minDate} maxDate={data.maxDate} bind:date />
	</div>
	<Footer />
</div>
