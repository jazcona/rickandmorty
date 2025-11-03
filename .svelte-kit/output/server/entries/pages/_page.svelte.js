import { V as store_get, W as unsubscribe_stores, X as ensure_array_like, Y as attr, Z as attr_class, _ as bind_props, $ as head } from "../../chunks/index2.js";
import { w as writable } from "../../chunks/index.js";
import { f as fallback, e as escape_html } from "../../chunks/context.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
const currentSection = writable("characters");
const loading = writable(false);
const currentPage = writable({
  characters: 1,
  episodes: 1,
  locations: 1
});
const filters = writable({
  characters: { name: "", status: "", gender: "" },
  episodes: { name: "" },
  locations: { name: "", type: "" }
});
const modalData = writable(null);
const showModal = writable(false);
function Loading($$renderer) {
  var $$store_subs;
  if (store_get($$store_subs ??= {}, "$loading", loading)) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div class="loading svelte-1a5pdw0"><div class="spinner svelte-1a5pdw0"></div> <p class="svelte-1a5pdw0">Cargando datos del multiverso...</p></div>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]-->`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
}
function Modal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    if (store_get($$store_subs ??= {}, "$showModal", showModal) && store_get($$store_subs ??= {}, "$modalData", modalData)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="modal svelte-ta60gp"><div class="modal-content svelte-ta60gp"><button class="close svelte-ta60gp">×</button> <div class="modal-body svelte-ta60gp">${html(store_get($$store_subs ??= {}, "$modalData", modalData))}</div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function CharacterGrid($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let characters = fallback($$props["characters"], () => [], true);
    let loading2 = fallback($$props["loading"], false);
    if (loading2) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="loading-container svelte-1kpbrr3"><div class="spinner svelte-1kpbrr3"></div> <p class="svelte-1kpbrr3">Cargando personajes...</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (characters.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="empty-state svelte-1kpbrr3"><p class="svelte-1kpbrr3">No se encontraron personajes</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="character-grid svelte-1kpbrr3"><!--[-->`);
        const each_array = ensure_array_like(characters);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let character = each_array[$$index];
          $$renderer2.push(`<div class="character-card svelte-1kpbrr3" role="button" tabindex="0"><img${attr("src", character.image)}${attr("alt", character.name)} class="svelte-1kpbrr3"/> <div class="character-info svelte-1kpbrr3"><h3 class="svelte-1kpbrr3">${escape_html(character.name)}</h3> <p class="status svelte-1kpbrr3"><span${attr_class("status-dot svelte-1kpbrr3", void 0, {
            "alive": character.status === "Alive",
            "dead": character.status === "Dead",
            "unknown": character.status === "unknown"
          })}></span> ${escape_html(character.status)} - ${escape_html(character.species)}</p> <p class="location svelte-1kpbrr3">Última ubicación:</p> <p class="location-name svelte-1kpbrr3">${escape_html(character.location.name)}</p></div></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { characters, loading: loading2 });
  });
}
function EpisodeGrid($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let episodes = fallback($$props["episodes"], () => [], true);
    let loading2 = fallback($$props["loading"], false);
    if (loading2) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="loading-container svelte-n1xid9"><div class="spinner svelte-n1xid9"></div> <p class="svelte-n1xid9">Cargando episodios...</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (episodes.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="empty-state svelte-n1xid9"><p class="svelte-n1xid9">No se encontraron episodios</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="episode-grid svelte-n1xid9"><!--[-->`);
        const each_array = ensure_array_like(episodes);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let episode = each_array[$$index];
          $$renderer2.push(`<div class="episode-card svelte-n1xid9" role="button" tabindex="0"><div class="episode-header svelte-n1xid9"><h3 class="svelte-n1xid9">${escape_html(episode.name)}</h3> <span class="episode-code svelte-n1xid9">${escape_html(episode.episode)}</span></div> <div class="episode-info svelte-n1xid9"><p class="air-date svelte-n1xid9">Fecha de emisión: ${escape_html(episode.air_date)}</p> <p class="character-count svelte-n1xid9">${escape_html(episode.characters.length)} personajes</p></div></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { episodes, loading: loading2 });
  });
}
function LocationGrid($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let locations = fallback($$props["locations"], () => [], true);
    let loading2 = fallback($$props["loading"], false);
    if (loading2) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="loading-container svelte-2fh0u5"><div class="spinner svelte-2fh0u5"></div> <p class="svelte-2fh0u5">Cargando ubicaciones...</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (locations.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="empty-state svelte-2fh0u5"><p class="svelte-2fh0u5">No se encontraron ubicaciones</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="location-grid svelte-2fh0u5"><!--[-->`);
        const each_array = ensure_array_like(locations);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let location = each_array[$$index];
          $$renderer2.push(`<div class="location-card svelte-2fh0u5" role="button" tabindex="0"><div class="location-header svelte-2fh0u5"><h3 class="svelte-2fh0u5">${escape_html(location.name)}</h3> <span class="location-type svelte-2fh0u5">${escape_html(location.type)}</span></div> <div class="location-info svelte-2fh0u5"><p class="dimension svelte-2fh0u5">Dimensión: ${escape_html(location.dimension)}</p> <p class="resident-count svelte-2fh0u5">${escape_html(location.residents.length)} residentes</p></div></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { locations, loading: loading2 });
  });
}
function Pagination($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentPage2 = fallback($$props["currentPage"], 1);
    let totalPages = fallback($$props["totalPages"], 1);
    $$renderer2.push(`<div class="pagination svelte-14nrfpk"><button class="page-btn svelte-14nrfpk"${attr("disabled", currentPage2 <= 1, true)}>← Anterior</button> <span class="page-info svelte-14nrfpk">Página ${escape_html(currentPage2)}${escape_html(totalPages > 0 ? ` de ${totalPages}` : "")}</span> <button class="page-btn svelte-14nrfpk"${attr("disabled", currentPage2 >= totalPages || totalPages === 0, true)}>Siguiente →</button></div>`);
    bind_props($$props, { currentPage: currentPage2, totalPages });
  });
}
function CharacterFilters($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let hasActiveFilters;
    let filters2 = fallback($$props["filters"], () => ({ search: "", status: "", species: "", gender: "" }), true);
    hasActiveFilters = filters2.search || filters2.status || filters2.species || filters2.gender;
    $$renderer2.push(`<div class="filters-container svelte-r8nrfy"><div class="filters-row svelte-r8nrfy"><div class="search-group svelte-r8nrfy"><input type="text" placeholder="Buscar por nombre..."${attr("value", filters2.search)} class="search-input svelte-r8nrfy"/></div> <div class="filter-group svelte-r8nrfy">`);
    $$renderer2.select(
      { value: filters2.status, class: "filter-select" },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`Estado`);
        });
        $$renderer3.option({ value: "alive" }, ($$renderer4) => {
          $$renderer4.push(`Vivo`);
        });
        $$renderer3.option({ value: "dead" }, ($$renderer4) => {
          $$renderer4.push(`Muerto`);
        });
        $$renderer3.option({ value: "unknown" }, ($$renderer4) => {
          $$renderer4.push(`Desconocido`);
        });
      },
      "svelte-r8nrfy"
    );
    $$renderer2.push(`</div> <div class="filter-group svelte-r8nrfy">`);
    $$renderer2.select(
      { value: filters2.species, class: "filter-select" },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`Especie`);
        });
        $$renderer3.option({ value: "Human" }, ($$renderer4) => {
          $$renderer4.push(`Humano`);
        });
        $$renderer3.option({ value: "Alien" }, ($$renderer4) => {
          $$renderer4.push(`Alienígena`);
        });
        $$renderer3.option({ value: "Robot" }, ($$renderer4) => {
          $$renderer4.push(`Robot`);
        });
        $$renderer3.option({ value: "Animal" }, ($$renderer4) => {
          $$renderer4.push(`Animal`);
        });
        $$renderer3.option({ value: "Disease" }, ($$renderer4) => {
          $$renderer4.push(`Enfermedad`);
        });
        $$renderer3.option({ value: "Cronenberg" }, ($$renderer4) => {
          $$renderer4.push(`Cronenberg`);
        });
      },
      "svelte-r8nrfy"
    );
    $$renderer2.push(`</div> <div class="filter-group svelte-r8nrfy">`);
    $$renderer2.select(
      { value: filters2.gender, class: "filter-select" },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`Género`);
        });
        $$renderer3.option({ value: "female" }, ($$renderer4) => {
          $$renderer4.push(`Femenino`);
        });
        $$renderer3.option({ value: "male" }, ($$renderer4) => {
          $$renderer4.push(`Masculino`);
        });
        $$renderer3.option({ value: "genderless" }, ($$renderer4) => {
          $$renderer4.push(`Sin género`);
        });
        $$renderer3.option({ value: "unknown" }, ($$renderer4) => {
          $$renderer4.push(`Desconocido`);
        });
      },
      "svelte-r8nrfy"
    );
    $$renderer2.push(`</div> `);
    if (hasActiveFilters) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button class="clear-btn svelte-r8nrfy" title="Limpiar filtros"><span class="svelte-r8nrfy">✕</span> Limpiar</button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
    bind_props($$props, { filters: filters2 });
  });
}
function HeaderModern($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentSection2 = fallback($$props["currentSection"], "characters");
    const sections = [
      { id: "characters", name: "Personajes", icon: "👽" },
      { id: "episodes", name: "Episodios", icon: "📺" },
      { id: "locations", name: "Ubicaciones", icon: "🌍" }
    ];
    $$renderer2.push(`<header class="svelte-62q0fe"><div class="header-content svelte-62q0fe"><h1 class="logo svelte-62q0fe"><span class="logo-icon svelte-62q0fe">🛸</span> Rick &amp; Morty <span class="logo-icon svelte-62q0fe">👽</span></h1> <nav class="navigation svelte-62q0fe"><!--[-->`);
    const each_array = ensure_array_like(sections);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let section = each_array[$$index];
      $$renderer2.push(`<button${attr_class("nav-btn svelte-62q0fe", void 0, { "active": currentSection2 === section.id })}><span class="nav-icon svelte-62q0fe">${escape_html(section.icon)}</span> ${escape_html(section.name)}</button>`);
    }
    $$renderer2.push(`<!--]--></nav></div></header>`);
    bind_props($$props, { currentSection: currentSection2 });
  });
}
const API_BASE_URL = "https://rickandmortyapi.com/api";
let apiCache = /* @__PURE__ */ new Map();
async function fetchFromAPI(endpoint, params = {}) {
  const url = new URL(`${API_BASE_URL}/${endpoint}`);
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      url.searchParams.append(key, params[key]);
    }
  });
  const cacheKey = url.toString();
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
    apiCache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching from API:", error);
    throw error;
  }
}
async function fetchCharacters(page = 1, filters2 = {}) {
  const params = { page, ...filters2 };
  return await fetchFromAPI("character", params);
}
async function fetchEpisodes(page = 1, filters2 = {}) {
  const params = { page, ...filters2 };
  return await fetchFromAPI("episode", params);
}
async function fetchLocations(page = 1, filters2 = {}) {
  const params = { page, ...filters2 };
  return await fetchFromAPI("location", params);
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let data = [];
    let totalPages = 1;
    async function loadData() {
      loading.set(true);
      try {
        let result;
        switch (store_get($$store_subs ??= {}, "$currentSection", currentSection)) {
          case "characters":
            result = await fetchCharacters(store_get($$store_subs ??= {}, "$currentPage", currentPage), store_get($$store_subs ??= {}, "$filters", filters));
            break;
          case "episodes":
            result = await fetchEpisodes(store_get($$store_subs ??= {}, "$currentPage", currentPage));
            break;
          case "locations":
            result = await fetchLocations(store_get($$store_subs ??= {}, "$currentPage", currentPage));
            break;
          default:
            result = { results: [], info: { pages: 1 } };
        }
        data = result.results || [];
        totalPages = result.info?.pages || 1;
      } catch (error) {
        console.error("Error al cargar datos:", error);
        data = [];
        totalPages = 1;
      } finally {
        loading.set(false);
      }
    }
    if (store_get($$store_subs ??= {}, "$currentSection", currentSection) || store_get($$store_subs ??= {}, "$currentPage", currentPage)) {
      if (typeof window !== "undefined") {
        loadData();
      }
    }
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Rick &amp; Morty Explorer</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Explora el universo de Rick &amp; Morty"/>`);
    });
    $$renderer2.push(`<main class="svelte-1uha8ag">`);
    HeaderModern($$renderer2, {
      currentSection: store_get($$store_subs ??= {}, "$currentSection", currentSection)
    });
    $$renderer2.push(`<!----> <div class="container svelte-1uha8ag">`);
    if (store_get($$store_subs ??= {}, "$currentSection", currentSection) === "characters") {
      $$renderer2.push("<!--[-->");
      CharacterFilters($$renderer2, {
        filters: store_get($$store_subs ??= {}, "$filters", filters)
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (store_get($$store_subs ??= {}, "$loading", loading)) {
      $$renderer2.push("<!--[-->");
      Loading($$renderer2);
    } else {
      $$renderer2.push("<!--[!-->");
      if (store_get($$store_subs ??= {}, "$currentSection", currentSection) === "characters") {
        $$renderer2.push("<!--[-->");
        CharacterGrid($$renderer2, {
          characters: data,
          loading: store_get($$store_subs ??= {}, "$loading", loading)
        });
      } else {
        $$renderer2.push("<!--[!-->");
        if (store_get($$store_subs ??= {}, "$currentSection", currentSection) === "episodes") {
          $$renderer2.push("<!--[-->");
          EpisodeGrid($$renderer2, {
            episodes: data,
            loading: store_get($$store_subs ??= {}, "$loading", loading)
          });
        } else {
          $$renderer2.push("<!--[!-->");
          if (store_get($$store_subs ??= {}, "$currentSection", currentSection) === "locations") {
            $$renderer2.push("<!--[-->");
            LocationGrid($$renderer2, {
              locations: data,
              loading: store_get($$store_subs ??= {}, "$loading", loading)
            });
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--> `);
    if (data.length > 0) {
      $$renderer2.push("<!--[-->");
      Pagination($$renderer2, {
        currentPage: store_get($$store_subs ??= {}, "$currentPage", currentPage),
        totalPages
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (store_get($$store_subs ??= {}, "$modalData", modalData)) {
      $$renderer2.push("<!--[-->");
      Modal($$renderer2, {
        type: store_get($$store_subs ??= {}, "$modalData", modalData).type,
        data: store_get($$store_subs ??= {}, "$modalData", modalData).data
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></main>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
