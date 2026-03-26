# Manual de Usuario - Sistema de Gestión de Partidas del Juego de Sapo

## Descripción
Sistema web funcional para gestionar partidas del juego tradicional de Sapo durante eventos universitarios como Recreate U y las Fiestas Marianas.

## Paleta de Colores
- **Verde** (#059669, #047857, #065f46): Elementos principales, botones y acentos
- **Dorado** (#D97706, #F59E0B, #FBBF24): Elementos destacados, trofeos y ganadores
- **Blanco** (#FFFFFF): Fondos y contenido
- **Negro** (#000000, #1F2937, #111827): Textos y navegación

## Pantallas del Sistema

### 1️ Menú Principal
**Función:** Punto de partida del sistema con acceso a todas las funcionalidades.

**Características:**
- 6 opciones principales en formato de tarjetas interactivas
- Diseño limpio y profesional con iconos descriptivos
- Código de colores: verde para funciones operativas, dorado para gestión de datos

**Opciones disponibles:**
1. Definir Rondas (verde)
2. Registrar Equipo (verde)
3. Cargar Equipos (dorado)
4. Registrar Puntajes (verde)
5. Mostrar Puntajes (verde)
6. Generar Reporte (dorado)

---

### Definir Rondas
**Función:** Configurar el número de rondas de la partida.

**Cómo usar:**
1. Ingresa un número entre 1 y 20 en el campo
2. La configuración actual se muestra en un recuadro verde
3. Presiona "Guardar Configuración"
4. Recibirás una confirmación visual

**Validaciones:**
- Sólo acepta números entre 1 y 20
- Configuración predeterminada: 5 rondas

---

### Registrar Equipo
**Función:** Crear nuevos equipos participantes.

**Cómo usar:**
1. Ingresa el nombre del equipo (requerido)
2. Ingresa el nombre de al menos 1 jugador (máximo 5)
3. Presiona "Guardar Equipo" o "Limpiar" para reiniciar

**Características:**
- Hasta 5 jugadores por equipo
- Mínimo 1 jugador requerido
- Los equipos se guardan automáticamente

**Validaciones:**
- Nombre de equipo obligatorio
- Al menos un jugador obligatorio

---

### Cargar Equipos
**Función:** Seleccionar equipos previamente guardados para la partida actual.

**Cómo usar:**
1. Marca las casillas de los equipos que deseas cargar
2. El contador muestra cuántos equipos has seleccionado
3. Presiona "Cargar Equipos Seleccionados"

**Características:**
- Vista de todos los equipos guardados
- Información completa de jugadores
- Selección múltiple con checkboxes
- Feedback visual al seleccionar (fondo verde)

**Equipos precargados:**
- Los Campeones (5 jugadores)
- Equipo A (3 jugadores)
- Los Tigres (5 jugadores)

---

### Registrar Puntajes
**Función:** Ingresar los puntajes obtenidos por cada equipo en cada ronda.

**Cómo usar:**
1. Selecciona un equipo del menú desplegable
2. Selecciona la ronda correspondiente
3. Ingresa el puntaje obtenido
4. Presiona "Guardar Puntaje"

**Características:**
- Selectores dinámicos basados en equipos y rondas configuradas
- Permite actualizar puntajes existentes
- Validación en tiempo real
- Mensaje de confirmación al guardar

**Validaciones:**
- Todos los campos son obligatorios
- Puntaje debe ser numérico

---

### Mostrar Puntajes
**Función:** Visualizar tabla completa de puntajes por ronda y totales.

**Características:**
- Tabla completa con todos los equipos y rondas
- Columnas por cada ronda (R1, R2, R3, etc.)
- Columna de totales
- Ordenamiento automático por puntaje total

**Destacados especiales:**
- El equipo líder aparece con fondo dorado
- Ícono de trofeo junto al primer lugar
- Recuadro especial mostrando el equipo líder y su puntaje

**Información mostrada:**
- Posición (#)
- Nombre del equipo
- Puntaje por cada ronda
- Puntaje total (en verde)

---

### Generar Reporte
**Función:** Crear reporte final completo de la partida con toda la información.

**Secciones del reporte:**

1. **Encabezado:**
   - Título del reporte
   - Fecha y hora de generación

2. **Equipo Ganador:**
   - Destacado con fondo dorado y borde especial
   - Trofeo grande
   - Nombre del equipo
   - Puntaje total
   - Lista de integrantes

3. **Estadísticas Generales:**
   - Rondas jugadas (azul)
   - Equipos participantes (morado)
   - Total de jugadores (verde)

4. **Resultados Detallados:**
   - Todos los equipos ordenados por posición
   - Información completa de cada equipo
   - Lista de jugadores
   - Puntajes por ronda
   - Puntaje total

5. **Pie de página:**
   - Información de la universidad
   - Nombre del evento

**Funciones adicionales:**
- Botón "Imprimir Reporte" (activa función de impresión del navegador)
- Botón "Volver al Menú"

---

## Flujo de Trabajo Recomendado

### Inicio de una nueva partida:
1. **Definir Rondas** → Establece cuántas rondas se jugarán
2. **Registrar Equipo** o **Cargar Equipos** → Configura los participantes
3. **Registrar Puntajes** → Ingresa resultados después de cada ronda
4. **Mostrar Puntajes** → Consulta resultados en tiempo real
5. **Generar Reporte** → Crea el documento final

### Durante la partida:
- Usa **Registrar Puntajes** después de cada ronda
- Consulta **Mostrar Puntajes** para ver posiciones actuales
- El sistema actualiza automáticamente los rankings

### Al finalizar:
- Genera el **Reporte Final**
- Imprime o guarda el reporte para los registros del evento

---

## ✨ Características Destacadas

### Funcionalidad Completa:
✅ Gestión de equipos (crear, guardar, cargar)  
✅ Configuración de rondas  
✅ Registro de puntajes por equipo y ronda  
✅ Cálculo automático de totales  
✅ Ordenamiento automático por puntuación  
✅ Generación de reportes completos  
✅ Función de impresión  

### Experiencia de Usuario:
✅ Navegación intuitiva  
✅ Mensajes de confirmación visuales  
✅ Validación de formularios  
✅ Diseño responsive  
✅ Feedback visual en tiempo real  
✅ Botones deshabilitados cuando no aplican  

### Diseño Visual:
✅ Paleta de colores verde, blanco, negro y dorado  
✅ Iconografía clara y descriptiva  
✅ Tarjetas interactivas con efectos hover  
✅ Destacados especiales para ganadores  
✅ Gradientes y sombras profesionales  

---

## Tecnologías Utilizadas

- **React** con TypeScript
- **Tailwind CSS** v4 para estilos
- **Lucide React** para iconos
- **Componentes UI** personalizados

---

## Notas Importantes

1. **Persistencia de datos:** Actualmente los datos se mantienen en la sesión. Al recargar la página, se perderán los equipos y puntajes registrados durante esa sesión.

2. **Equipos precargados:** El sistema incluye 3 equipos de ejemplo que siempre estarán disponibles en "Cargar Equipos".

3. **Límites del sistema:**
   - Máximo 20 rondas por partida
   - Máximo 5 jugadores por equipo
   - Mínimo 1 jugador por equipo

4. **Impresión:** El reporte está optimizado para impresión. Al usar la función "Imprimir Reporte", el navegador ocultará automáticamente elementos no necesarios.

---

## Uso en Eventos Universitarios

Este sistema está diseñado específicamente para:
- **Recreate U**: Evento recreativo universitario
- **Fiestas Marianas**: Celebraciones de la Universidad Mariana

**Beneficios:**
- Gestión profesional de torneos
- Resultados en tiempo real
- Reportes oficiales impresos
- Experiencia organizada para participantes
- Registro histórico de eventos

---

## Soporte

Para soporte técnico o consultas sobre el sistema, contacta al administrador del evento.

---

**Sistema de Gestión de Partidas - Juego de Sapo**  
*Universidad Mariana - Pasto, Colombia*  
*Versión 1.0 - 2026*
*Desarrollado por © 2026 David Ssantiago Rosales Solarte. Reservados todos los derechos.*
