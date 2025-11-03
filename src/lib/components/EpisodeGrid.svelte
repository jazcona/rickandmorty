<script>
	import { createEventDispatcher } from 'svelte';

	export let episodes = [];
	export let loading = false;

	const dispatch = createEventDispatcher();

	function showEpisodeModal(episode) {
		dispatch('showModal', { type: 'episode', data: episode });
	}
</script>

{#if loading}
	<div class="loading-container">
		<div class="spinner"></div>
		<p>Cargando episodios...</p>
	</div>
{:else if episodes.length === 0}
	<div class="empty-state">
		<p>No se encontraron episodios</p>
	</div>
{:else}
	<div class="episode-grid">
		{#each episodes as episode (episode.id)}
			<div 
				class="episode-card" 
				role="button" 
				tabindex="0"
				on:click={() => showEpisodeModal(episode)}
				on:keydown={(e) => e.key === 'Enter' && showEpisodeModal(episode)}
			>
				<div class="episode-header">
					<h3>{episode.name}</h3>
					<span class="episode-code">{episode.episode}</span>
				</div>
				<div class="episode-info">
					<p class="air-date">Fecha de emisión: {episode.air_date}</p>
					<p class="character-count">{episode.characters.length} personajes</p>
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

	.episode-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1.5rem;
		padding: 1rem;
	}

	.episode-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		cursor: pointer;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		overflow: hidden;
		padding: 1.5rem;
	}

	.episode-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
	}

	.episode-card:focus {
		outline: 2px solid #667eea;
		outline-offset: 2px;
	}

	.episode-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
		gap: 1rem;
	}

	.episode-header h3 {
		margin: 0;
		font-size: 1.2rem;
		color: #333;
		flex: 1;
		line-height: 1.3;
	}

	.episode-code {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: bold;
		white-space: nowrap;
	}

	.episode-info {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.air-date {
		margin: 0;
		color: #666;
		font-size: 0.9rem;
	}

	.character-count {
		margin: 0;
		color: #4CAF50;
		font-weight: bold;
		font-size: 0.9rem;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	@media (max-width: 768px) {
		.episode-grid {
			grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
			gap: 1rem;
			padding: 0.5rem;
		}

		.episode-card {
			padding: 1rem;
		}
	}

	@media (max-width: 480px) {
		.episode-grid {
			grid-template-columns: 1fr;
			padding: 0.5rem;
		}

		.episode-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}

		.episode-code {
			align-self: flex-end;
		}
	}
</style>