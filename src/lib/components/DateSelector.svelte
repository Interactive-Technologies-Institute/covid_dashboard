<script lang="ts">
	export let date: Date;
	let value = date.valueOf();
	export let minDate: Date;
	export let maxDate: Date;
	export let isPlaying = false;
	let timer: NodeJS.Timer | undefined;

	let isLastDate = value == maxDate.valueOf();

	$: {
		date = new Date(value);
		isLastDate = value == maxDate.valueOf();

		if (isLastDate) {
			isPlaying = false;
		}

		if (isPlaying && !timer) {
			timer = setInterval(() => {
				value = value + 86400000;
				isLastDate = value == maxDate.valueOf();
				if (isLastDate) {
					isPlaying = false;
				}
			}, 1000);
		} else if (!isPlaying && timer) {
			clearInterval(timer);
			timer = undefined;
		}
	}
</script>

<style>
    @media (max-width: 675px) {
        #slider {
            width: 23rem;
						bottom: 4.5rem;

        }
				svg {
						width: 0.75rem;
						height: 0.75rem;
				}
        span {
						width: 6rem;
						font-size: 1rem;
				}
    }
		@media (max-width: 510px) {
				#slider {
						bottom: 8.5rem;
        }
		}
</style>

<div
	id="slider" class="absolute z-10 bottom-20 left-0 right-0 mx-auto w-[30rem] bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col justify-center items-center space-y-3 p-3"
>
	<div class="flex flex-row space-x-4 justify-center items-center">
		<button
			type="button"
			on:click={() => (isPlaying = !isPlaying)}
			class="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white font-medium rounded-full text-sm p-2 text-center inline-flex items-center"
		>
			<svg
				aria-hidden="true"
				class="w-5 h-5"
				fill="currentColor"
				viewBox="0 96 960 960"
				xmlns="http://www.w3.org/2000/svg"
			>
				{#if isPlaying}
					<path
						d="M583 796V356q0-24.75 17.677-42.375t42.5-17.625Q668 296 685.5 313.625T703 356v440q0 24.75-17.677 42.375T642.823 856Q618 856 600.5 838.375T583 796Zm-325 0V356q0-24.75 17.677-42.375t42.5-17.625Q343 296 360.5 313.625T378 356v440q0 24.75-17.677 42.375T317.823 856Q293 856 275.5 838.375T258 796Z"
					/>
				{:else}
					<path
						d="M366 824q-15 10-30.5 1T320 798V348q0-18 15.5-27t30.5 1l354 226q14 9 14 25t-14 25L366 824Z"
					/>
				{/if}
			</svg>
		</button>
		<button
			type="button"
			on:click={() => {
				if (value > minDate.valueOf()) {
					value = value - 86400000;
				}
			}}
			class="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white font-medium rounded-full text-sm p-2 text-center inline-flex items-center"
		>
			<svg
				aria-hidden="true"
				class="w-5 h-5"
				fill="currentColor"
				viewBox="0 96 960 960"
				xmlns="http://www.w3.org/2000/svg"
				><path
					d="M447 875 169 597q-5-5-7-10t-2-11q0-6 2-11t7-10l279-279q8-8 20-8t21 9q9 9 9 21t-9 21L262 546h496q13 0 21.5 8.5T788 576q0 13-8.5 21.5T758 606H262l228 228q8 8 8 20t-9 21q-9 9-21 9t-21-9Z"
				/></svg
			>
		</button>
		<span class="text-xl text-center font-medium text-black px-2 w-36">{date.toLocaleDateString()}</span>
		<button
			type="button"
			on:click={() => {
				if (value < maxDate.valueOf()) {
					value = value + 86400000;
				}
			}}
			class="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white font-medium rounded-full text-sm p-2 text-center inline-flex items-center"
		>
			<svg
				aria-hidden="true"
				class="w-5 h-5"
				fill="currentColor"
				viewBox="0 96 960 960"
				xmlns="http://www.w3.org/2000/svg"
				><path
					d="M459 874q-8-8-8-21t8-21l226-226H190q-13 0-21.5-8.5T160 576q0-13 8.5-21.5T190 546h495L459 320q-8-8-8-21.5t8-21.5q8-8 21-8t21 8l278 278q5 5 7 10t2 11q0 5-2 10.5t-7 10.5L501 875q-8 8-21 7.5t-21-8.5Z"
				/></svg
			>
		</button>
		<button
			type="button"
			on:click={() => (value = minDate.valueOf())}
			class="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white font-medium rounded-full text-sm p-2 text-center inline-flex items-center"
		>
			<svg
				aria-hidden="true"
				class="w-5 h-5"
				fill="currentColor"
				viewBox="0 96 960 960"
				xmlns="http://www.w3.org/2000/svg"
				><path
					d="M480 976q-143 0-245.5-95T121 646q-1-12 7.5-21t21.5-9q12 0 20.5 8.5T181 646q11 115 96 192.5T480 916q125 0 212.5-87.5T780 616q0-125-85-212.5T485 316h-22l52 52q9 9 9 21t-9 21q-9 9-21 9t-21-9L368 305q-5-5-7-10t-2-11q0-6 2-11t7-10l106-106q8-8 20-8t21 8q8 9 8 21t-8 20l-58 58h23q75 0 140.5 28T735 361q49 49 77 114.5T840 616q0 75-28 140.5T735 871q-49 49-114.5 77T480 976Z"
				/></svg
			>
		</button>
	</div>
	<input
		min={minDate.valueOf()}
		max={maxDate.valueOf()}
		step="86400000"
		type="range"
		bind:value
		class="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
	/>
</div>
