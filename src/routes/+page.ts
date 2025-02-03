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
	const inc_promise = e.fetch('data/inc.json').then((response) => response.json()).then((j) => {
		const inc = j.data as [number, number, number][][];

		return inc.slice(minIndex, maxIndex + 1);
	});
	const iqd_promise = e.fetch('data/iqd.json').then((response) => response.json()).then((j) => {
		const iqd = j.data as number[][];

		return iqd.slice(minIndex, maxIndex + 1)
	});
	const prob_promise = e.fetch('data/prob.json').then((response) => response.json()).then((j) => {
	    const prob = j.data as number[][];

		return prob.slice(minIndex, maxIndex + 1);
	});
	const incTrad_promise = e.fetch('data/inc_trad.json').then((response) => response.json()).then((j) => {
	    const incTrad = j.data as number[][];

		return incTrad.slice(minIndex, maxIndex + 1);
	});


	return {
		minDate: minDate,
		maxDate: maxDate,
		chart: await chart_promise,
		chart2: await chart2_promise,
		pixels: {
			[DataType.INCIDENCE]: await inc_promise,
			[DataType.UNCERTAINTY]: await iqd_promise,
			[DataType.PROBABILITY]: await prob_promise
		},
		trad: {
			[DataType.INCIDENCE]: await incTrad_promise,
			[DataType.UNCERTAINTY]: [],
			[DataType.PROBABILITY]: []
		},
		isTrad: paramsIsTrad
	};
}
