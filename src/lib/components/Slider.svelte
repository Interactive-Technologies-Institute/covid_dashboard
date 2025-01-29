<script lang="ts">
	export let value = 1;
</script>

<input
	min="0"
	max="1"
	step="0.1"
	type="range"
	bind:value
	class="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer"
/>
