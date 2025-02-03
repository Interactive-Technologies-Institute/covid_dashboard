import { DataType, type ChartData } from '$lib/constants';
import type { PageLoadEvent } from './$types';

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

	e.url.searchParams.set('minDate', minDate.toISOString().slice(0, 10));
	e.url.searchParams.set('maxDate', maxDate.toISOString().slice(0, 10));

	const chart_promise = e.fetch('data/chart.json').then((response) => response.json()).then((j) => j.data as number[]);
	const chart2_promise = e.fetch('data/chart2.json').then((response) => response.json()).then((j) => j.data as ChartData[]);
	const inc_promise = e.fetch('data/inc.json').then((response) => response.json()).then((j) => j.data as [number, number, number][][]);
	const iqd_promise = e.fetch('data/iqd.json').then((response) => response.json()).then((j) => j.data as number[][]);
	const prob_promise = e.fetch('data/prob.json').then((response) => response.json()).then((j) => j.data as number[][]);;
	const incTrad_promise = e.fetch('data/inc_trad.json').then((response) => response.json()).then((j) => j.data as number[][]);;


	const chart = await chart_promise;
	const chart2 = await chart2_promise;
	const inc = await inc_promise;
	const iqd = await iqd_promise;
	const prob = await prob_promise;
	const incTrad = await incTrad_promise;


	return {
		minDate: minDate,
		maxDate: maxDate,
		chart: chart.slice(minIndex, maxIndex + 1),
		chart2: chart2.map((d) => ({
			...d,
			data: d.data.slice(minIndex, maxIndex + 1)
		})),
		pixels: {
			[DataType.INCIDENCE]: inc.slice(minIndex, maxIndex + 1),
			[DataType.UNCERTAINTY]: iqd.slice(minIndex, maxIndex + 1),
			[DataType.PROBABILITY]: prob.slice(minIndex, maxIndex + 1)
		},
		trad: {
			[DataType.INCIDENCE]: incTrad.slice(minIndex, maxIndex + 1),
			[DataType.UNCERTAINTY]: [],
			[DataType.PROBABILITY]: []
		},
		isTrad: paramsIsTrad
	};
}
