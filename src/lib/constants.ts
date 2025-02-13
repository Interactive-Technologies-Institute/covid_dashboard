export enum DataType {
	INCIDENCE,
	UNCERTAINTY,
	PROBABILITY
}
export type ColorScaleStop = {
	value: number;
	color: string;
};

export type MapConfig = {
	label: string;
	description: string;
	stops: ColorScaleStop[];
	labels: string[];
};

export type MapConfigs = {
	[key in DataType]: MapConfig;
};

export type ChartData = {
	id: number;
	label: string;
	fids: number[];
	data: number[];
};

export const configs: MapConfigs = {
	[DataType.INCIDENCE]: {
		label: 'Incidência cumulativa',
		description: 'Por 100.000 habitantes',
		stops: [
			{
				value: 1000,
				color: '#aa4b0d'
			},
			{
				value: 500,
				color: '#d9a445'
			},
			{
				value: 0,
				color: '#FFFFB3'
			}
		],
		labels: ['1000+', '750', '500', '250', '0']
	},
	[DataType.UNCERTAINTY]: {
		label: 'Incerteza espacial',
		description: 'Por 100.000 habitantes',
		stops: [
			{
				value: 1000,
				color: '#aa4b0d'
			},
			{
				value: 500,
				color: '#d9a445'
			},
			{
				value: 0,
				color: '#FFFFB3'
			}
		],
		labels: ['1000+', '750', '500', '250', '0']
	},
	[DataType.PROBABILITY]: {
		label: 'Probabilidade de excedência',
		description: '240 casos / 100.000 habitantes',
		stops: [
			{
				value: 1,
				color: '#aa4b0d'
			},
			{
				value: 0.5,
				color: '#d9a445'
			},
			{
				value: 0,
				color: '#FFFFB3'
			}
		],
		labels: ['1.0', '0.75', '0.5', '0.25', '0']
	}
};

export const configsColorBlind: MapConfigs = {
	[DataType.INCIDENCE]: {
		label: 'Incidência cumulativa',
		description: 'Por 100.000 habitantes',
		stops: [
			{
				value: 1000,
				color: '#000080'
			},
			{
				value: 500,
				color: '#984EA3'
			},
			{
				value: 0,
				color: '#FFFFB3'
			}
		],
		labels: ['1000+', '750', '500', '250', '0']
	},
	[DataType.UNCERTAINTY]: {
		label: 'Incerteza espacial',
		description: 'Por 100.000 habitantes',
		stops: [
			{
				value: 1000,
				color: '#000080'
			},
			{
				value: 500,
				color: '#984EA3'
			},
			{
				value: 0,
				color: '#FFFFB3'
			}
		],
		labels: ['1000+', '750', '500', '250', '0']
	},
	[DataType.PROBABILITY]: {
		label: 'Probabilidade de excedência',
		description: '240 casos / 100.000 habitantes',
		stops: [
			{
				value: 1,
				color: '#000080'
			},
			{
				value: 0.5,
				color: '#984EA3'
			},
			{
				value: 0,
				color: '#FFFFB3'
			}
		],
		labels: ['1.0', '0.75', '0.5', '0.25', '0']
	}
};