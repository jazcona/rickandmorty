#!/bin/bash

# 🚀 Script de Release Automático para Rick & Morty Explorer
# Facilita la creación de nuevos releases con GitHub Actions

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Función para imprimir con colores
print_color() {
    echo -e "${1}${2}${NC}"
}

print_header() {
    print_color $PURPLE "🛸 Rick & Morty Explorer - Release Manager"
    print_color $PURPLE "=========================================="
}

print_step() {
    print_color $BLUE "📋 $1"
}

print_success() {
    print_color $GREEN "✅ $1"
}

print_warning() {
    print_color $YELLOW "⚠️  $1"
}

print_error() {
    print_color $RED "❌ $1"
}

# Verificar que estamos en el directorio correcto
check_project() {
    if [[ ! -f "package.json" ]] || [[ ! -f "src-tauri/tauri.conf.json" ]]; then
        print_error "Este script debe ejecutarse desde la raíz del proyecto Rick & Morty Explorer"
        exit 1
    fi
}

# Obtener versión actual
get_current_version() {
    local version=$(grep '"version"' package.json | head -1 | sed 's/.*"version": "\(.*\)".*/\1/')
    echo $version
}

# Incrementar versión
increment_version() {
    local version=$1
    local type=$2
    
    IFS='.' read -r -a parts <<< "$version"
    major=${parts[0]}
    minor=${parts[1]}
    patch=${parts[2]}
    
    case $type in
        "major")
            ((major++))
            minor=0
            patch=0
            ;;
        "minor")
            ((minor++))
            patch=0
            ;;
        "patch"|*)
            ((patch++))
            ;;
    esac
    
    echo "$major.$minor.$patch"
}

# Actualizar versiones en archivos
update_versions() {
    local new_version=$1
    
    print_step "Actualizando versión a $new_version..."
    
    # Actualizar package.json
    sed -i "s/\"version\": \".*\"/\"version\": \"$new_version\"/" package.json
    
    # Actualizar tauri.conf.json
    sed -i "s/\"version\": \".*\"/\"version\": \"$new_version\"/" src-tauri/tauri.conf.json
    
    print_success "Versiones actualizadas en package.json y tauri.conf.json"
}

# Verificar que el repositorio esté limpio
check_git_status() {
    if [[ -n $(git status --porcelain) ]]; then
        print_warning "Hay cambios sin commitear. ¿Continuar? (y/N)"
        read -r response
        if [[ ! "$response" =~ ^[Yy]$ ]]; then
            print_error "Operación cancelada"
            exit 1
        fi
    fi
}

# Crear commit y tag
create_release() {
    local version=$1
    local tag="v$version"
    
    print_step "Creando commit de release..."
    git add package.json src-tauri/tauri.conf.json
    git commit -m "chore(release): prepare for $tag"
    
    print_step "Creando tag $tag..."
    git tag -a "$tag" -m "Release $tag

🛸 Rick & Morty Explorer $tag

Nuevo release con builds automáticos para todas las plataformas:
- Linux (.deb, .AppImage)
- Windows (.exe, .msi)
- macOS (.dmg, .app) - Intel + Apple Silicon

Generado automáticamente con GitHub Actions."
    
    print_success "Tag $tag creado exitosamente"
}

# Push changes
push_release() {
    local tag=$1
    
    print_step "Subiendo cambios a GitHub..."
    git push origin main
    git push origin "$tag"
    
    print_success "Release enviado a GitHub"
    print_success "GitHub Actions comenzará automáticamente el build multiplataforma"
}

# Menú principal
main_menu() {
    print_header
    
    local current_version=$(get_current_version)
    print_step "Versión actual: $current_version"
    echo
    
    echo "Selecciona el tipo de release:"
    echo "1) 🐛 Patch ($current_version -> $(increment_version $current_version patch))"
    echo "2) ✨ Minor ($current_version -> $(increment_version $current_version minor))"
    echo "3) 🚀 Major ($current_version -> $(increment_version $current_version major))"
    echo "4) 📝 Custom version"
    echo "5) 🚫 Cancelar"
    echo
    
    read -p "Opción (1-5): " choice
    
    case $choice in
        1)
            release_type="patch"
            new_version=$(increment_version $current_version patch)
            ;;
        2)
            release_type="minor"
            new_version=$(increment_version $current_version minor)
            ;;
        3)
            release_type="major"
            new_version=$(increment_version $current_version major)
            ;;
        4)
            echo
            read -p "Introduce la nueva versión (formato: x.y.z): " new_version
            if [[ ! $new_version =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
                print_error "Formato de versión inválido"
                exit 1
            fi
            release_type="custom"
            ;;
        5)
            print_warning "Operación cancelada"
            exit 0
            ;;
        *)
            print_error "Opción inválida"
            exit 1
            ;;
    esac
}

# Confirmar release
confirm_release() {
    local version=$1
    local type=$2
    
    echo
    print_warning "🎯 CONFIRMACIÓN DE RELEASE"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📦 Nueva versión: v$version ($type)"
    echo "🏷️  Tag: v$version"
    echo "🤖 Acción: GitHub Actions compilará automáticamente para:"
    echo "   • Linux (deb, AppImage)"
    echo "   • Windows (exe, msi)"
    echo "   • macOS (dmg, app) - Intel + Apple Silicon"
    echo
    
    read -p "¿Proceder con el release? (y/N): " confirm
    if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
        print_warning "Release cancelado"
        exit 0
    fi
}

# Función principal
main() {
    check_project
    check_git_status
    main_menu
    confirm_release $new_version $release_type
    
    echo
    print_step "Iniciando proceso de release..."
    
    update_versions $new_version
    create_release $new_version
    push_release "v$new_version"
    
    echo
    print_success "🎉 Release v$new_version creado exitosamente!"
    echo
    print_color $PURPLE "🔗 Monitorea el progreso en:"
    print_color $BLUE "   https://github.com/jazcona/rickandmorty/actions"
    echo
    print_color $PURPLE "📦 Los binarios estarán disponibles en:"
    print_color $BLUE "   https://github.com/jazcona/rickandmorty/releases"
    echo
    print_color $YELLOW "⏱️  El build completo toma ~15-20 minutos"
}

# Ejecutar si es llamado directamente
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi