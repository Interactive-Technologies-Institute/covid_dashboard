<script lang="ts">
	import { onMount } from "svelte";

	export let aces: string | null;
	export let concelho: string | null;
	export let concelho_id: string | null;
	export let freguesia: string | null;
	export let value: number | [number, number, number] | null;
	export let label: string;
	export let description: string;

	export let url: string;
	export let date: Date;

	$: hasData = value !== null && aces !== null && concelho !== null && freguesia !== null && concelho_id !== null;


    let casos_covid = fetch(url).then((dados) => dados.json());

	function taxa_covid(_id: string | null, casos_json: any) {
		let id =  _id!;

		let date_text = date.toLocaleDateString(); // todo

		if (id in casos_json && date_text in casos_json[id]) {
			return [id, date_text, casos_json[id][date_text]];
		}
	}
</script>

<div
	class="bg-white border border-gray-200 rounded-lg shadow-sm w-96 p-5 flex flex-col justify-center items-stretch font-medium text-black text-center"
>
	{#if hasData}
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
		<p>{aces}</p>
		<p>
			{#await casos_covid then casos_json}
		    	{#if concelho_id !== null}
					{taxa_covid(concelho_id, casos_json)}
				{/if}
			{/await}

			{concelho}
		</p>
		<p>{freguesia}</p>
		
	{:else}
		<p class="text-xl font-medium text-gray-700">
			PASSE O CURSOR SOBRE O MAPA PARA SABER O VALOR NAQUELA ZONA
		</p>
	{/if}
</div>
