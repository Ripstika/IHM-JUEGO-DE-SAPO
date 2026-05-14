// ==========================================
// ARCHIVO: ImageWithFallback.tsx
// PROPÓSITO: Componente para mostrar imágenes con manejo de errores
// DESCRIPCIÓN: Componente que muestra una imagen y si falla,
//              muestra una imagen de error en su lugar
// ==========================================

import React, { useState } from 'react'

// SVG en base64 que se muestra como imagen de error/fallback
// Este SVG es una imagen genérica de error (icono de imagen rota)
const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

/**
 * Componente ImageWithFallback
 * Renderiza una imagen HTML con manejo automático de errores
 * 
 * @param props - Props estándar de una etiqueta <img> de HTML
 * @returns Una imagen o un placeholder de error si falla la carga
 */
export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  // Estado para rastrear si la imagen falló al cargar
  const [didError, setDidError] = useState(false)

  /**
   * handleError
   * Se ejecuta cuando la imagen falla al cargar
   * Actualiza el estado para mostrar la imagen de error
   */
  const handleError = () => {
    setDidError(true)
  }

  // Desestructurar las props separando las conocidas del resto
  const { src, alt, style, className, ...rest } = props

  // Si hubo error, mostrar el placeholder de error
  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          {/* Mostrar la imagen SVG de error y guardar la URL original para referencia */}
          <img 
            src={ERROR_IMG_SRC} 
            alt="Error loading image" 
            {...rest} 
            data-original-url={src} 
          />
        </div>
      </div>
    )
  }

  // Si no hay error, mostrar la imagen normal
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      style={style} 
      {...rest} 
      onError={handleError} // Manejar errores de carga
    />
  )
}
