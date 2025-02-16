<script lang="ts">
  	import { onMount } from 'svelte';
    import { getContext } from 'svelte';
    import { key, mapboxgl, type MBMapContext } from './Map/mapboxgl';
    import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
    import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
		import { base } from '$app/paths';

    let geocoder: any;

    const { getMap } = getContext<MBMapContext>(key);
    const map = getMap();

    function busca(query: string, json: any) {
        const matchingFeatures: MapboxGeocoder.Result[] = [];
        for (const feature of json.features) {
            if (
                feature.properties.title
                    .toLowerCase()
                    .includes(query.toLowerCase())
            ) {
                let lugar: any = feature;
                lugar.place_name = `${feature.properties.title}`;
                lugar.center = feature.geometry.coordinates;
                lugar.place_type = ['hospital'];
                matchingFeatures.push(lugar as MapboxGeocoder.Result);
            }
          }
            return matchingFeatures;
      }



    async function mount() {
      if (!map) {
        console.error('Map not found.');
        return;
      }

      //const locations = await (await fetch(base + "/data/portugal_locations_output.json")).json();

      const geocoder = new MapboxGeocoder({
           accessToken: mapboxgl.accessToken,
           mapboxgl: mapboxgl,
           placeholder: 'Procurar...',
           bbox: [-9.5, 36.8, -6.2, 42.2],
           countries: 'PT',
           //localGeocoder: (query) => busca(query, locations)!,
      });

      map!.addControl(geocoder, 'top-left');


    }

    onMount(mount);
</script>

