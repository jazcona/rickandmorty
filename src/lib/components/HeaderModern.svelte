<script>
	import { createEventDispatcher } from 'svelte';

	export let currentSection = 'characters';

	const dispatch = createEventDispatcher();

	const sections = [
		{ id: 'characters', name: 'Personajes', icon: '👽' },
		{ id: 'episodes', name: 'Episodios', icon: '📺' },
		{ id: 'locations', name: 'Ubicaciones', icon: '🌍' }
	];

	function changeSection(sectionId) {
		dispatch('sectionChange', sectionId);
	}
</script>

<header>
	<div class="header-content">
		<h1 class="logo">
			<span class="logo-icon">🛸</span>
			Rick & Morty
			<span class="logo-icon">👽</span>
		</h1>
		
		<nav class="navigation">
			{#each sections as section}
				<button
					class="nav-btn"
					class:active={currentSection === section.id}
					on:click={() => changeSection(section.id)}
				>
					<span class="nav-icon">{section.icon}</span>
					{section.name}
				</button>
			{/each}
		</nav>
	</div>
</header>

<style>
	header {
		background: linear-gradient(135deg, var(--rm-bg-primary) 0%, var(--rm-bg-secondary) 100%);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid rgba(151, 206, 76, 0.2);
		box-shadow: var(--rm-shadow-lg);
		padding: 1.5rem 0;
		position: sticky;
		top: 0;
		z-index: 100;
		position: relative;
		overflow: hidden;
	}

	/* Efectos de partículas en el fondo */
	header::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: 
			radial-gradient(circle at 25% 25%, rgba(151, 206, 76, 0.1) 2px, transparent 2px),
			radial-gradient(circle at 75% 75%, rgba(68, 165, 199, 0.1) 2px, transparent 2px);
		background-size: 50px 50px;
		animation: stars 20s linear infinite;
		pointer-events: none;
	}

	@keyframes stars {
		0% { transform: translateY(0); }
		100% { transform: translateY(-50px); }
	}

	.header-content {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		position: relative;
		z-index: 2;
	}

	.logo {
		font-family: 'Orbitron', monospace;
		color: var(--rm-green);
		margin: 0;
		font-size: 3.5rem;
		font-weight: 900;
		text-shadow: 0 0 30px rgba(151, 206, 76, 0.8);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		display: flex;
		align-items: center;
		gap: 1rem;
		cursor: pointer;
	}

	.logo:hover {
		transform: scale(1.05);
		text-shadow: var(--rm-shadow-glow);
	}

	.logo-icon {
		font-size: 3rem;
		animation: float 3s ease-in-out infinite;
	}

	.logo-icon:first-child {
		animation-delay: 0s;
	}

	.logo-icon:last-child {
		animation-delay: 1.5s;
	}

	@keyframes float {
		0%, 100% { 
			transform: translateY(0px) rotate(0deg); 
		}
		25% { 
			transform: translateY(-5px) rotate(2deg); 
		}
		50% { 
			transform: translateY(-10px) rotate(0deg); 
		}
		75% { 
			transform: translateY(-5px) rotate(-2deg); 
		}
	}

	.navigation {
		display: flex;
		gap: 1rem;
		background: var(--rm-gradient-card);
		padding: 0.75rem;
		border-radius: var(--rm-border-radius);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(151, 206, 76, 0.2);
		flex-wrap: wrap;
		justify-content: center;
	}

	.nav-btn {
		padding: 1rem 2rem;
		border: none;
		border-radius: var(--rm-border-radius);
		background: transparent;
		color: var(--rm-text-secondary);
		cursor: pointer;
		font-weight: 600;
		font-size: 1rem;
		font-family: 'Inter', sans-serif;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		min-width: 140px;
		justify-content: center;
	}

	.nav-btn::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		border-radius: 50%;
		background: rgba(151, 206, 76, 0.2);
		transition: width 0.6s, height 0.6s, top 0.6s, left 0.6s;
		transform: translate(-50%, -50%);
		z-index: -1;
	}

	.nav-btn:hover::before {
		width: 300px;
		height: 300px;
	}

	.nav-btn:hover {
		background: rgba(151, 206, 76, 0.1);
		color: var(--rm-green);
		transform: translateY(-3px);
		box-shadow: var(--rm-shadow-md);
	}

	.nav-icon {
		font-size: 1.2rem;
		transition: transform 0.3s ease;
	}

	.nav-btn:hover .nav-icon {
		transform: scale(1.2) rotate(5deg);
	}

	.nav-btn.active {
		background: var(--rm-gradient-primary);
		color: var(--rm-text-primary);
		box-shadow: var(--rm-shadow-lg);
		font-weight: 700;
		transform: scale(1.05);
	}

	.nav-btn.active .nav-icon {
		animation: bounce 0.6s ease;
	}

	.nav-btn.active::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 10%;
		right: 10%;
		height: 3px;
		background: var(--rm-yellow);
		border-radius: 3px;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes bounce {
		0%, 100% { transform: scale(1) rotate(0deg); }
		25% { transform: scale(1.2) rotate(-5deg); }
		50% { transform: scale(1.3) rotate(5deg); }
		75% { transform: scale(1.1) rotate(-2deg); }
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; transform: scaleX(1); }
		50% { opacity: 0.7; transform: scaleX(0.8); }
	}

	@media (max-width: 768px) {
		.header-content {
			padding: 0 1rem;
		}

		.logo {
			font-size: 2.5rem;
		}

		.logo-icon {
			font-size: 2rem;
		}

		.nav-btn {
			padding: 0.75rem 1.5rem;
			font-size: 0.9rem;
			min-width: 120px;
		}
	}

	@media (max-width: 480px) {
		.logo {
			font-size: 2rem;
			flex-direction: column;
			gap: 0.5rem;
		}

		.logo-icon {
			font-size: 1.5rem;
		}

		.navigation {
			flex-direction: column;
			align-items: center;
			gap: 0.5rem;
			width: 100%;
		}

		.nav-btn {
			width: 100%;
			max-width: 250px;
		}
	}
</style>