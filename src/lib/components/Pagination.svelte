<script>
	import { createEventDispatcher } from 'svelte';

	export let currentPage = 1;
	export let totalPages = 1;

	const dispatch = createEventDispatcher();

	function previousPage() {
		if (currentPage > 1) {
			dispatch('pageChange', currentPage - 1);
		}
	}

	function nextPage() {
		if (currentPage < totalPages) {
			dispatch('pageChange', currentPage + 1);
		}
	}
</script>

<div class="pagination">
	<button 
		class="page-btn"
		disabled={currentPage <= 1}
		on:click={previousPage}
	>
		← Anterior
	</button>
	
	<span class="page-info">
		Página {currentPage}{totalPages > 0 ? ` de ${totalPages}` : ''}
	</span>
	
	<button 
		class="page-btn"
		disabled={currentPage >= totalPages || totalPages === 0}
		on:click={nextPage}
	>
		Siguiente →
	</button>
</div>

<style>
	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		margin-top: 2rem;
	}

	.page-btn {
		padding: 1rem 2rem;
		border: none;
		border-radius: var(--rm-border-radius);
		background: var(--rm-gradient-primary);
		color: white;
		cursor: pointer;
		font-weight: 600;
		font-family: 'Inter', sans-serif;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: var(--rm-shadow-md);
		position: relative;
		overflow: hidden;
	}

	.page-btn::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 50%;
		transition: width 0.3s, height 0.3s, top 0.3s, left 0.3s;
		transform: translate(-50%, -50%);
	}

	.page-btn:hover:not(:disabled)::before {
		width: 300px;
		height: 300px;
	}

	.page-btn:hover:not(:disabled) {
		transform: translateY(-3px);
		box-shadow: var(--rm-shadow-lg);
	}

	.page-btn:disabled {
		background: var(--rm-bg-tertiary);
		cursor: not-allowed;
		transform: none;
		opacity: 0.5;
	}

	.page-info {
		background: var(--rm-bg-card);
		padding: 1rem 1.5rem;
		border-radius: var(--rm-border-radius);
		font-weight: 600;
		font-family: 'Inter', sans-serif;
		color: var(--rm-text-dark);
		box-shadow: var(--rm-shadow-md);
		min-width: 140px;
		text-align: center;
		border: 1px solid rgba(151, 206, 76, 0.2);
	}

	@media (max-width: 768px) {
		.pagination {
			flex-direction: column;
			gap: 0.5rem;
		}

		.page-btn {
			width: 100%;
			max-width: 200px;
		}
	}
</style>