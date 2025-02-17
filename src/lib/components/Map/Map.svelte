<script lang="ts">
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { setContext } from 'svelte';
	import { key, mapboxgl, type MBMapContext } from './mapboxgl';

	let map: mapboxgl.Map | undefined;

    let mapIsReady = false;

	setContext<MBMapContext>(key, {
		getMap: () => map,
        getReady: () => mapIsReady
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

        map.once('load', () => mapIsReady = true);


		map.dragRotate.disable();
		map.touchZoomRotate.disableRotation();

		const bounds = new mapboxgl.LngLatBounds(
			[-30.0, 36.0], // Southwest corner (lng, lat)
			[5.0, 51.0]   // Northeast corner (lng, lat)
		);
		map.setMaxBounds(bounds);

        map.on('load', () => {
        	map!.addLayer({
            	id: 'dummy-bottom',
                type: 'background',
                paint: {
				    'background-opacity': 0,
                }
            });

            map!.addLayer({
            	id: 'dummy-middle',
                type: 'background',
                paint: {
				    'background-opacity': 0,
                }
            });

            map!.addLayer({
            	id: 'dummy-top',
                type: 'background',
                paint: {
				    'background-opacity': 0,
                }
            });
        });

        map.addControl(new mapboxgl.ScaleControl(), 'bottom-right');

		map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');

		return {
			destroy() {
				map?.remove();
				map = undefined;
			}
		};
	}
</script>

<style>
		:global(.mapboxgl-ctrl-geocoder) {
				width: 300px !important;
				height: 40px !important;
				top: 10px !important;
				font-size: 15px !important;
				margin-left: 0 !important;
				margin-top: 0 !important;
				display: flex !important;
				justify-content: center !important;
		}
    :global(.mapboxgl-ctrl-geocoder--input) {
        width: 300px !important;
        height: 40px !important;
        font-size: 15px !important;
    }

    :global(.mapboxgl-ctrl-top-left) {
        float: none !important;
        position: absolute !important;
        margin: 0 auto !important;
        display: block !important;
        transform: translate(-50%, 0) !important;
        left: 50% !important;
				z-index: 30 !important;
    }

    :global(.mapboxgl-ctrl-bottom-left) {
        float: none !important;
        position: absolute !important;
        bottom: 5rem !important;
    }

    :global(.mapboxgl-ctrl-bottom-right) {
        float: none !important;
        position: absolute !important;
        bottom: 5rem !important;
    }

    @media (max-width: 1250px) {
        :global(.mapboxgl-ctrl-bottom-left) {
            float: none !important;
            position: absolute !important;
            bottom: 4rem !important;
        }

        :global(.mapboxgl-ctrl-bottom-right) {
            float: none !important;
            position: absolute !important;
            bottom: 4rem !important;
        }
    }

    @media (max-width: 675px) {
        :global(.mapboxgl-ctrl-bottom-left) {
            float: none !important;
            position: absolute !important;
            bottom: 3.5rem !important;
        }

        :global(.mapboxgl-ctrl-bottom-right) {
            float: none !important;
            position: absolute !important;
            bottom: 3.5rem !important;
        }
    }

    @media (max-width: 510px) {
        :global(.mapboxgl-ctrl-top-left) {
            float: none !important;
            position: absolute !important;
            margin: 0 auto !important;
            display: block !important;
            transform: translate(-50%, 0) !important;
            left: 50% !important;
        }

        :global(.mapboxgl-ctrl-bottom-left) {
            float: none !important;
            position: absolute !important;
            bottom: 6.5rem !important;
        }

        :global(.mapboxgl-ctrl-bottom-right) {
            float: none !important;
            position: absolute !important;
            bottom: 6.5rem !important;
        }
        :global(.mapboxgl-ctrl-bottom-left .mapboxgl-ctrl-group) {
            float: none !important;
            position: absolute !important;
            bottom: 6.5rem !important;
        }
    }
    @media (max-width: 400px) {
        :global(.mapboxgl-ctrl-top-left) {
            float: none !important;
            position: absolute !important;
            margin: 0 auto !important;
            display: block !important;
            transform: translate(-50%, 0) !important;
            left: 50% !important;
						top: 50px !important;
        }
    }
</style>

<div style="height: 100%; width: 100%;" use:initialize>
	{#if map}
		<slot />
	{/if}
</div>
