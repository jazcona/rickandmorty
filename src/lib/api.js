// API base URL
const API_BASE_URL = 'https://rickandmortyapi.com/api';

// Cache para mejorar rendimiento
let apiCache = new Map();

/**
 * Función genérica para hacer peticiones a la API
 */
async function fetchFromAPI(endpoint, params = {}) {
    const url = new URL(`${API_BASE_URL}/${endpoint}`);
    
    // Agregar parámetros a la URL
    Object.keys(params).forEach(key => {
        if (params[key]) {
            url.searchParams.append(key, params[key]);
        }
    });

    const cacheKey = url.toString();

    // Verificar cache
    if (apiCache.has(cacheKey)) {
        return apiCache.get(cacheKey);
    }

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                return { results: [], info: { pages: 0, count: 0 } };
            }
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Guardar en cache
        apiCache.set(cacheKey, data);
        
        return data;
    } catch (error) {
        console.error('Error fetching from API:', error);
        throw error;
    }
}

/**
 * Obtener personajes con filtros
 */
export async function fetchCharacters(page = 1, filters = {}) {
    const params = { page };
    
	// Mapear filtros a los parámetros correctos de la API
	if (filters.search && filters.search.trim()) {
		params.name = filters.search.trim();
	}
	if (filters.status) {
		params.status = filters.status;
	}
	if (filters.species) {
		params.species = filters.species;
	}
	if (filters.gender) {
		params.gender = filters.gender;
	}    return await fetchFromAPI('character', params);
}

/**
 * Obtener un personaje específico por ID
 */
export async function fetchCharacter(id) {
    return await fetchFromAPI(`character/${id}`);
}

/**
 * Obtener episodios con filtros
 */
export async function fetchEpisodes(page = 1, filters = {}) {
    const params = { page, ...filters };
    return await fetchFromAPI('episode', params);
}

/**
 * Obtener un episodio específico por ID
 */
export async function fetchEpisode(id) {
    return await fetchFromAPI(`episode/${id}`);
}

/**
 * Obtener ubicaciones con filtros
 */
export async function fetchLocations(page = 1, filters = {}) {
    const params = { page, ...filters };
    return await fetchFromAPI('location', params);
}

/**
 * Obtener una ubicación específica por ID
 */
export async function fetchLocation(id) {
    return await fetchFromAPI(`location/${id}`);
}

/**
 * Obtener múltiples recursos por URLs
 */
export async function fetchMultipleByUrls(urls) {
    const promises = urls.map(url => fetch(url).then(r => r.json()));
    return await Promise.all(promises);
}

/**
 * Limpiar cache (útil para desarrollo)
 */
export function clearCache() {
    apiCache.clear();
}