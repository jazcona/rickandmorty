# 🤖 Automatización con GitHub Actions

Este proyecto utiliza GitHub Actions para automatizar el proceso de construcción y distribución multiplataforma.

## 🚀 Workflows Disponibles

### 1. **Release Workflow** (`release.yml`)
- **Trigger**: Cuando se crea un tag con formato `v*` (ej: `v1.0.0`)
- **Plataformas**: Linux, Windows, macOS (Intel + Apple Silicon)
- **Artefactos generados**:
  - Linux: `.deb` y `.AppImage`
  - Windows: `.exe` (NSIS) y `.msi`
  - macOS: `.dmg` y `.app`

### 2. **Test Workflow** (`test.yml`)
- **Trigger**: Push a `main`/`develop` y Pull Requests
- **Funciones**:
  - Testeo del frontend
  - Verificación del build de Tauri
  - Generación de artefactos de desarrollo

## 📦 Crear un Release

### Opción 1: Usando Git Tags
```bash
# Actualizar versión en package.json y tauri.conf.json
git add .
git commit -m "chore: prepare release v1.0.1"
git tag v1.0.1
git push origin main --tags
```

### Opción 2: Desde GitHub UI
1. Ve a tu repositorio en GitHub
2. Click en "Actions"
3. Selecciona "🚀 Release Rick & Morty Explorer"
4. Click "Run workflow"
5. Especifica la versión (ej: `v1.0.1`)

## 🔄 Flujo de Trabajo Completo

1. **Desarrollo**: Push a `main` → Ejecuta tests automáticamente
2. **Release**: Crear tag → Compila para todas las plataformas
3. **Distribución**: Se crea automáticamente un GitHub Release con todos los binarios

## 📋 Prerequisitos

Para que funcione correctamente, asegúrate de:

- [ ] Repositorio público o GitHub Pro (para Actions)
- [ ] Permisos de escritura en el repositorio
- [ ] Token `GITHUB_TOKEN` (se genera automáticamente)

## 🎯 Formatos de Salida por Plataforma

| OS | Extensión | Descripción | Recomendado |
|---|---|---|---|
| **Linux** | `.deb` | Paquete Debian/Ubuntu | ✅ Para distribuciones Debian |
| **Linux** | `.AppImage` | Ejecutable portable | ✅ Para otras distros |
| **Windows** | `.exe` | Instalador NSIS | ✅ Más común |
| **Windows** | `.msi` | Instalador Windows | Para empresas |
| **macOS** | `.dmg` | Imagen de disco | ✅ Más común |
| **macOS** | `.app` | Bundle de aplicación | Para desarrollo |

## ⚙️ Configuración Avanzada

### Variables de Entorno
- `CARGO_INCREMENTAL=0`: Mejora la reproducibilidad
- `RUST_BACKTRACE=short`: Mejores logs de error

### Caché
- **Node modules**: Automático con `actions/setup-node`
- **Rust dependencies**: Usando `swatinem/rust-cache`
- **Tauri build**: Incremental por plataforma

### Customización
Para modificar el workflow:

1. **Cambiar plataformas**: Edita la matriz en `release.yml`
2. **Añadir tests**: Modifica `test.yml`
3. **Personalizar release notes**: Edita la sección `releaseBody`

## 🚨 Troubleshooting

### Error: "No space left on device"
```yaml
- name: 🧹 Free up space
  run: |
    sudo rm -rf /usr/share/dotnet
    sudo rm -rf /opt/ghc
```

### Error en macOS Code Signing
- Añadir certificados en GitHub Secrets
- Configurar `APPLE_CERTIFICATE`, `APPLE_CERTIFICATE_PASSWORD`

### Error en dependencias Linux
```yaml
- name: 📋 Install additional dependencies
  run: |
    sudo apt-get install -y libasound2-dev
```

## 📈 Monitoreo

- **Status**: Visible en la pestaña "Actions"
- **Artefactos**: Disponibles por 90 días por defecto
- **Releases**: Permanentes en la sección "Releases"

## 🎉 Próximos Pasos

1. Sube tu código a GitHub
2. Crea tu primer tag: `git tag v1.0.0 && git push --tags`
3. ¡Observa cómo se construye automáticamente para todas las plataformas!

Los binarios estarán disponibles en la sección "Releases" de tu repositorio.