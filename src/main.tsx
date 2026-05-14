// ==========================================
// ARCHIVO: main.tsx
// PROPÓSITO: Punto de entrada de la aplicación React
// DESCRIPCIÓN: Este archivo es responsable de inicializar la aplicación React
//              y montarla en el DOM
// ==========================================

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App.tsx'
// Importar el archivo CSS principal que contiene los estilos globales
import './styles/index.css'

// Crear la raíz de React en el elemento HTML con id 'root'
// El signo ! indica que el elemento existe con certeza (non-null assertion)
ReactDOM.createRoot(document.getElementById('root')!).render(
  // React.StrictMode detecta problemas potenciales en la aplicación durante el desarrollo
  <React.StrictMode>
    {/* Componente principal de la aplicación */}
    <App />
  </React.StrictMode>,
)