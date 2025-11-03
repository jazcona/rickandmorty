<script>
	import '../app.css';
	import '../utils.css';
</script>

<div id="app">
	<slot />
</div>

<style>
	:global(#app) {
		min-height: 100vh;
		background: var(--rm-gradient-secondary);
		position: relative;
		overflow-x: hidden;
	}

	/* Efectos de partículas de fondo global */
	:global(#app)::before {
		content: '';
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: 
			radial-gradient(circle at 20% 80%, rgba(151, 206, 76, 0.05) 2px, transparent 2px),
			radial-gradient(circle at 80% 20%, rgba(68, 165, 199, 0.05) 2px, transparent 2px),
			radial-gradient(circle at 40% 40%, rgba(154, 95, 203, 0.05) 2px, transparent 2px);
		background-size: 100px 100px, 150px 150px, 80px 80px;
		animation: galaxyMove 30s linear infinite;
		pointer-events: none;
		z-index: -1;
	}

	@keyframes galaxyMove {
		0% { transform: translate(0, 0) rotate(0deg); }
		33% { transform: translate(-30px, -30px) rotate(120deg); }
		66% { transform: translate(30px, -20px) rotate(240deg); }
		100% { transform: translate(0, 0) rotate(360deg); }
	}

	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: var(--rm-gradient-secondary);
	}

	:global(*) {
		box-sizing: border-box;
	}

	/* Scrollbar personalizado */
	:global(::-webkit-scrollbar) {
		width: 12px;
	}

	:global(::-webkit-scrollbar-track) {
		background: var(--rm-bg-primary);
		border-radius: 6px;
	}

	:global(::-webkit-scrollbar-thumb) {
		background: linear-gradient(180deg, var(--rm-green) 0%, var(--rm-blue) 100%);
		border-radius: 6px;
		border: 2px solid var(--rm-bg-primary);
	}

	:global(::-webkit-scrollbar-thumb:hover) {
		background: linear-gradient(180deg, var(--rm-green-dark) 0%, var(--rm-blue-dark) 100%);
	}
</style>