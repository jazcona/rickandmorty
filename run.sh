#!/bin/bash

# Script para ejecutar la aplicación Rick & Morty Explorer
# Asegúrate de tener todas las dependencias instaladas

cd "$(dirname "$0")"

echo "🛸 Iniciando Rick & Morty Explorer..."

# Verificar si node está disponible
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js primero."
    exit 1
fi

# Verificar si rust está disponible
if ! command -v cargo &> /dev/null; then
    echo "❌ Rust no está instalado. Por favor instala Rust primero."
    exit 1
fi

# Instalar dependencias si es necesario
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias de Node.js..."
    npm install
fi

# Ejecutar la aplicación
echo "🚀 Ejecutando la aplicación..."
npm run dev