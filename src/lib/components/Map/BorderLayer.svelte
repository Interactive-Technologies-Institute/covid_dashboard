<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { key, mapboxgl, type MBMapContext } from './mapboxgl';

	const { getMap, getReady } = getContext<MBMapContext>(key);

	export let id: string;
	export let url: string;
	export let visiblity: boolean = false;
	export let selectable: boolean = false;
	export let selectedId: number | null = null;
	export let hoveredLabel: string | null = null;
	export let hoveredId: string | null = null;
	export let lineWidth: number = 1;

	export let normalColor: string = 'red';
	export let selectedColor: string = 'black';

	let initialized: boolean = false;
	let source: mapboxgl.AnySourceData;
	let layerId: string;
	let layer: mapboxgl.AnyLayer;
	let selectedLayerId: string;
	let selectedLayer: mapboxgl.AnyLayer;

	function onMouseClick(e: mapboxgl.EventData) {
		if (e.features.length > 0) {
			if (selectedId !== null) {
				getMap()?.setFeatureState({ source: id, id: selectedId }, { selected: false });
			}
			selectedId = e.features[0].id;
			if (selectedId !== null) {
				getMap()?.setFeatureState({ source: id, id: selectedId }, { selected: true });
			}
		}
	}

	function onMouseMove(e: mapboxgl.EventData) {
		if (e.features.length > 0) {

			hoveredLabel = e.features[0].properties.label;
			hoveredId = e.features[0].id;
		}
	}

	function onMouseLeave(e: mapboxgl.EventData) {
		hoveredLabel = null;
		hoveredId = null;
	}

	function initialize() {
		source = {
			type: 'geojson',
			data: url,
			promoteId: 'id'
		};

		layerId = id + 'layer';
		layer = {
			id: layerId,
			type: 'fill',
			source: id,
			paint: {
				'fill-color': 'transparent',
				'fill-outline-color': normalColor,
			}
		};
		selectedLayerId = layerId + '-select';
		selectedLayer = {
			id: selectedLayerId,
			type: 'line',
			source: id,
			paint: {
				'line-width': lineWidth,
				'line-color': [
					'case',
					['boolean', ['feature-state', 'selected'], false],
					selectedColor,
					'transparent'
				]
			}
		};
		getMap()?.addSource(id, source);
		getMap()?.addLayer(layer, 'dummy-middle');
		console.log("criou BorderLayer no middle");

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
			if (selectable) {
				getMap()?.addLayer(selectedLayer, 'dummy-middle');
				getMap()?.on('click', layerId, onMouseClick);
			}
		}
	}

	$: {
		if (initialized) {
			getMap()?.setPaintProperty(
				layerId,
				'fill-outline-color',
				visiblity ? normalColor : 'transparent'
			);
			if (selectable) {
				getMap()?.setLayoutProperty(selectedLayerId, 'visibility', visiblity ? 'visible' : 'none');
			}
		}
	}

	$: {
		if (initialized) {
			getMap()?.on('mousemove', layerId, onMouseMove);
			getMap()?.on('mouseleave', layerId, onMouseLeave);
		}
	}

	onDestroy(() => {
		if (initialized) {
			getMap()?.off('load', initialize);
			getMap()?.removeLayer(layerId);
			getMap()?.off('mousemove', layerId, onMouseMove);
			getMap()?.off('mouseleave', layerId, onMouseLeave);
			if (selectable) {
				getMap()?.off('click', layerId, onMouseClick);
				getMap()?.removeLayer(selectedLayerId);
			}
			getMap()?.removeSource(id);
			initialized = false;
		}
	});
</script>
