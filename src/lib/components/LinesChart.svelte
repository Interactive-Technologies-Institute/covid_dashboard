<script lang="ts">
	import type { ChartData } from '$lib/constants';
	import {
		Chart as ChartJS,
		LineController,
		LineElement,
		LinearScale,
		PointElement,
		TimeScale,
		Tooltip,
		Title
	} from 'chart.js';
	import 'chartjs-adapter-date-fns';
	import annotationPlugin from 'chartjs-plugin-annotation';

	let chart: ChartJS | undefined;
	let initialized = false;

	export let date: Date;
	export let minDate: Date;
	export let maxDate: Date;
	export let data: ChartData[] | null = null;
	export let hoveredConcelho: number | null = null;

	const getDates = (): number[] => {
		let dateArray: number[] = [];
		var currentDate = minDate;
		while (currentDate <= maxDate) {
			dateArray.push(currentDate.valueOf());
			currentDate = new Date(currentDate.valueOf() + 86400000);
		}
		return dateArray;
	};

	const getAnnotations = (): any => {
		const alertDate = new Date('2020-07-03');
		const emergencyDate = new Date('2020-11-06');
		const calamityDate = new Date('2021-04-30');
		const finalDate = new Date('2021-05-30');
		return {
			currentDate: {
				type: 'line' as const,
				xMin: date.valueOf(),
				xMax: date.valueOf(),
				borderColor: 'rgb(0, 0, 0)',
				borderWidth: 2
			},
			alertLine: {
				type: 'line' as const,
				xMin: alertDate.valueOf(),
				xMax: alertDate.valueOf(),
				borderColor: 'rgba(0, 0, 0, 0.4)',
				borderWidth: 1
			},
			alertLabel:
				(alertDate > minDate && alertDate < maxDate) ||
				(emergencyDate > minDate && emergencyDate < maxDate) ||
				(alertDate < minDate && emergencyDate > maxDate)
					? {
							type: 'label' as const,
							content: 'Alerta',
							color: 'rgba(0, 0, 0, 0.4)',
							position: { x: 'center', y: 'start' },
							yMin: (c: any) => c.chart.scales.y.max,
							xMin: Math.max(alertDate.valueOf(), minDate.valueOf()),
							xMax: Math.min(emergencyDate.valueOf(), maxDate.valueOf())
					  }
					: undefined,
			emergencyLine: {
				type: 'line' as const,
				xMin: emergencyDate.valueOf(),
				xMax: emergencyDate.valueOf(),
				borderColor: 'rgba(0, 0, 0, 0.4)',
				borderWidth: 1
			},
			emergencyLabel:
				(emergencyDate > minDate && emergencyDate < maxDate) ||
				(calamityDate > minDate && calamityDate < maxDate) ||
				(emergencyDate < minDate && calamityDate > maxDate)
					? {
							type: 'label' as const,
							content: 'Emergência',
							color: 'rgba(0, 0, 0, 0.4)',
							position: { x: 'center', y: 'start' },
							yMin: (c: any) => c.chart.scales.y.max,
							xMin: Math.max(emergencyDate.valueOf(), minDate.valueOf()),
							xMax: Math.min(calamityDate.valueOf(), maxDate.valueOf())
					  }
					: undefined,
			calamityLine: {
				type: 'line' as const,
				xMin: calamityDate.valueOf(),
				xMax: calamityDate.valueOf(),
				borderColor: 'rgba(0, 0, 0, 0.4)',
				borderWidth: 1
			},
			calamityLabel:
				(calamityDate > minDate && calamityDate < maxDate) ||
				(finalDate > minDate && finalDate < maxDate) ||
				(calamityDate < minDate && finalDate > maxDate)
					? {
							type: 'label' as const,
							content: 'Calamidade',
							color: 'rgba(0, 0, 0, 0.4)',
							position: { x: 'center', y: 'start' },
							yMin: (c: any) => c.chart.scales.y.max,
							xMin: Math.max(calamityDate.valueOf(), minDate.valueOf()),
							xMax: Math.min(finalDate.valueOf(), maxDate.valueOf()),
							xAddjust: -50
					  }
					: undefined
		};
	};

	$: {
		if (chart && date) {
			chart!.options.plugins!.annotation!.annotations = getAnnotations();
			chart.data.datasets =
				data?.map((d) => {
					return {
						animation: {
							duration: 0
						},
						borderColor: 'rgba(37, 99, 235, 0.1)',
						hoverBorderColor: 'rgb(37, 99, 235)',
						pointRadius: 0,
						pointHoverRadius: 0,
						id: d.id,
						label: d.label,
						data: d.data
					};
				}) ?? [];
		}
	}

	$: chart?.update();

	const config = {
		type: 'line' as const,
		data: {
			labels: getDates(),
			datasets:
				data?.map((d) => {
					return {
						animation: {
							duration: 0
						},
						borderColor: 'rgba(37, 99, 235, 0.1)',
						hoverBorderColor: 'rgb(37, 99, 235)',
						pointRadius: 0,
						pointHoverRadius: 0,
						label: d.label,
						data: d.data
					};
				}) ?? []
		},
		options: {
			events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
			responsive: true,
			scales: {
				x: {
					font: {
						size: 4
					},
					type: 'time' as const,
					time: {
						displayFormats: {
							day: 'dd MMM',
							month: 'dd MMM'
						}
					},
					min: minDate.valueOf(),
					max: maxDate.valueOf(),
					title: {
						display: true,
						text: 'Tempo',
						padding: 0
					}
				},
				y: {
					font: {
						size: 4
					},
					title: {
						display: true,
						text: 'Tx. inc. cum. (* 10\u2075 hab.)    ',
						padding: 0
					}
				}
			},
			plugins: {
				title: {
					display: true,
					text: 'Incidência cumulativa por concelho, na área de influência do ACES',
					padding: {
						top: 0,
						bottom: 20
					}
				},
				legend: {
					display: false
				},
				tooltip: {
					position: 'nearest' as const,
					titleMarginBottom: 0,
					callbacks: {
						label: () => '',
						footer: () => ''
					}
				},
				annotation: {
					annotations: getAnnotations()
				}
			},
			interaction: {
				mode: 'dataset' as const,
				intersect: false
			},
			onHover: (event, chartElement) => {
				if (chartElement && chartElement.length) {
					const hoveredDataset = chartElement[0].datasetIndex;
					hoveredConcelho = config.data.datasets[hoveredDataset].id;
				}
			}
		}
	};

	function initialize(node: HTMLCanvasElement) {
		ChartJS.register(
			Title,
			LineController,
			LineElement,
			PointElement,
			LinearScale,
			TimeScale,
			Tooltip,
			annotationPlugin
		);
		const ctx = node.getContext('2d') as CanvasRenderingContext2D;
		chart = new ChartJS(ctx, config);
		initialized = true;
		return {
			destroy() {
				chart?.destroy();
			}
		};
	}

	function handleMouseLeave() {
		if (initialized) {
			hoveredConcelho = null;
		}
	}
</script>

<style>
    @media (max-height: 900px) {
        .last-chart {
            margin-bottom: 7rem !important;
        }
    }
</style>

<div class="last-chart bg-white border border-gray-200 rounded-lg shadow-sm p-4"
		 on:mouseleave={handleMouseLeave}>
	{#if data}
		<canvas height="165px" use:initialize />
	{:else}
		<p class="text-xl font-medium text-center text-gray-700">
			SELECIONE UM ACES PARA VER A EVOLUÇÃO DA INCIDÊNCIA NOS CONCELHOS
		</p>
	{/if}
</div>
