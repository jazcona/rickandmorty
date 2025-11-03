# 🛸 Rick & Morty Explorer - SvelteKit Edition

Una aplicación de escritorio **moderna y futurista** para explorar el universo de Rick & Morty, construida con **Tauri 2.x**, **SvelteKit** y la **paleta de colores oficial** de la serie.

## 🎨 **Nuevo Diseño Futurista**

### Paleta de Colores Rick & Morty
- 🟢 **Verde Portal**: `#97CE4C` - Color principal de los portales de Rick
- 🔵 **Azul Espacial**: `#44A5C7` - Inspirado en el espacio interdimensional  
- 🟣 **Púrpura Dimensional**: `#9A5FCB` - Energía de la dimensión C-137
- 🟡 **Amarillo Morty**: `#F5E942` - Energía nerviosa de Morty
- 🟠 **Naranja Explosivo**: `#F39019` - Explosiones interdimensionales
- 🔴 **Rosa Alerta**: `#E91E63` - Estados críticos y alertas

### Efectos Visuales Modernos
- ✨ **Partículas animadas** flotando en el fondo
- 🌌 **Gradientes multidimensionales** en botones y cards
- 🛸 **Iconografía temática** con naves espaciales y alienígenas
- 💫 **Animaciones suaves** con curvas bezier profesionales
- 🎭 **Efectos de hover** inmersivos y reactivos
- 🌟 **Sombras con glow** usando los colores de la serie

## Características

### 🎭 Exploración de Personajes
- **Búsqueda por nombre**: Encuentra personajes específicos
- **Filtros avanzados**: Por estado (vivo, muerto, desconocido) y género
- **Información detallada**: Cada personaje muestra:
  - Imagen y nombre
  - Especie y género
  - Estado vital
  - Origen y ubicación actual
  - Lista de episodios donde aparece

### 📺 Navegación de Episodios
- **Catálogo completo**: Todos los episodios de la serie
- **Información detallada**: Código del episodio, fecha de emisión
- **Personajes del episodio**: Lista interactiva de personajes principales
- **Búsqueda por nombre**: Encuentra episodios específicos

### 🌍 Exploración de Ubicaciones
- **Universo completo**: Todas las ubicaciones y dimensiones
- **Filtros por tipo**: Planeta, dimensión, estación espacial, etc.
- **Residentes**: Lista de personajes que habitan cada ubicación
- **Búsqueda avanzada**: Por nombre y tipo de ubicación

### ✨ Características Técnicas
- **Interfaz responsive**: Se adapta a diferentes tamaños de pantalla
- **Navegación intuitiva**: Pestañas para cambiar entre secciones
- **Paginación**: Navegación eficiente por grandes conjuntos de datos
- **Cache inteligente**: Mejora el rendimiento evitando peticiones repetidas
- **Modales informativos**: Detalles expandidos sin perder el contexto
- **Indicadores de carga**: Feedback visual durante las peticiones
- **Búsqueda con debounce**: Optimización para búsquedas en tiempo real

## Instalación y Desarrollo

### Prerrequisitos

#### Rust (requerido para Tauri)
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env
```

#### Node.js y npm
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Dependencias del sistema (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install -y \
    libglib2.0-dev \
    libgtk-3-dev \
    libwebkit2gtk-4.1-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev
```

### Ejecutar la aplicación

1. **Instalar dependencias**
```bash
npm install
```

2. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

3. **Compilar para producción**
```bash
npm run build
```

## Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Tauri v2 (Rust + WebView)
- **API**: Rick and Morty REST API
- **Estilo**: CSS personalizado con gradientes y animaciones

---

**¡Wubba Lubba Dub Dub!** 🛸✨

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
