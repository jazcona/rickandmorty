# 📦 Guía de Empaquetado - Rick & Morty Explorer

Esta aplicación puede ser empaquetada para múltiples plataformas usando Tauri.

## 🚀 Scripts Disponibles

### Build para plataforma actual
```bash
npm run package
```

### Builds específicos por plataforma
```bash
# Linux (64-bit)
npm run tauri:build:linux

# Windows (64-bit)
npm run tauri:build:windows

# macOS Intel (64-bit)
npm run tauri:build:macos

# macOS Apple Silicon (ARM64)
npm run tauri:build:macos-arm

# Todos los targets (requiere toolchains instalados)
npm run tauri:build:all
```

## 📋 Prerequisitos por Plataforma

### Para Linux (tu plataforma actual):
- ✅ Ya configurado
- Genera: `.deb` y `.AppImage`

### Para Windows:
Instalar target de Windows:
```bash
rustup target add x86_64-pc-windows-msvc
```
- Genera: `.exe` (NSIS installer) y `.msi`

### Para macOS:
Instalar targets de macOS:
```bash
rustup target add x86_64-apple-darwin
rustup target add aarch64-apple-darwin
```
- Genera: `.dmg` y `.app`

## 📁 Ubicación de los Builds

Los archivos empaquetados se generarán en:
```
src-tauri/target/release/bundle/
├── deb/           # Paquetes .deb para Linux
├── appimage/      # AppImages para Linux
├── nsis/          # Instaladores .exe para Windows
├── msi/           # Instaladores .msi para Windows
├── dmg/           # Imágenes .dmg para macOS
└── macos/         # Apps .app para macOS
```

## 🎯 Formatos por Plataforma

| Plataforma | Formato Principal | Formato Alternativo |
|------------|-------------------|-------------------|
| **Linux**  | `.AppImage` (portable) | `.deb` (Ubuntu/Debian) |
| **Windows** | `.exe` (NSIS installer) | `.msi` (Windows installer) |
| **macOS** | `.dmg` (disk image) | `.app` (application bundle) |

## 🔧 Cross-compilation

**Nota**: Para compilar para otras plataformas desde Linux, necesitas:

1. **Rust targets**:
   ```bash
   rustup target add x86_64-pc-windows-msvc
   rustup target add x86_64-apple-darwin
   rustup target add aarch64-apple-darwin
   ```

2. **Herramientas adicionales** (para cross-compilation completa):
   - Para Windows: `mingw-w64`
   - Para macOS: `osxcross` (complejo de configurar)

**Recomendación**: Para distribución oficial, usa GitHub Actions o compilación nativa en cada plataforma.

## 🚀 Build Rápido (Linux)

Para empezar inmediatamente en tu plataforma:

```bash
npm run package
```

Esto generará:
- `rick-morty-explorer_1.0.0_amd64.deb`
- `rick-morty-explorer_1.0.0_amd64.AppImage`

## 📋 Checklist de Release

- [ ] Actualizar versión en `package.json` y `tauri.conf.json`
- [ ] Verificar iconos en `src-tauri/icons/`
- [ ] Testear build local: `npm run package`
- [ ] Verificar funcionalidad de la app
- [ ] Documentar cambios en changelog
- [ ] Crear builds para todas las plataformas
- [ ] Testear instalación en diferentes sistemas
- [ ] Crear release en GitHub con binarios