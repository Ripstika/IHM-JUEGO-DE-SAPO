// ==========================================
// ARCHIVO: useGameState.ts
// PROPÓSITO: Hook personalizado para manejar el estado del juego
// DESCRIPCIÓN: Contiene todos los estados y funciones manejadoras
// ==========================================

import { useState } from "react";
import { Team, Score } from "./types";

export function useGameState() {
  // ========== ESTADOS PRINCIPALES ==========

  // Estado que controla qué pantalla se está mostrando (menú, rondas, equipos, etc.)
  const [currentScreen, setCurrentScreen] = useState("menu");

  // Estado que almacena el número de rondas configuradas para la partida
  const [numRounds, setNumRounds] = useState(5);

  // Estado que almacena los teams cargados/registrados actualmente en la partida
  const [teams, setTeams] = useState<Team[]>([]);

  // Estado que almacena todos los puntajes registrados
  const [scores, setScores] = useState<Score[]>([]);

  // Estado que almacena los equipos guardados (historial/base de datos)
  // Estos son equipos que se pueden cargar en futuras partidas
  const [savedTeams, setSavedTeams] = useState<Team[]>([
    {
      id: "1",
      name: "Los Campeones",
      players: [
        { name: "Juan" },
        { name: "María" },
        { name: "Carlos" },
        { name: "Ana" },
        { name: "Luis" },
      ],
    },
    {
      id: "2",
      name: "Equipo A",
      players: [{ name: "Pedro" }, { name: "Sofía" }, { name: "Diego" }],
    },
    {
      id: "3",
      name: "Los Tigres",
      players: [
        { name: "Roberto" },
        { name: "Elena" },
        { name: "Miguel" },
        { name: "Laura" },
        { name: "José" },
      ],
    },
  ]);

  // ========== ESTADOS DEL FORMULARIO ==========
  // Estos estados almacenan los valores de los inputs de formularios

  const [roundsInput, setRoundsInput] = useState("5");                    // Valor del input de rondas
  const [teamName, setTeamName] = useState("");                           // Nombre del nuevo equipo
  const [playerNames, setPlayerNames] = useState(["", "", "", "", ""]); // Nombres de los jugadores del equipo
  const [selectedTeamsToLoad, setSelectedTeamsToLoad] = useState<string[]>([]); // IDs de equipos seleccionados para cargar
  const [selectedTeam, setSelectedTeam] = useState("");                   // ID del equipo seleccionado
  const [selectedRound, setSelectedRound] = useState("");                 // Número de ronda seleccionada
  const [pointsInput, setPointsInput] = useState("");                      // Puntos a registrar
  const [showSuccess, setShowSuccess] = useState(false);                  // Mostrar mensaje de éxito

  // ========== FUNCIONES MANEJADORAS ==========

  /**
   * handleSaveRounds
   * Guarda el número de rondas configurado por el usuario
   * Valida que el número esté entre 1 y 20
   */
  const handleSaveRounds = () => {
    const rounds = parseInt(roundsInput);
    // Validar que el número de rondas sea válido
    if (rounds >= 1 && rounds <= 20) {
      setNumRounds(rounds);  // Actualizar el estado del número de rondas
      showSuccessMessage();  // Mostrar mensaje de éxito
    }
  };

  /**
   * handleSaveTeam
   * Crea un nuevo equipo con los datos ingresados y lo guarda
   * Filtra jugadores vacíos antes de guardar
   */
  const handleSaveTeam = () => {
    // Validar que el nombre del equipo no esté vacío
    if (!teamName.trim()) return;

    // Filtrar solo los nombres de jugadores que no estén vacíos y hacer trim
    const players = playerNames
      .filter((name) => name.trim() !== "")
      .map((name) => ({ name: name.trim() }));

    // Validar que haya al menos un jugador
    if (players.length === 0) return;

    // Crear el objeto del nuevo equipo
    const newTeam: Team = {
      id: Date.now().toString(),  // Usar timestamp como ID único
      name: teamName.trim(),
      players,
    };

    // Agregar el equipo a la lista de equipos actuales y guardados
    setTeams([...teams, newTeam]);
    setSavedTeams([...savedTeams, newTeam]);

    // Limpiar los campos del formulario
    setTeamName("");
    setPlayerNames(["", "", "", "", ""]);
    showSuccessMessage();
  };

  /**
   * handleClearTeamForm
   * Limpia los campos del formulario de registro de equipos
   */
  const handleClearTeamForm = () => {
    setTeamName("");
    setPlayerNames(["", "", "", "", ""]);
  };

  /**
   * handleLoadTeams
   * Carga los equipos seleccionados del historial a la partida actual
   * Evita duplicados comparando IDs
   */
  const handleLoadTeams = () => {
    // Filtrar los equipos guardados que fueron seleccionados
    const teamsToLoad = savedTeams.filter((team) =>
      selectedTeamsToLoad.includes(team.id)
    );

    // Copiar la lista actual de equipos
    const newTeams = [...teams];

    // Agregar solo los equipos que no existen ya en la lista actual
    teamsToLoad.forEach((team) => {
      if (!newTeams.find((t) => t.id === team.id)) {
        newTeams.push(team);
      }
    });

    // Actualizar el estado
    setTeams(newTeams);
    setSelectedTeamsToLoad([]);
    showSuccessMessage();
  };

  /**
   * handleToggleTeamSelection
   * Alterna la selección de un equipo en la lista de carga
   */
  const handleToggleTeamSelection = (teamId: string) => {
    setSelectedTeamsToLoad((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)  // Si está seleccionado, quitarlo
        : [...prev, teamId]                    // Si no está, agregarlo
    );
  };

  /**
   * handleSaveScore
   * Registra el puntaje de un equipo en una ronda específica
   * Reemplaza puntajes existentes de la misma ronda
   */
  const handleSaveScore = () => {
    // Validar que todos los campos requeridos estén llenos
    if (!selectedTeam || !selectedRound || !pointsInput) return;

    const points = parseInt(pointsInput);
    if (isNaN(points)) return;

    // Crear una nueva lista de puntajes sin el que vamos a reemplazar
    const newScores = scores.filter(
      (s) => !(s.teamId === selectedTeam && s.round === parseInt(selectedRound))
    );

    // Agregar el nuevo puntaje
    newScores.push({
      teamId: selectedTeam,
      round: parseInt(selectedRound),
      points,
    });

    setScores(newScores);
    setPointsInput("");
    showSuccessMessage();
  };

  /**
   * showSuccessMessage
   * Muestra un mensaje de éxito durante 2 segundos
   */
  const showSuccessMessage = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // ========== FUNCIONES DE CÁLCULO ==========

  /**
   * getTeamScores
   * Obtiene un array con los puntajes de un equipo en todas las rondas
   * Devuelve 0 si no hay puntaje registrado para una ronda
   */
  const getTeamScores = (teamId: string) => {
    const teamScores: number[] = [];
    // Iterar sobre todas las rondas
    for (let i = 1; i <= numRounds; i++) {
      // Buscar el puntaje del equipo en esta ronda
      const score = scores.find((s) => s.teamId === teamId && s.round === i);
      // Agregar el puntaje o 0 si no existe
      teamScores.push(score ? score.points : 0);
    }
    return teamScores;
  };

  /**
   * getTeamTotal
   * Calcula el puntaje total de un equipo sumando todos sus puntajes
   */
  const getTeamTotal = (teamId: string) => {
    return getTeamScores(teamId).reduce((sum, score) => sum + score, 0);
  };

  /**
   * getTeamsWithTotals
   * Obtiene todos los equipos con sus puntajes totales y detalles
   * Los ordena de mayor a menor puntaje
   */
  const getTeamsWithTotals = () => {
    return teams
      .map((team) => ({
        ...team,
        total: getTeamTotal(team.id),
        scores: getTeamScores(team.id),
      }))
      .sort((a, b) => b.total - a.total);  // Ordenar descendente por puntaje total
  };

  // Obtener equipos ordenados con ranking
  const rankedTeams = getTeamsWithTotals().map((team, index) => ({
    ...team,
    rank: index + 1,  // Agregar el ranking (1º, 2º, 3º, etc.)
  }));

  // Obtener el equipo ganador (el primero cuando está ordenado)
  const winner = rankedTeams[0];

  return {
    // Estados
    currentScreen,
    setCurrentScreen,
    numRounds,
    teams,
    scores,
    savedTeams,
    roundsInput,
    setRoundsInput,
    teamName,
    setTeamName,
    playerNames,
    setPlayerNames,
    selectedTeamsToLoad,
    setSelectedTeamsToLoad,
    selectedTeam,
    setSelectedTeam,
    selectedRound,
    setSelectedRound,
    pointsInput,
    setPointsInput,
    showSuccess,
    rankedTeams,
    winner,
    // Funciones
    handleSaveRounds,
    handleSaveTeam,
    handleClearTeamForm,
    handleLoadTeams,
    handleToggleTeamSelection,
    handleSaveScore,
    showSuccessMessage,
  };
}