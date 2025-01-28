<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { key, mapboxgl, type MBMapContext } from './mapboxgl';

	const { getMap } = getContext<MBMapContext>(key);

	export let id: string;
	export let url: string;
	export let hoveredConcelho: number | null = null;
	let previousHoveredConcelho: number | null = null;

	let initialized = false;
	let source: mapboxgl.AnySourceData;
	let selectedLayerId = 'concelho-hovered-select';
	let selectedLayer: mapboxgl.AnyLayer;

	function initialize() {
		source = {
			type: 'geojson',
			data: url,
			promoteId: 'id'
		};

		selectedLayer = {
			id: selectedLayerId,
			type: 'line',
			source: id,
			paint: {
				'line-width': 2,
				'line-color': [
					'case',
					['boolean', ['feature-state', 'selected'], false],
					'black',
					'transparent'
				]
			}
		};

		getMap()?.addSource(id, source);
		getMap()?.addLayer(selectedLayer);
		if (hoveredConcelho !== null) {
			getMap()?.setFeatureState({ source: id, id: hoveredConcelho }, { selected: true });
		}
		initialized = true;
	}

	$: {
		if (!initialized) {
			getMap()?.on('load', initialize);
		}
	}

	$: {
		if (initialized) {
			if (hoveredConcelho !== null) {
				if (previousHoveredConcelho !== null) {
					getMap()?.setFeatureState({ source: id, id: previousHoveredConcelho }, { selected: false });
				}
				getMap()?.setFeatureState({ source: id, id: hoveredConcelho }, { selected: true });
				getMap()?.setLayoutProperty(selectedLayerId, 'visibility', 'visible');
				previousHoveredConcelho = hoveredConcelho;
			} else {
				getMap()?.setLayoutProperty(selectedLayerId, 'visibility', 'none');
			}
		}

	}

	onDestroy(() => {
		if (initialized && hoveredConcelho !== null) {
			getMap()?.off('load', initialize);
			getMap()?.removeLayer(selectedLayerId);
			getMap()?.removeSource(id);
			initialized = false;
		}
	});
</script>
