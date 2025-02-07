<script lang="ts" generics="T extends number | [number, number, number]">
	import { base } from '$app/paths';
	import type { ColorScaleStop } from '$lib/constants';
	import { getContext, onDestroy } from 'svelte';
	import { key, mapboxgl, type MBMapContext } from './mapboxgl';

	const { getMap, getReady } = getContext<MBMapContext>(key);

	const sourceId = 'pixels';
	const layerId = 'pixels-layer';
	const hoverLayerId = 'pixels-hover-layer';

	export let data: T[];
	export let stops: ColorScaleStop[];
	export let hoveredId: number | null = null;
	export let hoveredValue: T | null = null;
	export let opacity: number = 1;

	const buildStops = (scale: ColorScaleStop[]): any => {
		let reverseScale = [...scale].reverse();
		let stops: any[] = ['interpolate', ['linear'], ['feature-state', 'value']];
		for (let i = 0; i < reverseScale.length; i++) {
			stops.push(reverseScale[i].value);
			stops.push(reverseScale[i].color);
		}
		return stops;
	};

	$: {
		if (hoveredId !== null) {
			hoveredValue = data[hoveredId];
		} else {
			hoveredValue = null;
		}
	}

	let initialized: boolean = false;
	let source: mapboxgl.AnySourceData;
	let layer: mapboxgl.AnyLayer;
	let hoverLayer: mapboxgl.AnyLayer;

	function onMouseEnter(e: mapboxgl.EventData) {
		if (e.features.length > 0) {
			if (hoveredId !== null) {
				getMap()?.setFeatureState({ source: sourceId, id: hoveredId }, { selected: false });
			}
			hoveredId = e.features[0].id;
			if (hoveredId !== null) {
				getMap()?.setFeatureState({ source: sourceId, id: hoveredId }, { selected: true });
			}
		}
	}
	function onMouseLeave() {
		if (hoveredId !== null) {
			getMap()?.setFeatureState({ source: sourceId, id: hoveredId }, { selected: false });
		}
		hoveredId = null;
	}

	function initialize() {
		source = {
			type: 'geojson',
			data: base + '/data/pixels.json',
			generateId: true
		};

		layer = {
			id: layerId,
			type: 'fill-extrusion',
			source: sourceId,
			paint: {
				'fill-extrusion-color': [
					'case',
					['!=', ['feature-state', 'value'], null],
					buildStops(stops),
					'#000'
				],
				'fill-extrusion-height': ['get', 'id'],
				'fill-extrusion-base': ['get', 'id'],
				'fill-extrusion-vertical-gradient': false,
				'fill-extrusion-translate-anchor': 'map'
			}
		};

		hoverLayer = {
			id: hoverLayerId,
			type: 'fill',
			source: sourceId,
			paint: {
				'fill-color': 'transparent',
				'fill-outline-color': [
					'case',
					['boolean', ['feature-state', 'selected'], false],
					'blue',
					'transparent'
				]
			}
		};
		getMap()?.addSource(sourceId, source);
		getMap()?.addLayer(layer, 'dummy-bottom');
		getMap()?.addLayer(hoverLayer, 'dummy-bottom');
		console.log("criou PixelLayer no bottom");
		getMap()?.on('mousemove', hoverLayerId, onMouseEnter);
		getMap()?.on('mouseleave', hoverLayerId, onMouseLeave);
		initialized = true;
	}

	$: {
		if (!initialized) {
			if (getReady()) {
				initialize();
			}
			else {
				getMap()?.on('load', initialize);
			}
		}
	}

	$: {
		if (initialized) {
			for (let i = 0; i < data.length; i++) {
				getMap()?.setFeatureState(
					{
						source: 'pixels',
						id: i
					},
					{
						value: typeof data[i] === 'number' ? data[i] : (data[i] as [number, number, number])[1]
					}
				);
			}
		}
	}

	$: {
		if (initialized) {
			getMap()?.setPaintProperty(layerId, 'fill-extrusion-opacity', opacity);
		}
	}

	$: {
		if (initialized) {
			getMap()?.setPaintProperty(layerId, 'fill-extrusion-color', [
				'case',
				['!=', ['feature-state', 'value'], null],
				buildStops(stops),
				'#000'
			]);
		}
	}

	onDestroy(() => {
		getMap()?.off('load', initialize);
		getMap()?.off('mousemove', hoverLayerId, onMouseEnter);
		getMap()?.off('mouseleave', hoverLayerId, onMouseLeave);
		getMap()?.removeLayer(hoverLayerId);
		getMap()?.removeLayer(layerId);
		getMap()?.removeSource(sourceId);
		initialized = false;
		console.log("destruiu");
	});
</script>
