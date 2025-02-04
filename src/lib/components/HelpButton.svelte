<script>
	import { base } from '$app/paths';
</script>

<style>
    .help-button {
        background-color: #ffffff;
        border: 2px solid #2563eb;
        border-radius: 100%;
        padding: 7px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }

    .help-button:hover {
        background-color: #e0e0e0;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    .help-button img {
        display: block;
        margin: 0 auto;
				height: 1rem;
		}
    @media (max-width: 510px) {
        .help-button{
						bottom: 220px;
				}
    }
</style>


<button class="help-button absolute bottom-[137px] right-2 z-20">
	<a href="{base}/help.html" target="_blank" rel="noopener noreferrer">
		<img src="{base}/icons/help.svg" alt="HELP" class="h-8" />
	</a>
</button>