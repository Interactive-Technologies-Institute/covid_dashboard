<script lang="ts">
  	import hospitaisJson from './hospitais.json';
  	import escolasJson from './escolas.json';
  	import casasDeRepousoJson from './casas-de-repouso.json';
    
    import { onMount } from 'svelte';
    import { getContext } from 'svelte';
    import { key, mapboxgl, type MBMapContext } from './Map/mapboxgl';
    
    import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
    import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
	  //import { featureGroup } from 'leaflet';

    let geocoder: any;

    const { getMap } = getContext<MBMapContext>(key);
    const map = getMap();

    onMount(() => {
      if (!map) {
        console.error('Map not found.');
        return;
      }

      function busca(query: string) {
        const matchingFeatures: MapboxGeocoder.Result[] = [];
        for (const feature of hospitaisJson.features) {
            if (
                feature.properties.title
                    .toLowerCase()
                    .includes(query.toLowerCase())
            ) {
                let lugar: any = feature;
                lugar.place_name = `➕ ${feature.properties.title}`;
                lugar.center = feature.geometry.coordinates;
                lugar.place_type = ['hospital'];
                matchingFeatures.push(lugar as MapboxGeocoder.Result);
            }
        }

        for (const feature of escolasJson.features) {
            if (
                feature.properties.title
                    .toLowerCase()
                    .includes(query.toLowerCase())
            ) {
                let lugar: any = feature;
                lugar.place_name = `👩‍🎓 ${feature.properties.title}`;
                lugar.center = feature.geometry.coordinates;
                lugar.place_type = ['school'];
                matchingFeatures.push(lugar as MapboxGeocoder.Result);
            }
        }

        for (const feature of casasDeRepousoJson.features) {
            if (
                feature.properties.title
                    .toLowerCase()
                    .includes(query.toLowerCase())
            ) {
                let lugar: any = feature;
                lugar.place_name = `🛏️ ${feature.properties.title}`;
                lugar.center = feature.geometry.coordinates;
                lugar.place_type = ['hospital'];
                matchingFeatures.push(lugar as MapboxGeocoder.Result);
            }
        }


        return matchingFeatures;
      }

      const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken, 
          mapboxgl: mapboxgl, 
          placeholder: 'Search for places in Portugal', 
          bbox: [-9.5, 36.8, -6.2, 42.2],
          countries: 'PT', 
          localGeocoder: busca,
      });

    
      
      map.addControl(geocoder, 'top-left');

      return () => {
        if (geocoder) {
          map.removeControl(geocoder);
        }
      };
  });
</script>

