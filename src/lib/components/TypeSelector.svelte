<script lang="ts">
	import { DataType } from '$lib/constants';

	export let value: DataType;
</script>

<style>
	@media (max-width: 420px) {
			span {
					font-size: 0.75rem;
			}
  }
</style>

<div class="rounded-md shadow-sm flex flex-row items-stretch" role="group">
	<label class="cursor-pointer basis-1/3">
		<input type="radio" bind:group={value} value={DataType.INCIDENCE} class="sr-only peer" />
		<div
			class="px-4 py-1.5 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 text-black hover:text-blue-600 flex justify-center items-center peer-checked:bg-blue-600 peer-checked:text-white"
		>
			<span class="text-base font-medium text-center leading-tight">Incidência cumulativa</span>
		</div>
	</label>
	<label class="cursor-pointer basis-1/3">
		<input type="radio" bind:group={value} value={DataType.UNCERTAINTY} class="sr-only peer" />
		<div
			class="px-4 py-1.5 bg-white border border-gray-200 hover:bg-gray-100 text-black hover:text-blue-600 flex justify-center items-center peer-checked:bg-blue-600 peer-checked:text-white"
		>
			<span class="text-base font-medium text-center leading-tight">Incerteza espacial</span>
		</div>
	</label>
	<label class="cursor-pointer basis-1/3">
		<input type="radio" bind:group={value} value={DataType.PROBABILITY} class="sr-only peer" />
		<div
			class="px-4 py-1.5 bg-white border border-gray-200 rounded-r-lg hover:bg-gray-100 text-black hover:text-blue-600 flex justify-center items-center peer-checked:bg-blue-600 peer-checked:text-white"
		>
			<span class="text-base font-medium text-center leading-tight">Probabilidade excedência</span>
		</div>
	</label>
</div>
