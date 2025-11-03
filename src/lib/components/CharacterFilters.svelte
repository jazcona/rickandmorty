<script>
	import { createEventDispatcher, onDestroy } from 'svelte';

	export let filters = {
		search: '',
		status: '',
		species: '',
		gender: ''
	};

	const dispatch = createEventDispatcher();
	let searchTimeout;

	function updateFilters() {
		dispatch('filtersChanged', filters);
	}

	function handleSearchInput() {
		// Debounce para búsqueda de texto
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}
		searchTimeout = setTimeout(() => {
			updateFilters();
		}, 500);
	}

	onDestroy(() => {
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}
	});

	function clearFilters() {
		filters = {
			search: '',
			status: '',
			species: '',
			gender: ''
		};
		dispatch('filtersChanged', filters);
	}

	$: hasActiveFilters = filters.search || filters.status || filters.species || filters.gender;
</script>

<div class="filters-container">
	<div class="filters-row">
		<div class="search-group">
			<input
				type="text"
				placeholder="Buscar por nombre..."
				bind:value={filters.search}
				on:input={handleSearchInput}
				class="search-input"
			/>
		</div>

		<div class="filter-group">
			<select bind:value={filters.status} on:change={updateFilters} class="filter-select">
				<option value="">Estado</option>
				<option value="alive">Vivo</option>
				<option value="dead">Muerto</option>
				<option value="unknown">Desconocido</option>
			</select>
		</div>

		<div class="filter-group">
			<select bind:value={filters.species} on:change={updateFilters} class="filter-select">
				<option value="">Especie</option>
				<option value="Human">Humano</option>
				<option value="Alien">Alienígena</option>
				<option value="Robot">Robot</option>
				<option value="Animal">Animal</option>
				<option value="Disease">Enfermedad</option>
				<option value="Cronenberg">Cronenberg</option>
			</select>
		</div>

		<div class="filter-group">
			<select bind:value={filters.gender} on:change={updateFilters} class="filter-select">
				<option value="">Género</option>
				<option value="female">Femenino</option>
				<option value="male">Masculino</option>
				<option value="genderless">Sin género</option>
				<option value="unknown">Desconocido</option>
			</select>
		</div>

		{#if hasActiveFilters}
			<button class="clear-btn" on:click={clearFilters} title="Limpiar filtros">
				<span>✕</span> Limpiar
			</button>
		{/if}
	</div>
</div>

<style>
	.filters-container {
		background: var(--rm-bg-card);
		border-radius: var(--rm-border-radius-lg);
		box-shadow: var(--rm-shadow-lg);
		padding: 2rem;
		margin-bottom: 2rem;
		border: 1px solid rgba(151, 206, 76, 0.2);
		backdrop-filter: blur(10px);
		position: relative;
		overflow: hidden;
	}

	.filters-container::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: var(--rm-gradient-primary);
	}

	.filters-row {
		display: grid;
		grid-template-columns: 2fr repeat(3, 1fr) auto;
		gap: 1rem;
		align-items: center;
	}

	.search-group {
		position: relative;
	}

	.search-input {
		width: 100%;
		padding: 1rem 1.25rem;
		border: 2px solid rgba(151, 206, 76, 0.2);
		border-radius: var(--rm-border-radius);
		font-size: 1rem;
		font-family: 'Inter', sans-serif;
		background: rgba(255, 255, 255, 0.9);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		color: var(--rm-text-dark);
	}

	.search-input:focus {
		outline: none;
		border-color: var(--rm-green);
		box-shadow: var(--rm-shadow-sm);
		transform: translateY(-2px);
		background: white;
	}

	.search-input::placeholder {
		color: var(--rm-text-muted);
	}

	.filter-group {
		display: flex;
		flex-direction: column;
	}

	.filter-select {
		padding: 1rem;
		border: 2px solid rgba(151, 206, 76, 0.2);
		border-radius: var(--rm-border-radius);
		background: rgba(255, 255, 255, 0.9);
		font-size: 1rem;
		font-family: 'Inter', sans-serif;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		color: var(--rm-text-dark);
	}

	.filter-select:focus {
		outline: none;
		border-color: var(--rm-green);
		box-shadow: var(--rm-shadow-sm);
		transform: translateY(-2px);
		background: white;
	}

	.clear-btn {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.5rem;
		background: linear-gradient(135deg, var(--rm-pink) 0%, var(--rm-orange) 100%);
		color: white;
		border: none;
		border-radius: var(--rm-border-radius);
		cursor: pointer;
		font-size: 0.95rem;
		font-weight: 600;
		font-family: 'Inter', sans-serif;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		white-space: nowrap;
		box-shadow: var(--rm-shadow-md);
	}

	.clear-btn:hover {
		transform: translateY(-2px);
		box-shadow: var(--rm-shadow-lg);
		background: linear-gradient(135deg, #d81b60 0%, #e65100 100%);
	}

	.clear-btn span {
		font-weight: bold;
	}

	@media (max-width: 1024px) {
		.filters-row {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.clear-btn {
			justify-self: center;
		}
	}

	@media (max-width: 768px) {
		.filters-container {
			padding: 1rem;
			margin-bottom: 1rem;
		}

		.filters-row {
			gap: 0.75rem;
		}

		.search-input,
		.filter-select {
			padding: 0.6rem;
			font-size: 0.9rem;
		}

		.clear-btn {
			padding: 0.6rem 0.8rem;
			font-size: 0.85rem;
		}
	}
</style>