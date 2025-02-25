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

    .tooltip-container:hover .tooltip {
        visibility: visible;
    }

    .tooltip {
        visibility: hidden;
        background-color: white;
        color: black;
        text-align: center;
        font-size: small;
        padding: 3px 7px;
        border-radius: 4px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        white-space: nowrap;
    }

    @media (max-width: 510px) {
        .tooltip-container{
						bottom: 258px;
				}
    }
</style>


<div class="tooltip-container absolute bottom-[175px] right-2 z-30">
	<button class="help-button">
		<a href="{base}/help.html" target="_blank" rel="noopener noreferrer">
			<img src="{base}/icons/help.svg" alt="Manual de Utilização" class="h-8" />
		</a>
	</button>
	<div class="tooltip absolute bottom-[12px] right-[34px] z-30">Manual de Utilização</div>
</div>


