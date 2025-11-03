# Dependencias del Sistema para GitHub Actions

Esta documentación lista las dependencias requeridas para compilar la aplicación en diferentes sistemas operativos dentro de GitHub Actions.

## 🐧 Linux (Ubuntu 22.04)

### WebKit y GTK
```bash
sudo apt-get update
sudo apt-get install -y \
  libwebkit2gtk-4.1-dev \
  libgtk-3-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev
```

### Herramientas de Build
```bash
sudo apt-get install -y \
  patchelf \
  libssl-dev \
  pkg-config \
  build-essential
```

### Opcional (Para funcionalidades adicionales)
```bash
sudo apt-get install -y \
  libasound2-dev \
  libxdo-dev \
  libxrandr-dev \
  libxss-dev \
  libgconf-2-4
```

## 🪟 Windows (windows-latest)

### Herramientas Automáticas
- Visual Studio Build Tools (incluido en runner)
- Windows SDK (incluido en runner)
- Rust MSVC toolchain

### Dependencias Adicionales (si son necesarias)
```powershell
# WebView2 Runtime (usualmente incluido)
# choco install webview2

# Visual C++ Redistributable (incluido en runner)
# choco install vcredist140
```

## 🍎 macOS (macos-latest)

### Herramientas de Sistema
- Xcode Command Line Tools (incluido en runner)
- macOS SDK (incluido en runner)

### Dependencias Adicionales (si son necesarias)
```bash
# Homebrew packages (raramente necesario)
# brew install pkg-config
```

## 🔧 Troubleshooting por Plataforma

### Linux - Errores Comunes

**Error: `webkit2gtk-4.1 not found`**
```yaml
- name: Install WebKit
  run: |
    sudo apt-get update
    sudo apt-get install -y libwebkit2gtk-4.1-dev
```

**Error: `Package 'libappindicator3-0.1' not found`**
```yaml
- name: Install App Indicator
  run: |
    sudo apt-get install -y libayatana-appindicator3-dev
```

**Error: `No package 'librsvg-2.0' found`**
```yaml
- name: Install SVG support
  run: |
    sudo apt-get install -y librsvg2-dev
```

### Windows - Errores Comunes

**Error: `MSVC not found`**
- Ya incluido en `windows-latest` runner
- Verificar que `x86_64-pc-windows-msvc` target esté instalado

**Error: `WebView2 not found`**
- Incluido por defecto en Windows runners modernos
- Tauri maneja la distribución automáticamente

### macOS - Errores Comunes

**Error: `Command line tools not found`**
- Incluido en `macos-latest` runner
- Verificar que Xcode Command Line Tools esté instalado

**Error: `Target not supported`**
- Instalar targets: `rustup target add x86_64-apple-darwin aarch64-apple-darwin`

## 📦 Verificación de Dependencias

### Script de Verificación Linux
```bash
#!/bin/bash
echo "🔍 Verificando dependencias Linux..."

# WebKit
pkg-config --exists webkit2gtk-4.1 && echo "✅ WebKit2GTK" || echo "❌ WebKit2GTK"

# GTK
pkg-config --exists gtk+-3.0 && echo "✅ GTK3" || echo "❌ GTK3"

# App Indicator
pkg-config --exists ayatana-appindicator3-0.1 && echo "✅ AppIndicator" || echo "❌ AppIndicator"

# SVG
pkg-config --exists librsvg-2.0 && echo "✅ LibRSVG" || echo "❌ LibRSVG"

echo "🏁 Verificación completada"
```

### Integración en Workflow
```yaml
- name: 🔍 Verify system dependencies
  run: |
    pkg-config --list-all | grep -E "(webkit|gtk|rsvg|appindicator)"
    echo "✅ System dependencies verified"
```

## 🚀 Optimizaciones

### Caché de Dependencias
```yaml
- name: 📦 Cache APT packages
  uses: actions/cache@v4
  with:
    path: /var/cache/apt
    key: ${{ runner.os }}-apt-${{ hashFiles('**/apt-packages.list') }}
```

### Instalación Paralela
```yaml
- name: 📋 Install dependencies (parallel)
  run: |
    sudo apt-get update && \
    sudo apt-get install -y \
      libwebkit2gtk-4.1-dev \
      libgtk-3-dev \
      libayatana-appindicator3-dev \
      librsvg2-dev \
      patchelf \
      libssl-dev & \
    wait
```

## 📊 Tamaños de Dependencias

| Paquete | Tamaño Aprox. | Tiempo Instalación |
|---------|---------------|-------------------|
| libwebkit2gtk-4.1-dev | ~50MB | 30s |
| libgtk-3-dev | ~20MB | 15s |
| libayatana-appindicator3-dev | ~5MB | 5s |
| librsvg2-dev | ~10MB | 10s |
| patchelf | ~1MB | 2s |

**Total**: ~86MB, ~62s de instalación