<script>
	import { createEventDispatcher } from 'svelte';

	export let isOpen = false;
	export let type = '';
	export let data = null;

	const dispatch = createEventDispatcher();

	function closeModal() {
		dispatch('close');
	}

	function handleBackdropClick(event) {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}

	function handleKeydown(event) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen && data}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="modal" on:click={handleBackdropClick}>
		<div class="modal-content">
			<button class="close" on:click={closeModal} aria-label="Cerrar modal">
				✕
			</button>
			
			{#if type === 'character'}
				<div class="character-modal">
					<div class="character-image">
						<img src={data.image} alt={data.name} />
					</div>
					<div class="character-info">
						<h2>{data.name}</h2>
						<div class="info-grid">
							<div class="info-item">
								<span class="label">Estado:</span>
								<span class="status-indicator status-{data.status.toLowerCase()}">{data.status}</span>
							</div>
							<div class="info-item">
								<span class="label">Especie:</span>
								<span class="value">{data.species}</span>
							</div>
							<div class="info-item">
								<span class="label">Género:</span>
								<span class="value">{data.gender}</span>
							</div>
							<div class="info-item">
								<span class="label">Origen:</span>
								<span class="value">{data.origin.name}</span>
							</div>
							<div class="info-item">
								<span class="label">Ubicación:</span>
								<span class="value">{data.location.name}</span>
							</div>
							<div class="info-item">
								<span class="label">Episodios:</span>
								<span class="value">{data.episode.length} apariciones</span>
							</div>
						</div>
					</div>
				</div>
			{:else if type === 'episode'}
				<div class="episode-modal">
					<h2>{data.name}</h2>
					<div class="episode-details">
						<div class="info-item">
							<span class="label">Episodio:</span>
							<span class="episode-code">{data.episode}</span>
						</div>
						<div class="info-item">
							<span class="label">Fecha de emisión:</span>
							<span class="value">{data.air_date}</span>
						</div>
						<div class="info-item">
							<span class="label">Personajes:</span>
							<span class="value">{data.characters.length} personajes</span>
						</div>
					</div>
				</div>
			{:else if type === 'location'}
				<div class="location-modal">
					<h2>{data.name}</h2>
					<div class="location-details">
						<div class="info-item">
							<span class="label">Tipo:</span>
							<span class="location-type">{data.type}</span>
						</div>
						<div class="info-item">
							<span class="label">Dimensión:</span>
							<span class="value">{data.dimension}</span>
						</div>
						<div class="info-item">
							<span class="label">Residentes:</span>
							<span class="value">{data.residents.length} residentes</span>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.modal {
		position: fixed;
		z-index: 1000;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(13, 27, 42, 0.9);
		backdrop-filter: blur(15px);
		display: flex;
		justify-content: center;
		align-items: center;
		animation: fadeIn 0.3s ease-out;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.modal-content {
		background: var(--rm-bg-card);
		border-radius: var(--rm-border-radius-lg);
		padding: 2.5rem;
		max-width: 90%;
		max-height: 90%;
		overflow-y: auto;
		position: relative;
		box-shadow: var(--rm-shadow-lg);
		border: 1px solid rgba(151, 206, 76, 0.2);
		animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	@keyframes modalSlideIn {
		from { transform: scale(0.8); opacity: 0; }
		to { transform: scale(1); opacity: 1; }
	}

	.close {
		position: absolute;
		top: 1rem;
		right: 1rem;
		width: 3rem;
		height: 3rem;
		background: var(--rm-pink);
		color: white;
		border: none;
		border-radius: 50%;
		font-size: 1.2rem;
		font-weight: bold;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		z-index: 10;
	}

	.close:hover {
		background: var(--rm-orange);
		transform: scale(1.1);
		box-shadow: var(--rm-shadow-md);
	}

	.close:active {
		transform: scale(0.95);
	}

	.close {
		position: absolute;
		right: 1rem;
		top: 1rem;
		font-size: 2rem;
		cursor: pointer;
		color: #666;
		background: none;
		border: none;
		transition: color 0.3s ease;
		z-index: 1001;
	}

	.close:hover {
		color: #f44336;
	}

	.modal-body {
		margin-top: 1rem;
	}

	:global(.modal-character) {
		display: flex;
		gap: 2rem;
		flex-wrap: wrap;
	}

	:global(.modal-character img) {
		width: 300px;
		height: 300px;
		object-fit: cover;
		border-radius: 15px;
	}

	:global(.modal-character-info) {
		flex: 1;
		min-width: 300px;
	}

	:global(.modal-character-info h2) {
		color: #2E7D32;
		margin-bottom: 1rem;
		font-size: 2rem;
	}

	:global(.modal-character-info p) {
		margin-bottom: 0.75rem;
		font-size: 1.1rem;
		line-height: 1.5;
	}

	:global(.status) {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 15px;
		font-size: 0.8rem;
		font-weight: bold;
		text-transform: uppercase;
		margin-top: 0.5rem;
	}

	:global(.status.alive) {
		background: #4CAF50;
		color: white;
	}

	:global(.status.dead) {
		background: #f44336;
		color: white;
	}

	:global(.status.unknown) {
		background: #9E9E9E;
		color: white;
	}

	:global(.episodes-list) {
		margin-top: 1.5rem;
	}

	:global(.episodes-list h3) {
		color: #2E7D32;
		margin-bottom: 1rem;
	}

	:global(.episodes-list ul) {
		list-style: none;
		max-height: 200px;
		overflow-y: auto;
		background: #f5f5f5;
		border-radius: 8px;
		padding: 1rem;
	}

	:global(.episodes-list li) {
		padding: 0.5rem;
		border-bottom: 1px solid #ddd;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	:global(.episodes-list li:hover) {
		background-color: #e8f5e8;
	}

	:global(.episodes-list li:last-child) {
		border-bottom: none;
	}

	:global(.grid) {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
		margin-top: 1rem;
	}

	@media (max-width: 768px) {
		.modal-content {
			margin: 1rem;
			padding: 1rem;
		}

		:global(.modal-character) {
			flex-direction: column;
		}

		:global(.modal-character img) {
			width: 100%;
			max-width: 300px;
			margin: 0 auto;
		}

		:global(.grid) {
			grid-template-columns: 1fr;
		}
	}

	@keyframes slideUp {
		from { 
			transform: translateY(50px);
			opacity: 0;
		}
		to { 
			transform: translateY(0);
			opacity: 1;
		}
	}

	/* Estilos específicos para cada tipo de modal */
	.character-modal {
		display: flex;
		gap: 2rem;
		max-width: 600px;
	}

	.character-image {
		flex-shrink: 0;
	}

	.character-image img {
		width: 200px;
		height: 200px;
		border-radius: var(--rm-border-radius);
		object-fit: cover;
		box-shadow: var(--rm-shadow-md);
	}

	.character-info h2 {
		margin: 0 0 1.5rem 0;
		font-family: 'Orbitron', sans-serif;
		color: var(--rm-green);
		font-size: 2rem;
		text-shadow: 0 0 10px rgba(151, 206, 76, 0.3);
	}

	.episode-modal h2,
	.location-modal h2 {
		margin: 0 0 1.5rem 0;
		font-family: 'Orbitron', sans-serif;
		color: var(--rm-blue);
		font-size: 1.8rem;
		text-align: center;
		text-shadow: 0 0 10px rgba(68, 165, 199, 0.3);
	}

	.info-grid,
	.episode-details,
	.location-details {
		display: grid;
		gap: 1rem;
	}

	.info-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem;
		background: var(--rm-gradient-card);
		border-radius: var(--rm-border-radius-sm);
		border: 1px solid rgba(151, 206, 76, 0.1);
	}

	.label {
		font-weight: 600;
		color: var(--rm-text-muted);
		font-size: 0.9rem;
	}

	.value {
		font-weight: 500;
		color: var(--rm-text-dark);
	}

	.status-indicator {
		padding: 0.25rem 0.75rem;
		border-radius: var(--rm-border-radius-sm);
		font-size: 0.8rem;
		font-weight: bold;
		text-transform: uppercase;
	}

	.status-alive {
		background: var(--rm-green);
		color: white;
	}

	.status-dead {
		background: var(--rm-pink);
		color: white;
	}

	.status-unknown {
		background: var(--rm-orange);
		color: white;
	}

	.episode-code {
		background: var(--rm-gradient-primary);
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: var(--rm-border-radius-sm);
		font-weight: bold;
		font-size: 0.9rem;
	}

	.location-type {
		background: linear-gradient(135deg, var(--rm-purple) 0%, var(--rm-pink) 100%);
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: var(--rm-border-radius-sm);
		font-weight: bold;
		font-size: 0.9rem;
	}

	@media (max-width: 768px) {
		.character-modal {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

		.character-image img {
			width: 150px;
			height: 150px;
		}

		.character-info h2 {
			font-size: 1.5rem;
		}

		.info-item {
			flex-direction: column;
			gap: 0.5rem;
			text-align: center;
		}
	}
</style>