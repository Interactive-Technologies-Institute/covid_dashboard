<script lang="ts">
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { setContext } from 'svelte';
	import { key, mapboxgl, type MBMapContext } from './mapboxgl';

	let map: mapboxgl.Map | undefined;

	setContext<MBMapContext>(key, {
		getMap: () => map
	});

	function initialize(node: HTMLElement) {
		map = new mapboxgl.Map({
			container: node,
			style: 'mapbox://styles/mapbox/light-v11',
			center: [-9.469218750000001, 39.56827914916011],
			zoom: 6,
			minZoom: 6,
			maxZoom: 15
		});
		map.dragRotate.disable();
		map.touchZoomRotate.disableRotation();

		const bounds = new mapboxgl.LngLatBounds(
			[-30.0, 36.0], // Southwest corner (lng, lat)
			[5.0, 51.0]   // Northeast corner (lng, lat)
		);
		map.setMaxBounds(bounds);

		return {
			destroy() {
				map?.remove();
				map = undefined;
			}
		};
	}
</script>

<div style="height: 100%; width: 100%;" use:initialize>
	{#if map}
		<slot />
	{/if}
</div>
