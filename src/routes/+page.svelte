<script>
	import { onMount } from 'svelte';
	import { 
		Loading, 
		Modal, 
		CharacterGrid, 
		EpisodeGrid, 
		LocationGrid, 
		Pagination,
		CharacterFilters 
	} from '$lib/components';
	import HeaderModern from '$lib/components/HeaderModern.svelte';
	import { 
		currentSection, 
		loading, 
		currentPage, 
		filters, 
		modalData,
		cache
	} from '$lib/stores/app.js';
	import { fetchCharacters, fetchEpisodes, fetchLocations } from '$lib/api.js';

	// Variables reactivas locales
	let data = [];
	let totalPages = 1;

	// Función para cargar datos según la sección actual
	async function loadData() {
		loading.set(true);
		try {
			let result;
			
			switch ($currentSection) {
				case 'characters':
					result = await fetchCharacters($currentPage, $filters);
					break;
				case 'episodes':
					result = await fetchEpisodes($currentPage);
					break;
				case 'locations':
					result = await fetchLocations($currentPage);
					break;
				default:
					result = { results: [], info: { pages: 1 } };
			}
			
			data = result.results || [];
			totalPages = result.info?.pages || 1;
		} catch (error) {
			console.error('Error al cargar datos:', error);
			data = [];
			totalPages = 1;
		} finally {
			loading.set(false);
		}
	}

	// Manejar cambio de sección
	function handleSectionChange(event) {
		currentSection.set(event.detail);
		currentPage.set(1);
		loadData();
	}

	// Manejar cambio de página
	function handlePageChange(event) {
		currentPage.set(event.detail);
		loadData();
	}

	// Manejar cambio de filtros (solo para personajes)
	function handleFiltersChange(event) {
		filters.set(event.detail);
		currentPage.set(1);
		// La reactividad se encargará de recargar los datos
	}

	// Manejar mostrar modal
	function handleShowModal(event) {
		modalData.set(event.detail);
	}

	// Manejar cerrar modal
	function handleCloseModal() {
		modalData.set(null);
	}

	// Cargar datos iniciales al montar
	onMount(() => {
		loadData();
	});

	// Recargar datos cuando cambie la sección o página
	$: if ($currentSection || $currentPage) {
		// Solo recarga si no es la carga inicial
		if (typeof window !== 'undefined') {
			loadData();
		}
	}

	// Recargar datos cuando cambien los filtros (solo para personajes)
	$: if ($currentSection === 'characters' && typeof window !== 'undefined') {
		// Reactividad específica para filtros de personajes
		$filters;
		loadData();
	}
</script>

<svelte:head>
	<title>Rick & Morty Explorer</title>
	<meta name="description" content="Explora el universo de Rick & Morty" />
</svelte:head>

<main>
	<HeaderModern 
		currentSection={$currentSection} 
		on:sectionChange={handleSectionChange} 
	/>
	
	<div class="container">
		{#if $currentSection === 'characters'}
			<CharacterFilters 
				filters={$filters} 
				on:filtersChanged={handleFiltersChange} 
			/>
		{/if}

		{#if $loading}
			<Loading />
		{:else if $currentSection === 'characters'}
			<CharacterGrid 
				characters={data} 
				loading={$loading}
				on:showModal={handleShowModal}
			/>
		{:else if $currentSection === 'episodes'}
			<EpisodeGrid 
				episodes={data} 
				loading={$loading}
				on:showModal={handleShowModal}
			/>
		{:else if $currentSection === 'locations'}
			<LocationGrid 
				locations={data} 
				loading={$loading}
				on:showModal={handleShowModal}
			/>
		{/if}

		{#if data.length > 0}
			<Pagination 
				currentPage={$currentPage}
				totalPages={totalPages}
				on:pageChange={handlePageChange}
			/>
		{/if}
	</div>

	{#if $modalData}
		<Modal 
			isOpen={true}
			type={$modalData.type}
			data={$modalData.data}
			on:close={handleCloseModal}
		/>
	{/if}


</main>

<style>
	main {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.container {
		flex: 1;
		max-width: 1400px;
		margin: 0 auto;
		padding: 2rem 1rem;
		width: 100%;
		position: relative;
		z-index: 1;
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem 0.5rem;
		}
	}
</style>