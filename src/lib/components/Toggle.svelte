<script lang="ts">
	export let value = false;
	export let label: string;
</script>

<label class="relative inline-flex items-center cursor-pointer">
	<input type="checkbox" bind:checked={value} class="sr-only peer" />
	<div
		class="relative w-11 h-6 bg-gray-700 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
	/>
	<span class="ml-3 text-base font-medium text-white">{label}</span>
</label>
