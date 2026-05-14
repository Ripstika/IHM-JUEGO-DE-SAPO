// ==========================================
// ARCHIVO: postcss.config.mjs
// PROPÓSITO: Configuración de PostCSS para procesamiento de estilos
// DESCRIPCIÓN: Define los plugins de PostCSS

// NOTA IMPORTANTE: Tailwind CSS v4 (mediante @tailwindcss/vite) 
// configura automáticamente todos los plugins de PostCSS requeridos
// NO necesitas incluir 'tailwindcss' o 'autoprefixer' aquí.

// Este archivo existe principalmente para agregar plugins de PostCSS adicionales si es necesario.
// Por ejemplo, para agregar un plugin anidado:
// 
// import postcssNested from 'postcss-nested'
// export default { plugins: [postcssNested()] }
//
// Si no necesitas plugins adicionales, puedes dejar este archivo vacío como está ahora.
// ==========================================

// Exportar un objeto vacío porque todos los plugins necesarios se configuran automáticamente
export default {}
