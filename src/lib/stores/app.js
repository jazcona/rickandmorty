import { writable } from 'svelte/store';

// Estados globales de la aplicación
export const currentSection = writable('characters');
export const loading = writable(false);

// Estados de paginación
export const currentPage = writable({
    characters: 1,
    episodes: 1,
    locations: 1
});

// Filtros para búsqueda (personajes)
export const filters = writable({
    search: '',
    status: '',
    species: '',
    gender: ''
});

// Cache para las peticiones
export const cache = writable(new Map());

// Datos actuales
export const charactersData = writable({ results: [], info: {} });
export const episodesData = writable({ results: [], info: {} });
export const locationsData = writable({ results: [], info: {} });

// Modal
export const modalData = writable(null);
export const showModal = writable(false);