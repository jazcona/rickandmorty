<script>
	import { currentSection } from '$lib/stores/app.js';

	const sections = [
		{ id: 'characters', label: 'Personajes', icon: '🎭' },
		{ id: 'episodes', label: 'Episodios', icon: '📺' },
		{ id: 'locations', label: 'Ubicaciones', icon: '🌍' }
	];

	function switchSection(sectionId) {
		currentSection.set(sectionId);
	}
</script>

<header>
	<h1>🛸 Rick & Morty Explorer</h1>
	<nav>
		{#each sections as section}
			<button 
				class="nav-btn"
				class:active={$currentSection === section.id}
				on:click={() => switchSection(section.id)}
			>
				<span class="icon">{section.icon}</span>
				{section.label}
			</button>
		{/each}
	</nav>
</header>

<style>
	header {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		padding: 1rem 2rem;
		border-bottom: 2px solid #4CAF50;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	h1 {
		color: #2E7D32;
		text-align: center;
		margin-bottom: 1rem;
		font-size: 2.5rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
	}

	nav {
		display: flex;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.nav-btn {
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 25px;
		background: #4CAF50;
		color: white;
		cursor: pointer;
		font-weight: bold;
		transition: all 0.3s ease;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.nav-btn:hover {
		background: #45a049;
		transform: translateY(-2px);
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
	}

	.nav-btn.active {
		background: #2E7D32;
		transform: scale(1.05);
	}

	.icon {
		font-size: 1.2rem;
	}

	@media (max-width: 768px) {
		header {
			padding: 1rem;
		}
		
		h1 {
			font-size: 2rem;
		}
		
		nav {
			flex-direction: column;
			align-items: center;
		}
		
		.nav-btn {
			width: 100%;
			max-width: 300px;
			justify-content: center;
		}
	}
</style>