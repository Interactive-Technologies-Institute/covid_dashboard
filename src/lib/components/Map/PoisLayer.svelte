<script lang="ts">
    import { onMount } from 'svelte';
    import { getContext } from 'svelte';
    import { key, mapboxgl, type MBMapContext } from './mapboxgl';

    const { getMap, getReady } = getContext<MBMapContext>(key);

    export let id: string;
    export let url: string;
	export let visibility: boolean = false;
    export let icon_url: string;
    export let icon_size: number;

	let initialized: boolean = false;

    let layerId = 'poi-layer-' + id;
    let sourceId = 'pois-source-' + id;

    const map = getMap()!;


    onMount(() => {
      if (!map) {
        console.error('Map not found.');
        return;
      }
    });


    function initialize() {
        map.loadImage(icon_url, (error, image) => {
            if (error) throw error;
            if (!image) throw "image is undefined";

            let icon_name = id + '-icon';

            map.addImage(icon_name, image);

            map.addSource(sourceId, {
                type: 'geojson',
                data: url
            });

            map.addLayer({
                id: layerId,
                type: 'symbol',
                source: sourceId,
                layout: {
                    'icon-image': icon_name,
                    'icon-size': icon_size, /*[
                        'interpolate', ['linear'], ['zoom'],
                        6, 0.5,  
                        15, 1.5  
                    ], */
                    'text-field': '', 
                   'text-offset': [0, 1.5],
                    'text-anchor': 'top'
                }
            }, 'dummy-top');

            map.on('mouseenter', layerId, (e) => {
            map.getCanvas().style.cursor = 'pointer';

            const feature = e.features?.[0];
            if (feature?.geometry.type === 'Point') {
                const coordinates = feature.geometry.coordinates as [number, number];
                const { title } = feature.properties || {};

                new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
                    .setLngLat(coordinates)
                    .setHTML(`<h3>${title}</h3>`)
                    .addTo(map);
            }
            });

            map.on('mouseleave', layerId, () => {
                map.getCanvas().style.cursor = '';

                const popups = document.getElementsByClassName('mapboxgl-popup');
                while (popups.length) {
                    popups[0].remove();
                }
            });

            initialized = true;
        });
    }

    $: {
        if (!initialized) {
            if (getReady()) {
				initialize();
			}
			else {
				map.on('load', initialize);
			}
		}
    }

    $: {
        if (initialized) {
            map.setLayoutProperty(layerId, 'visibility', visibility ? 'visible' : 'none');
        }
    }
</script>