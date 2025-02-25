<script lang="ts">
	import type { MapConfig } from '$lib/constants';
	import { base } from '$app/paths';
	import ColorScaleToggle from '$lib/components/ColorScaleToggle.svelte';

	export let config: MapConfig;
	export let accessibility: boolean;

	let gradient: string;

	$: gradient = `linear-gradient(to bottom, ${config.stops.map((stop) => stop.color).join(', ')})`;
	let isColorButtonOpen = false;

	function toggleColorButton() {
		isColorButtonOpen = !isColorButtonOpen;
	}
</script>

<style>
		.color-scale-button-open {
				z-index: 50;
		}

    .color-scale-content {
        z-index: -10;
    }

    .color-scale-content.color-scale-open {
        z-index: 40;
    }

    .color-scale {
        transition: transform 0.6s ease-in-out;
        transform: translateX(1000px);
    }
    .color-scale.is-open {
        transform: translateX(0);
    }

    .color-scale-button {
        background-color: #ffffff;
        border: 2px solid #2563eb;
        border-radius: 100%;
        padding: 7px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }

    .color-scale-button:hover {
        background-color: #e0e0e0;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    .color-scale-button img {
        display: block;
        margin: 0 auto;
        height: 1rem;
    }

    .tooltip-container:hover .tooltip {
        visibility: visible;
    }

    .tooltip {
        visibility: hidden;
        background-color: white;
        color: black;
        text-align: center;
				font-size: small;
        padding: 3px 7px;
        border-radius: 4px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        white-space: nowrap;
		}

    @media (max-width: 510px) {
        .tooltip-container{
            bottom: 220px;
        }
				.color-scale{
						bottom: 260px;
				}
    }
</style>

{#if config}
	<div class="color-scale-content absolute bottom-0 right-0 z-40 w-[210px] h-[600px] overflow-hidden" class:color-scale-open={isColorButtonOpen}>
		<div
			class="color-scale absolute z-40 bottom-[175px] right-2 bg-white border border-gray-200 rounded-lg shadow w-[180px] flex flex-col justify-center items-start"
			class:is-open={isColorButtonOpen}
		>
			<div class="rounded-t-lg bg-blue-600 w-full p-2.5 flex flex-col">
				<span class="text-sm font-medium leading-tight text-white pb-2">{config.label}</span>
				{#if config.description !== ''}
					<span class="text-xs font-normal leading-tight text-white">{config.description}</span>
				{/if}
			</div>
			<div class="m-5 flex flex-row justify-start items-stretch space-x-4 h-40">
				<div class="w-12" style={`background: ${gradient};`} />
				<div class="flex flex-col justify-between">
					{#each config.labels as label}
						<span class="text-base font-medium text-black">{label}</span>
					{/each}
				</div>
			</div>
			<div class="w-full p-2 flex flex-col border-t-2">
				<ColorScaleToggle label="Acessibilidade" bind:value={accessibility} />
			</div>
		</div>
	</div>
	<div class="tooltip-container absolute bottom-[137px] right-2 z-10" class:color-scale-button-open={isColorButtonOpen}>
		<button class="color-scale-button"
						on:click={toggleColorButton}
		>
			<img src="{base}/icons/color_scale_icon.svg" alt="Legenda" />
		</button>
		<div class="tooltip absolute bottom-[12px] right-[34px] z-10">Legenda</div>
	</div>
{/if}