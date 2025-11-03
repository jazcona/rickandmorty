<script>
	import { loading } from '$lib/stores/app.js';
</script>

{#if $loading}
	<div class="loading">
		<div class="spinner"></div>
		<p>Cargando datos del multiverso...</p>
	</div>
{/if}

<style>
	.loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 6rem 2rem;
		gap: 2rem;
	}

	.spinner {
		width: 80px;
		height: 80px;
		border: 6px solid transparent;
		border-top: 6px solid var(--rm-green);
		border-right: 6px solid var(--rm-blue);
		border-bottom: 6px solid var(--rm-purple);
		border-left: 6px solid var(--rm-yellow);
		border-radius: 50%;
		animation: spin 1.5s linear infinite;
		position: relative;
	}

	.spinner::after {
		content: '🛸';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 2rem;
		animation: float 2s ease-in-out infinite;
	}

	.loading p {
		color: var(--rm-text-primary);
		font-size: 1.4rem;
		font-weight: 600;
		font-family: 'Inter', sans-serif;
		margin: 0;
		text-align: center;
		text-shadow: 0 0 10px rgba(151, 206, 76, 0.5);
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	@keyframes float {
		0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
		50% { transform: translate(-50%, -50%) translateY(-5px); }
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.7; }
	}
</style>