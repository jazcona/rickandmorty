<script>
	import { filters } from '$lib/stores/app.js';

	let searchValue = '';
	
	function testSearch() {
		filters.update(f => ({
			...f,
			search: searchValue
		}));
		console.log('Filtro actualizado:', searchValue);
	}
</script>

<div style="position: fixed; top: 10px; right: 10px; background: white; padding: 10px; border: 1px solid red; z-index: 9999;">
	<h4>Debug Filtros</h4>
	<input bind:value={searchValue} placeholder="Test search" />
	<button on:click={testSearch}>Buscar</button>
	<p>Store: {JSON.stringify($filters)}</p>
</div>