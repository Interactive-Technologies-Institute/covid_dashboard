<script lang="ts">
	import { DataType } from '$lib/constants';

	export let aces: string | null;
	export let concelho: string | null;
	export let concelhoId: string | null;
	export let freguesia: string | null;
	export let value: number | [number, number, number] | null;
	export let label: string;
	export let description: string;

	export let url: string;
	export let date: Date;

	export let type: DataType;

	$: hasData = value !== null && aces !== null && concelho !== null && freguesia !== null && concelhoId !== null;

    let casos_covid = fetch(url).then((dados) => dados.json());

	function taxa_covid(_id: string | null, casos_json: any) {
		let id = _id!;

		let date_text = date.toLocaleDateString('pt');

		if (casos_json.hasOwnProperty(id) && casos_json[id].hasOwnProperty(date_text)) {
			return casos_json[id][date_text];
		}
	}
</script>

<style>
    .infocard-content {
        pointer-events: none !important;
		}

    @media (max-width: 675px) {
        .infocard-content{
            padding: 10px;
        }

        .text-info{
            font-size: 1rem;
        }
    }

    @media (max-width: 480px) {
        .infocard-content{
            right: 50%;
            transform: translate(50%, 0);
            padding: 10px;
        }

        .text-info{
            font-size: 1rem;
        }
    }

    @media (max-width: 400px) {
        .infocard-content{
            right: 50%;
            transform: translate(50%, 0);
            padding: 10px;
						top: 115px;
						width: 300px;
        }

        .text-info{
            font-size: 1rem;
        }
    }
</style>


<div
	class="infocard-content absolute z-10 top-16 right-12 bg-white border border-gray-200 rounded-lg shadow-sm w-96 p-3 flex flex-col justify-center items-stretch font-medium text-black text-center"
>
	{#if hasData}
		{#await casos_covid then casos_json}
		    {@const casos_concelho = taxa_covid(concelhoId, casos_json)}
			{@const aces_stripped = aces?.replace("ACES ", "")}
			{#if label === 'Incidência cumulativa'}
				<p class="text-2xl">
					{label} <span class="text-sm text-black font-bold" style="white-space: nowrap">[IC 95%]</span>
				</p>
			{:else }
				<p class="text-2xl">{label}</p>
			{/if}
			<p>{description}</p>
			{#if typeof value === 'number'}
				<p class="text-4xl font-bold text-black py-2">{value}</p>
			{:else}
				<div class="flex flex-row items-end gap-2">
					<div class="flex-1" />
					<p class="text-4xl font-bold text-black py-2">{value?.[1]}</p>
					<p class="flex-1 text-left text-base font-bold text-black py-2">
						[{value?.[0]}, {value?.[2]}]
					</p>
				</div>
			{/if}

			<div class="border rounded-md m-1">
			<p class="text-gray-700">ACES</p> 
					<p>{aces_stripped}</p>
			</div>

			<div class="border rounded-md m-1">
				<p class="text-gray-700">Concelho</p>
				<p>{concelho}</p>
				{#if type === DataType.INCIDENCE}
				<p class="text-sm text-gray-700">
					População residente: <span class="font-bold text-base">{casos_concelho["pop19"]}</span>
				</p>
				<p class="text-sm text-gray-700">
					Número de casos: <span class="font-bold text-base">{casos_concelho["ncases"]}</span>
				</p>
				<p class="text-sm text-gray-700">
					Incidência cumulativa: <span class="font-bold text-base">{casos_concelho["taxa"]}</span>
				</p>
				{/if}
			</div>

			<div class="border rounded-md m-1">
				<p class="text-gray-700">Freguesia</p>
					<p>{freguesia}</p>
			</div>
		{/await}
	{:else}
		<p class="text-info text-xl font-medium text-gray-700">
			PASSE O CURSOR SOBRE O MAPA PARA SABER O VALOR NAQUELA ZONA
		</p>
	{/if}
</div>
