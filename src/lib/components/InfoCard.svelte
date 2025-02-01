<script lang="ts">
	import { onMount } from "svelte";

	export let aces: string | null;
	export let concelho: string | null;
	export let concelhoId: string | null;
	export let freguesia: string | null;
	export let value: number | [number, number, number] | null;
	export let label: string;
	export let description: string;

	export let url: string;
	export let date: Date;

	$: hasData = value !== null && aces !== null && concelho !== null && freguesia !== null && concelhoId !== null;

    let casos_covid = fetch(url).then((dados) => dados.json());

	function taxa_covid(_id: string | null, casos_json: any) {
		let id =  _id!;

		let date_text = date.toLocaleDateString('pt');

		if (casos_json.hasOwnProperty(id) && casos_json[id].hasOwnProperty(date_text)) {
			return casos_json[id][date_text];
		}
	}
</script>

<div
	class="bg-white border border-gray-200 rounded-lg shadow-sm w-96 p-5 flex flex-col justify-center items-stretch font-medium text-black text-center"
>
	{#if hasData}
		{#await casos_covid then casos_json}
		    {@const casos_concelho = taxa_covid(concelhoId, casos_json)}
			{@const aces_stripped = aces?.replace("ACES ", "")}
			<p class="text-xl">{label}</p>
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

			<div class="border rounded-md m-2">
			<p><span class="text-gray-700">ACES</span> {aces_stripped}</p>
			</div>

			<div class="border rounded-md m-2">
					<p><span class="text-gray-700">Concelho</span> {concelho}</p>
					{#if casos_concelho}
						<p>{casos_concelho["pop19"]} habitantes</p>
						<p>{casos_concelho["ncases"]} casos</p>
						<p>{casos_concelho["taxa"]}</p>
					{/if}
			</div>

			<div class="border rounded-md m-2">
				<p><span class="text-gray-700">Freguesia</span> {freguesia}</p>
			</div>
		{/await}		
	{:else}
		<p class="text-xl font-medium text-gray-700">
			PASSE O CURSOR SOBRE O MAPA PARA SABER O VALOR NAQUELA ZONA
		</p>
	{/if}
</div>
