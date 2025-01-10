<script lang="ts">
	import { base } from '$app/paths';
</script>

<style>
    @media (max-width: 1250px) {
        footer {
            gap: 5rem;
        }
        footer img {
            height: 1.5rem;
        }
    }
    @media (max-width: 920px) {
        footer {
            gap: 2rem;
        }
        footer img {
            height: 1.5rem;
        }
    }
    @media (max-width: 640px) {
        footer {
            gap: 2rem;
        }
        footer img {
            height: 1.5rem;
        }
		}
</style>

<footer class="bg-white flex flex-row flex-wrap gap-20 p-5 top-5 items-center justify-center z-50">
	<img src="{base}/logos/ist.svg" alt="IST" class="h-10" />
	<img src="{base}/logos/cerena.svg" alt="CERENA" class="h-10" />
	<img src="{base}/logos/iti.svg" alt="ITI" class="h-10" />
	<img src="{base}/logos/cegist.svg" alt="CEGIST" class="h-10" />
	<img src="{base}/logos/insa.png" alt="INSA" class="h-10" />
	<img src="{base}/logos/fct.svg" alt="FCT" class="h-10" />
</footer>
