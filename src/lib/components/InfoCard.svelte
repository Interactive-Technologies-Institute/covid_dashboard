<script lang="ts">
	export let aces: string | null;
	export let concelho: string | null;
	export let freguesia: string | null;
	export let value: number | [number, number, number] | null;
	export let label: string;
	export let description: string;

	$: hasData = value !== null && aces !== null && concelho !== null && freguesia !== null;
</script>

<style>
    @media (max-width: 675px) {
        .infocard-content{
            right: 50%;
            top: 145px;
            transform: translate(50%, 0);
            padding: 10px;
        }

        .text-info{
            font-size: 1rem;
        }
    }
</style>


<div
	class="infocard-content absolute z-10 top-24 right-5 bg-white border border-gray-200 rounded-lg shadow-sm w-96 p-5 flex flex-col justify-center items-stretch font-medium text-black text-center"
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
		<p>{concelho}</p>
		<p>{freguesia}</p>
	{:else}
		<p class="text-info text-xl font-medium text-gray-700">
			PASSE O CURSOR SOBRE O MAPA PARA SABER O VALOR NAQUELA ZONA
		</p>
	{/if}
</div>
