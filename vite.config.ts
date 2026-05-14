// ==========================================
// ARCHIVO: vite.config.ts
// PROPÓSITO: Configuración de la herramienta de construcción Vite
// DESCRIPCIÓN: Define la configuración de compilación, plugins y alias
// ==========================================

import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Exportar la configuración por defecto para Vite
export default defineConfig({
  // ========== PLUGINS ==========
  plugins: [
    // El plugin de React permite el Hot Module Replacement (HMR) para desarrollo rápido
    react(),
    // El plugin de Tailwind CSS v4 procesa las clases de Tailwind automáticamente
    // Nota: Ambos plugins son requeridos incluso si Tailwind no se usa activamente
    tailwindcss(),
  ],

  // ========== RESOLUCIÓN DE MÓDULOS ==========
  resolve: {
    alias: {
      // Crear un alias '@' que apunta al directorio 'src'
      // Esto permite importar archivos usando @/path/to/file en lugar de ../../../path/to/file
      '@': path.resolve(__dirname, './src'),
    },
  },

  // ========== TIPOS DE ARCHIVO ADICIONALES ==========
  // Definir tipos de archivo que pueden importarse como recursos
  // Nota: No incluir .css, .tsx, o .ts - estos son procesados de forma especial
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
