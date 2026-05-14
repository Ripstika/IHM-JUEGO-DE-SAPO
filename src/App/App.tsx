// ==========================================
// ARCHIVO: App.tsx
// PROPÓSITO: Componente principal de la aplicación
// DESCRIPCIÓN: Aplicación completa para gestionar partidas del "Juego de Sapo"
//              Permite crear equipos, registrar puntajes, y generar reportes
// ==========================================

// ========== IMPORTACIONES ==========
import { CheckCircle2 } from "lucide-react";

// Importar componentes personalizados
import Menu from "./components/Menu";
import RoundsConfig from "./components/RoundsConfig";
import TeamRegistration from "./components/TeamRegistration";
import LoadTeams from "./components/LoadTeams";
import ScoreRegistration from "./components/ScoreRegistration";
import ScoreDisplay from "./components/ScoreDisplay";
import Report from "./components/Report";

// Importar hook personalizado
import { useGameState } from "./useGameState";

// ========== COMPONENTE PRINCIPAL ==========

/**
 * Componente App
 * Componente raíz de la aplicación que gestiona toda la lógica y pantallas
 */
export default function App() {
  // Usar el hook personalizado para manejar el estado
  const {
    currentScreen,
    setCurrentScreen,
    numRounds,
    teams,
    roundsInput,
    setRoundsInput,
    teamName,
    setTeamName,
    playerNames,
    setPlayerNames,
    selectedTeamsToLoad,
    handleToggleTeamSelection,
    selectedTeam,
    setSelectedTeam,
    selectedRound,
    setSelectedRound,
    pointsInput,
    setPointsInput,
    showSuccess,
    rankedTeams,
    winner,
    handleSaveRounds,
    handleSaveTeam,
    handleClearTeamForm,
    handleLoadTeams,
    handleSaveScore,
    savedTeams,
  } = useGameState();

  // ========== RENDER/JSX ==========

  return (
    // Contenedor principal con fondo negro
    <div className="min-h-screen bg-black">
      {/* ========== MENSAJE DE ÉXITO FLOTANTE ========== */}
      {/* Este mensaje aparece en la esquina superior derecha cuando se guarda algo */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6" />
          <span className="font-medium">¡Guardado exitosamente!</span>
        </div>
      )}

      {/* ========== CONTENIDO PRINCIPAL ========== */}
      <div className="max-w-7xl mx-auto px-6 py-8 min-h-screen">
        {/* ========== PANTALLA 1: MENÚ PRINCIPAL ========== */}
        {currentScreen === "menu" && <Menu setCurrentScreen={setCurrentScreen} />}

        {/* ========== PANTALLA 2: DEFINIR RONDAS ========== */}
        {currentScreen === "rounds" && (
          <RoundsConfig
            setCurrentScreen={setCurrentScreen}
            numRounds={numRounds}
            roundsInput={roundsInput}
            setRoundsInput={setRoundsInput}
            handleSaveRounds={handleSaveRounds}
          />
        )}

        {/* ========== PANTALLA 3: REGISTRAR EQUIPO ========== */}
        {currentScreen === "register" && (
          <TeamRegistration
            setCurrentScreen={setCurrentScreen}
            teamName={teamName}
            setTeamName={setTeamName}
            playerNames={playerNames}
            setPlayerNames={setPlayerNames}
            handleSaveTeam={handleSaveTeam}
            handleClearTeamForm={handleClearTeamForm}
          />
        )}

        {/* ========== PANTALLA 4: CARGAR EQUIPOS ========== */}
        {currentScreen === "load" && (
          <LoadTeams
            setCurrentScreen={setCurrentScreen}
            savedTeams={savedTeams}
            selectedTeamsToLoad={selectedTeamsToLoad}
            handleToggleTeamSelection={handleToggleTeamSelection}
            handleLoadTeams={handleLoadTeams}
          />
        )}

        {/* ========== PANTALLA 5: REGISTRAR PUNTAJES ========== */}
        {currentScreen === "scores" && (
          <ScoreRegistration
            setCurrentScreen={setCurrentScreen}
            teams={teams}
            numRounds={numRounds}
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
            selectedRound={selectedRound}
            setSelectedRound={setSelectedRound}
            pointsInput={pointsInput}
            setPointsInput={setPointsInput}
            handleSaveScore={handleSaveScore}
          />
        )}

        {/* ========== PANTALLA 6: MOSTRAR PUNTAJES ========== */}
        {currentScreen === "show" && (
          <ScoreDisplay
            setCurrentScreen={setCurrentScreen}
            teams={teams}
            numRounds={numRounds}
            rankedTeams={rankedTeams}
          />
        )}

        {/* ========== PANTALLA 7: GENERAR REPORTE ========== */}
        {currentScreen === "report" && (
          <Report
            setCurrentScreen={setCurrentScreen}
            teams={teams}
            numRounds={numRounds}
            rankedTeams={rankedTeams}
            winner={winner}
          />
        )}
      </div>
    </div>
  );
}