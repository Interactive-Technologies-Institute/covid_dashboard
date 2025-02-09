import { DataType, type ChartData } from '$lib/constants';
import type { PageLoadEvent } from './$types';

import { base } from '$app/paths';

type PixelJson = ([number, number, number] | number)[][];


/** @type {import('./$types').PageLoad} */
export async function load(e: PageLoadEvent) {
	const defaultMinDate = new Date('2020-05-15');
	const defaultMaxDate = new Date('2021-05-25');

	let minDate = defaultMinDate;
	let maxDate = defaultMaxDate;

	const dateToIndex = (date: Date): number => {
		const millis = date.valueOf();
		return (millis - defaultMinDate.valueOf()) / 86400000;
	};

	
	let numJsons = Math.ceil(dateToIndex(maxDate) / 10);

	const params = e.url.searchParams;
	const paramsMinDate = params.has('minDate') ? new Date(params.get('minDate')!) : null;
	const paramsMaxDate = params.has('maxDate') ? new Date(params.get('maxDate')!) : null;
	const paramsIsTrad = params.has('trad') ? params.get('trad') === 'true' : false;

	if (paramsMinDate && paramsMaxDate && paramsMinDate.valueOf() < paramsMaxDate.valueOf()) {
		minDate =
			paramsMinDate && paramsMinDate.valueOf() > minDate.valueOf() ? paramsMinDate : minDate;
		maxDate =
			paramsMaxDate && paramsMaxDate.valueOf() < maxDate.valueOf() ? paramsMaxDate : maxDate;
	}

	const minIndex = dateToIndex(minDate);
	const maxIndex = dateToIndex(maxDate);

	let incPromises: Promise<PixelJson>[] = new Array(numJsons).fill(null);
	let iqdPromises: Promise<PixelJson>[] = new Array(numJsons).fill(null);
	let probPromises: Promise<PixelJson>[] = new Array(numJsons).fill(null);

	const downloadJson = async (n: number, type: string) => {
		const url =  `${base}/data/${type}/${n}.json`;

		const response = await fetch(url);

		const data = await response.json() as PixelJson;
	    
		console.log(`carreguei ${type} ${n}`);

		return data;
	};

	function wait(milliseconds: number) {
		return new Promise(resolve => setTimeout(resolve, milliseconds));
	  }

	const seqDownload = (type: string, array: Promise<PixelJson>[]) => {
		array[0] = downloadJson(0, type);

		for (let i = 1; i < numJsons; i++) {
			// we want to download sequentially but not await
			array[i] = array[i - 1].then(() => downloadJson(i, type));
			//wait(3000 * i).then(() => segmentedInc[i - 1]).then(() => incDownloadJson(i));
		}
	}

	// we are not awaiting so it can downlod in the background
	seqDownload('inc', incPromises);
	seqDownload('iqd', iqdPromises);
	seqDownload('prob', probPromises);

	e.url.searchParams.set('minDate', minDate.toISOString().slice(0, 10));
	e.url.searchParams.set('maxDate', maxDate.toISOString().slice(0, 10));

	const chart_promise = e.fetch('data/chart.json').then((response) => response.json()).then((j) => {
		const chart = j.data as number[];

		return chart.slice(minIndex, maxIndex + 1);
	});
	const chart2_promise = e.fetch('data/chart2.json').then((response) => response.json()).then((j) => {
		const chart2 = j.data as ChartData[];

		return chart2.map((d) => ({
			...d,
			data: d.data.slice(minIndex, maxIndex + 1)
		}))
	});

	const incTradPromise = e.fetch('data/inc_trad.json').then((response) => response.json()).then((j) => {
	    const incTrad = j.data as number[][];

		return incTrad.slice(minIndex, maxIndex + 1);
	});


	return {
		minDate: minDate,
		maxDate: maxDate,
		numJsons: numJsons,
		chart: await chart_promise,
		chart2: await chart2_promise,

		segmentedIncPromise: incPromises,
		segmentedIqdPromise: iqdPromises,
		segmentedProbPromise: probPromises,

		trad: {
			[DataType.INCIDENCE]: incTradPromise,
			[DataType.UNCERTAINTY]: [],
			[DataType.PROBABILITY]: []
		},
		isTrad: paramsIsTrad
	};
}
