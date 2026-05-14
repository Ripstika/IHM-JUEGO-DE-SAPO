// ==========================================
// ARCHIVO: types.ts
// PROPÓSITO: Definir los tipos e interfaces utilizados en la aplicación
// DESCRIPCIÓN: Contiene las interfaces Player, Team y Score
// ==========================================

/**
 * Interfaz Player
 * Representa a un jugador individual
 */
export interface Player {
  name: string; // Nombre del jugador
}

/**
 * Interfaz Team
 * Representa a un equipo completo
 */
export interface Team {
  id: string;           // Identificador único del equipo
  name: string;         // Nombre del equipo
  players: Player[];    // Array de jugadores del equipo
}

/**
 * Interfaz Score
 * Representa el puntaje de un equipo en una ronda específica
 */
export interface Score {
  teamId: string;  // ID del equipo
  round: number;   // Número de la ronda (1, 2, 3, etc.)
  points: number;  // Puntos obtenidos en esa ronda
}