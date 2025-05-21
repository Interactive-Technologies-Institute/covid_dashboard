import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW5hcGlyZXMxMyIsImEiOiJjbWF4dmY2YjQwMnU4Mm1zaHlwd2J1YzNhIn0.-wCBtnB_dVsa6dnzAxi02w';

const key = Symbol();

export type MBMapContext = {
    getMap: () => mapboxgl.Map | undefined;
    getReady: () => boolean;
};

export { key, mapboxgl };

