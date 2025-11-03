<script>
	import { createEventDispatcher } from 'svelte';

	export let locations = [];
	export let loading = false;

	const dispatch = createEventDispatcher();

	function showLocationModal(location) {
		dispatch('showModal', { type: 'location', data: location });
	}
</script>

{#if loading}
	<div class="loading-container">
		<div class="spinner"></div>
		<p>Cargando ubicaciones...</p>
	</div>
{:else if locations.length === 0}
	<div class="empty-state">
		<p>No se encontraron ubicaciones</p>
	</div>
{:else}
	<div class="location-grid">
		{#each locations as location (location.id)}
			<div 
				class="location-card" 
				role="button" 
				tabindex="0"
				on:click={() => showLocationModal(location)}
				on:keydown={(e) => e.key === 'Enter' && showLocationModal(location)}
			>
				<div class="location-header">
					<h3>{location.name}</h3>
					<span class="location-type">{location.type}</span>
				</div>
				<div class="location-info">
					<p class="dimension">Dimensión: {location.dimension}</p>
					<p class="resident-count">{location.residents.length} residentes</p>
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		gap: 1rem;
	}

	.spinner {
		width: 40px;
		height: 40px;
		border: 4px solid #f3f3f3;
		border-top: 4px solid #4CAF50;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	.empty-state {
		text-align: center;
		padding: 2rem;
		font-size: 1.2rem;
		color: #666;
	}

	.location-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1.5rem;
		padding: 1rem;
	}

	.location-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		cursor: pointer;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		overflow: hidden;
		padding: 1.5rem;
	}

	.location-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
	}

	.location-card:focus {
		outline: 2px solid #ff6b95;
		outline-offset: 2px;
	}

	.location-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
		gap: 1rem;
	}

	.location-header h3 {
		margin: 0;
		font-size: 1.2rem;
		color: #333;
		flex: 1;
		line-height: 1.3;
	}

	.location-type {
		background: linear-gradient(135deg, #ff9a56 0%, #ff6b95 100%);
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: bold;
		white-space: nowrap;
	}

	.location-info {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.dimension {
		margin: 0;
		color: #666;
		font-size: 0.9rem;
	}

	.resident-count {
		margin: 0;
		color: #ff6b95;
		font-weight: bold;
		font-size: 0.9rem;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	@media (max-width: 768px) {
		.location-grid {
			grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
			gap: 1rem;
			padding: 0.5rem;
		}

		.location-card {
			padding: 1rem;
		}
	}

	@media (max-width: 480px) {
		.location-grid {
			grid-template-columns: 1fr;
			padding: 0.5rem;
		}

		.location-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}

		.location-type {
			align-self: flex-end;
		}
	}
</style>