<script>
	import { createEventDispatcher } from 'svelte';

	export let characters = [];
	export let loading = false;

	const dispatch = createEventDispatcher();

	function showCharacterModal(character) {
		dispatch('showModal', { type: 'character', data: character });
	}
</script>

{#if loading}
	<div class="loading-container">
		<div class="spinner"></div>
		<p>Cargando personajes...</p>
	</div>
{:else if characters.length === 0}
	<div class="empty-state">
		<p>No se encontraron personajes</p>
	</div>
{:else}
	<div class="character-grid">
		{#each characters as character (character.id)}
			<div 
				class="character-card" 
				role="button" 
				tabindex="0"
				on:click={() => showCharacterModal(character)}
				on:keydown={(e) => e.key === 'Enter' && showCharacterModal(character)}
			>
				<img src={character.image} alt={character.name} />
				<div class="character-info">
					<h3>{character.name}</h3>
					<p class="status">
						<span class="status-dot" class:alive={character.status === 'Alive'} 
							  class:dead={character.status === 'Dead'} 
							  class:unknown={character.status === 'unknown'}></span>
						{character.status} - {character.species}
					</p>
					<p class="location">Última ubicación:</p>
					<p class="location-name">{character.location.name}</p>
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

	.character-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
		padding: 1rem;
	}

	.character-card {
		background: var(--rm-bg-card);
		border-radius: var(--rm-border-radius);
		box-shadow: var(--rm-shadow-md);
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		overflow: hidden;
		border: 1px solid rgba(151, 206, 76, 0.1);
		position: relative;
	}

	.character-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: var(--rm-gradient-primary);
		transform: scaleX(0);
		transition: transform 0.3s ease;
	}

	.character-card:hover {
		transform: translateY(-8px) scale(1.02);
		box-shadow: var(--rm-shadow-lg);
		background: var(--rm-bg-card-hover);
	}

	.character-card:hover::before {
		transform: scaleX(1);
	}

	.character-card:focus {
		outline: 2px solid var(--rm-green);
		outline-offset: 2px;
	}

	.character-card img {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}

	.character-info {
		padding: 1rem;
	}

	.character-info h3 {
		margin: 0 0 0.5rem 0;
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--rm-text-dark);
		font-family: 'Inter', sans-serif;
	}

	.status {
		display: flex;
		align-items: center;
		margin: 0.5rem 0;
		font-weight: bold;
		color: #666;
	}

	.status-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		margin-right: 0.5rem;
	}

	.status-dot.alive {
		background-color: var(--rm-green);
		box-shadow: 0 0 10px rgba(151, 206, 76, 0.5);
	}

	.status-dot.dead {
		background-color: var(--rm-pink);
		box-shadow: 0 0 10px rgba(233, 30, 99, 0.5);
	}

	.status-dot.unknown {
		background-color: var(--rm-orange);
		box-shadow: 0 0 10px rgba(243, 144, 25, 0.5);
	}

	.location {
		margin: 0.5rem 0 0 0;
		font-size: 0.9rem;
		color: #888;
	}

	.location-name {
		margin: 0;
		font-weight: bold;
		color: #333;
		font-size: 0.9rem;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	@media (max-width: 768px) {
		.character-grid {
			grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
			gap: 1rem;
			padding: 0.5rem;
		}
	}

	@media (max-width: 480px) {
		.character-grid {
			grid-template-columns: 1fr;
			padding: 0.5rem;
		}
	}
</style>