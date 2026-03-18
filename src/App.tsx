import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { Checkbox } from "./components/ui/checkbox";
import {
  Trophy,
  Users,
  Target,
  BarChart3,
  FileText,
  FolderOpen,
  Settings,
  ArrowLeft,
  Save,
  Trash2,
  Download,
  CheckCircle2,
} from "lucide-react";

// Types
interface Player {
  name: string;
}

interface Team {
  id: string;
  name: string;
  players: Player[];
}

interface Score {
  teamId: string;
  round: number;
  points: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("menu");
  const [numRounds, setNumRounds] = useState(5);
  const [teams, setTeams] = useState<Team[]>([]);
  const [scores, setScores] = useState<Score[]>([]);
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

  // Form states
  const [roundsInput, setRoundsInput] = useState("5");
  const [teamName, setTeamName] = useState("");
  const [playerNames, setPlayerNames] = useState(["", "", "", "", ""]);
  const [selectedTeamsToLoad, setSelectedTeamsToLoad] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedRound, setSelectedRound] = useState("");
  const [pointsInput, setPointsInput] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Handlers
  const handleSaveRounds = () => {
    const rounds = parseInt(roundsInput);
    if (rounds >= 1 && rounds <= 20) {
      setNumRounds(rounds);
      showSuccessMessage();
    }
  };

  const handleSaveTeam = () => {
    if (!teamName.trim()) return;
    const players = playerNames
      .filter((name) => name.trim() !== "")
      .map((name) => ({ name: name.trim() }));
    if (players.length === 0) return;

    const newTeam: Team = {
      id: Date.now().toString(),
      name: teamName.trim(),
      players,
    };
    setTeams([...teams, newTeam]);
    setSavedTeams([...savedTeams, newTeam]);
    setTeamName("");
    setPlayerNames(["", "", "", "", ""]);
    showSuccessMessage();
  };

  const handleClearTeamForm = () => {
    setTeamName("");
    setPlayerNames(["", "", "", "", ""]);
  };

  const handleLoadTeams = () => {
    const teamsToLoad = savedTeams.filter((team) =>
      selectedTeamsToLoad.includes(team.id)
    );
    const newTeams = [...teams];
    teamsToLoad.forEach((team) => {
      if (!newTeams.find((t) => t.id === team.id)) {
        newTeams.push(team);
      }
    });
    setTeams(newTeams);
    setSelectedTeamsToLoad([]);
    showSuccessMessage();
  };

  const handleToggleTeamSelection = (teamId: string) => {
    setSelectedTeamsToLoad((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId]
    );
  };

  const handleSaveScore = () => {
    if (!selectedTeam || !selectedRound || !pointsInput) return;
    const points = parseInt(pointsInput);
    if (isNaN(points)) return;

    const newScores = scores.filter(
      (s) => !(s.teamId === selectedTeam && s.round === parseInt(selectedRound))
    );
    newScores.push({
      teamId: selectedTeam,
      round: parseInt(selectedRound),
      points,
    });
    setScores(newScores);
    setPointsInput("");
    showSuccessMessage();
  };

  const showSuccessMessage = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const getTeamScores = (teamId: string) => {
    const teamScores: number[] = [];
    for (let i = 1; i <= numRounds; i++) {
      const score = scores.find((s) => s.teamId === teamId && s.round === i);
      teamScores.push(score ? score.points : 0);
    }
    return teamScores;
  };

  const getTeamTotal = (teamId: string) => {
    return getTeamScores(teamId).reduce((sum, score) => sum + score, 0);
  };

  const getTeamsWithTotals = () => {
    return teams
      .map((team) => ({
        ...team,
        total: getTeamTotal(team.id),
        scores: getTeamScores(team.id),
      }))
      .sort((a, b) => b.total - a.total);
  };

  const rankedTeams = getTeamsWithTotals().map((team, index) => ({
    ...team,
    rank: index + 1,
  }));

  const winner = rankedTeams[0];

  return (
    <div className="min-h-screen bg-black">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6" />
          <span className="font-medium">¡Guardado exitosamente!</span>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 min-h-screen">
        {/* 1. MENÚ PRINCIPAL */}
        {currentScreen === "menu" && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Trophy className="w-20 h-20 text-yellow-500 drop-shadow-lg" />
              </div>
              <h2 className="text-5xl font-bold text-white mb-2">
                Sistema de Gestión
              </h2>
              <h3 className="text-3xl font-bold text-green-500 mb-4">
                Juego de Sapo
              </h3>
              <p className="text-gray-300 text-lg">
                Sistema para gestionar partidas del juego tradicional de Sapo
                durante eventos universitarios
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card
                className="hover:shadow-2xl hover:shadow-green-500/50 transition-all cursor-pointer border-2 border-green-500 hover:border-green-400 bg-gray-900"
                onClick={() => setCurrentScreen("rounds")}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <Settings className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">
                        Definir Rondas
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-400">
                        Establece el número de rondas
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card
                className="hover:shadow-2xl hover:shadow-green-500/50 transition-all cursor-pointer border-2 border-green-500 hover:border-green-400 bg-gray-900"
                onClick={() => setCurrentScreen("register")}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">
                        Registrar Equipo
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-400">
                        Crea nuevos equipos participantes
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card
                className="hover:shadow-2xl hover:shadow-yellow-500/50 transition-all cursor-pointer border-2 border-yellow-500 hover:border-yellow-400 bg-gray-900"
                onClick={() => setCurrentScreen("load")}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
                      <FolderOpen className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">
                        Cargar Equipos
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-400">
                        Carga equipos guardados previamente
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card
                className="hover:shadow-2xl hover:shadow-green-500/50 transition-all cursor-pointer border-2 border-green-500 hover:border-green-400 bg-gray-900"
                onClick={() => setCurrentScreen("scores")}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">
                        Registrar Puntajes
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-400">
                        Ingresa puntajes por ronda
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card
                className="hover:shadow-2xl hover:shadow-green-500/50 transition-all cursor-pointer border-2 border-green-500 hover:border-green-400 bg-gray-900"
                onClick={() => setCurrentScreen("show")}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">
                        Mostrar Puntajes
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-400">
                        Visualiza resultados por ronda
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card
                className="hover:shadow-2xl hover:shadow-yellow-500/50 transition-all cursor-pointer border-2 border-yellow-500 hover:border-yellow-400 bg-gray-900"
                onClick={() => setCurrentScreen("report")}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">
                        Generar Reporte
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-400">
                        Crea reporte final de la partida
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400 font-medium">
                Universidad - Recreate U & Fiestas Marianas
              </p>
            </div>
          </div>
        )}

        {/* 2. DEFINIR RONDAS */}
        {currentScreen === "rounds" && (
          <div className="max-w-2xl mx-auto">
            <Button
              variant="ghost"
              className="mb-6 text-white hover:text-green-400 hover:bg-gray-900"
              onClick={() => setCurrentScreen("menu")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Menú
            </Button>

            <Card className="border-2 border-green-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <Settings className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 text-2xl">
                      Definir Rondas
                    </CardTitle>
                    <CardDescription className="text-gray-700">
                      Establece el número de rondas que se jugarán en esta
                      partida
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-3">
                  <Label htmlFor="rounds" className="text-gray-900 text-lg">
                    Número de Rondas
                  </Label>
                  <Input
                    id="rounds"
                    type="number"
                    min="1"
                    max="20"
                    placeholder="Ej: 5"
                    className="text-xl border-2 border-green-300 focus:border-green-600 h-14"
                    value={roundsInput}
                    onChange={(e) => setRoundsInput(e.target.value)}
                  />
                  <p className="text-sm text-gray-600">
                    Ingresa la cantidad de rondas (entre 1 y 20)
                  </p>
                </div>

                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="text-green-800 font-medium">
                    <strong>Configuración actual:</strong> {numRounds} ronda
                    {numRounds !== 1 ? "s" : ""}
                  </p>
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg"
                  onClick={handleSaveRounds}
                >
                  <Save className="w-5 h-5 mr-2" />
                  Guardar Configuración
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 3. REGISTRAR EQUIPO */}
        {currentScreen === "register" && (
          <div className="max-w-2xl mx-auto">
            <Button
              variant="ghost"
              className="mb-6 text-white hover:text-green-400 hover:bg-gray-900"
              onClick={() => setCurrentScreen("menu")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Menú
            </Button>

            <Card className="border-2 border-green-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 text-2xl">
                      Registrar Equipo
                    </CardTitle>
                    <CardDescription className="text-gray-700">
                      Ingresa la información del equipo participante (hasta 5
                      jugadores)
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-3">
                  <Label htmlFor="teamName" className="text-gray-900 text-lg">
                    Nombre del Equipo *
                  </Label>
                  <Input
                    id="teamName"
                    placeholder="Ej: Los Campeones"
                    className="border-2 border-green-300 focus:border-green-600 h-12"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-gray-900 text-lg">Jugadores</Label>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="space-y-2">
                      <Label
                        htmlFor={`player${i}`}
                        className="text-sm text-gray-700 font-medium"
                      >
                        Jugador {i} {i === 1 && "*"}
                      </Label>
                      <Input
                        id={`player${i}`}
                        placeholder={`Nombre del jugador ${i}`}
                        className="border-2 border-green-300 focus:border-green-600"
                        value={playerNames[i - 1]}
                        onChange={(e) =>
                          setPlayerNames((prev) => {
                            const newNames = [...prev];
                            newNames[i - 1] = e.target.value;
                            return newNames;
                          })
                        }
                      />
                    </div>
                  ))}
                  <p className="text-sm text-gray-600">
                    * Al menos un jugador es requerido
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white h-12"
                    onClick={handleSaveTeam}
                    disabled={!teamName.trim() || playerNames.every((n) => !n.trim())}
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Guardar Equipo
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-2 border-gray-900 hover:bg-gray-100 h-12"
                    onClick={handleClearTeamForm}
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Limpiar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 4. CARGAR EQUIPOS */}
        {currentScreen === "load" && (
          <div className="max-w-3xl mx-auto">
            <Button
              variant="ghost"
              className="mb-6 text-white hover:text-yellow-400 hover:bg-gray-900"
              onClick={() => setCurrentScreen("menu")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Menú
            </Button>

            <Card className="border-2 border-yellow-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
                    <FolderOpen className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 text-2xl">
                      Cargar Equipos
                    </CardTitle>
                    <CardDescription className="text-gray-700">
                      Selecciona los equipos guardados que deseas cargar para
                      esta partida
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-3">
                  {savedTeams.map((team) => (
                    <div
                      key={team.id}
                      className={`flex items-start space-x-3 p-4 border-2 rounded-lg transition-all cursor-pointer ${
                        selectedTeamsToLoad.includes(team.id)
                          ? "bg-green-50 border-green-500"
                          : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                      }`}
                      onClick={() => handleToggleTeamSelection(team.id)}
                    >
                      <Checkbox
                        id={`team-${team.id}`}
                        checked={selectedTeamsToLoad.includes(team.id)}
                        onCheckedChange={() =>
                          handleToggleTeamSelection(team.id)
                        }
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={`team-${team.id}`}
                          className="font-bold text-gray-900 cursor-pointer text-lg"
                        >
                          {team.name}
                        </label>
                        <div className="text-sm text-gray-600 mt-1">
                          <strong>Jugadores:</strong>{" "}
                          {team.players.map((player) => player.name).join(", ")}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {team.players.length} jugador
                          {team.players.length !== 1 ? "es" : ""}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white h-12 text-lg"
                  onClick={handleLoadTeams}
                  disabled={selectedTeamsToLoad.length === 0}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Cargar Equipos Seleccionados ({selectedTeamsToLoad.length})
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 5. REGISTRAR PUNTAJES */}
        {currentScreen === "scores" && (
          <div className="max-w-2xl mx-auto">
            <Button
              variant="ghost"
              className="mb-6 text-white hover:text-green-400 hover:bg-gray-900"
              onClick={() => setCurrentScreen("menu")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Menú
            </Button>

            <Card className="border-2 border-green-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 text-2xl">
                      Registrar Puntajes
                    </CardTitle>
                    <CardDescription className="text-gray-700">
                      Ingresa los puntajes obtenidos por cada equipo en cada
                      ronda
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {teams.length === 0 ? (
                  <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 text-center">
                    <Users className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                    <p className="text-yellow-800 font-medium">
                      No hay equipos registrados. Por favor, registra o carga
                      equipos primero.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      <Label className="text-gray-900 text-lg">
                        Seleccionar Equipo
                      </Label>
                      <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                        <SelectTrigger className="h-12 border-2 border-green-300 focus:border-green-600">
                          <SelectValue placeholder="Selecciona un equipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {teams.map((team) => (
                            <SelectItem key={team.id} value={team.id}>
                              {team.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-gray-900 text-lg">
                        Seleccionar Ronda
                      </Label>
                      <Select
                        value={selectedRound}
                        onValueChange={setSelectedRound}
                      >
                        <SelectTrigger className="h-12 border-2 border-green-300 focus:border-green-600">
                          <SelectValue placeholder="Selecciona una ronda" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(numRounds)].map((_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1)}>
                              Ronda {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="points" className="text-gray-900 text-lg">
                        Puntaje Obtenido
                      </Label>
                      <Input
                        id="points"
                        type="number"
                        min="0"
                        placeholder="Ej: 150"
                        className="text-xl border-2 border-green-300 focus:border-green-600 h-14"
                        value={pointsInput}
                        onChange={(e) => setPointsInput(e.target.value)}
                      />
                    </div>

                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg"
                      onClick={handleSaveScore}
                      disabled={!selectedTeam || !selectedRound || !pointsInput}
                    >
                      <Save className="w-5 h-5 mr-2" />
                      Guardar Puntaje
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* 6. MOSTRAR PUNTAJES */}
        {currentScreen === "show" && (
          <div className="max-w-6xl mx-auto">
            <Button
              variant="ghost"
              className="mb-6 text-white hover:text-green-400 hover:bg-gray-900"
              onClick={() => setCurrentScreen("menu")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Menú
            </Button>

            <Card className="border-2 border-green-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-900 text-2xl">
                      Puntajes por Ronda
                    </CardTitle>
                    <CardDescription className="text-gray-700">
                      Visualiza los puntajes obtenidos por cada equipo en cada
                      ronda
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {teams.length === 0 ? (
                  <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 text-center">
                    <BarChart3 className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                    <p className="text-yellow-800 font-medium">
                      No hay equipos registrados para mostrar puntajes.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-100">
                            <TableHead className="w-16 font-bold text-gray-900">
                              #
                            </TableHead>
                            <TableHead className="font-bold text-gray-900">
                              Equipo
                            </TableHead>
                            {[...Array(numRounds)].map((_, i) => (
                              <TableHead
                                key={i}
                                className="text-center font-bold text-gray-900"
                              >
                                R{i + 1}
                              </TableHead>
                            ))}
                            <TableHead className="text-center font-bold text-gray-900 text-lg">
                              Total
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {rankedTeams.map((team) => (
                            <TableRow
                              key={team.id}
                              className={
                                team.rank === 1
                                  ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500"
                                  : ""
                              }
                            >
                              <TableCell className="font-bold text-gray-700">
                                {team.rank === 1 ? (
                                  <div className="flex items-center gap-1">
                                    <Trophy className="w-5 h-5 text-yellow-600" />
                                    {team.rank}
                                  </div>
                                ) : (
                                  team.rank
                                )}
                              </TableCell>
                              <TableCell className="font-bold text-gray-900">
                                {team.name}
                              </TableCell>
                              {team.scores.map((score, i) => (
                                <TableCell
                                  key={i}
                                  className="text-center text-gray-700"
                                >
                                  {score}
                                </TableCell>
                              ))}
                              <TableCell className="text-center font-bold text-xl text-green-700">
                                {team.total}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {winner && (
                      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-lg p-6 shadow-lg">
                        <div className="flex items-center gap-4">
                          <Trophy className="w-12 h-12 text-yellow-600" />
                          <div>
                            <p className="font-bold text-2xl text-gray-900">
                              Equipo Líder: {winner.name}
                            </p>
                            <p className="text-lg text-gray-700">
                              Puntaje Total:{" "}
                              <span className="font-bold text-green-700">
                                {winner.total}
                              </span>{" "}
                              puntos
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* 7. GENERAR REPORTE */}
        {currentScreen === "report" && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex gap-3">
              <Button
                variant="ghost"
                className="text-white hover:text-green-400 hover:bg-gray-900"
                onClick={() => setCurrentScreen("menu")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Menú
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-gray-900 hover:border-green-500"
                onClick={() => window.print()}
              >
                <Download className="w-4 h-4 mr-2" />
                Imprimir Reporte
              </Button>
            </div>

            <Card className="border-2 border-green-200 shadow-xl">
              <CardHeader className="text-center border-b-2 border-gray-200 bg-gradient-to-b from-white to-gray-50">
                <div className="flex justify-center mb-4">
                  <Trophy className="w-16 h-16 text-green-700" />
                </div>
                <CardTitle className="text-4xl text-gray-900">
                  Reporte Final - Juego de Sapo
                </CardTitle>
                <CardDescription className="text-base text-gray-700 mt-2">
                  {new Date().toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 pt-8">
                {teams.length === 0 ? (
                  <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-8 text-center">
                    <FileText className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                    <p className="text-yellow-800 font-medium text-lg">
                      No hay datos suficientes para generar el reporte. Por
                      favor, registra equipos y puntajes.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Winner */}
                    {winner && (
                      <div className="bg-gradient-to-r from-yellow-50 via-yellow-100 to-amber-50 border-4 border-yellow-400 rounded-xl p-8 text-center shadow-xl">
                        <Trophy className="w-20 h-20 text-yellow-600 mx-auto mb-4 drop-shadow-lg" />
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                          🏆 EQUIPO GANADOR 🏆
                        </h2>
                        <p className="text-4xl font-bold text-green-700 mb-3">
                          {winner.name}
                        </p>
                        <p className="text-2xl text-gray-800 mb-4">
                          Puntaje Total:{" "}
                          <span className="font-bold text-green-700">
                            {winner.total}
                          </span>{" "}
                          puntos
                        </p>
                        <div className="mt-6 pt-6 border-t-2 border-yellow-400">
                          <p className="text-sm font-bold text-gray-700 mb-2">
                            Integrantes:
                          </p>
                          <p className="text-gray-800">
                            {winner.players.map((player) => player.name).join(" • ")}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 text-center">
                        <Target className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                        <p className="text-sm text-gray-700 font-medium mb-1">
                          Rondas Jugadas
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                          {numRounds}
                        </p>
                      </div>
                      <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-6 text-center">
                        <Users className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                        <p className="text-sm text-gray-700 font-medium mb-1">
                          Equipos Participantes
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                          {teams.length}
                        </p>
                      </div>
                      <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 text-center">
                        <Trophy className="w-10 h-10 text-green-600 mx-auto mb-3" />
                        <p className="text-sm text-gray-700 font-medium mb-1">
                          Total Jugadores
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                          {teams.reduce(
                            (sum, team) => sum + team.players.length,
                            0
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Detailed Results */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-300 pb-3">
                        Resultados Detallados
                      </h3>

                      {rankedTeams.map((team) => (
                        <div
                          key={team.id}
                          className={`border-2 rounded-xl p-6 ${
                            team.rank === 1
                              ? "border-yellow-400 bg-gradient-to-r from-yellow-50 to-amber-50"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                {team.rank === 1 && (
                                  <Trophy className="w-8 h-8 text-yellow-600" />
                                )}
                                <span className="text-3xl font-bold text-gray-400">
                                  #{team.rank}
                                </span>
                                <h4 className="text-2xl font-bold text-gray-900">
                                  {team.name}
                                </h4>
                              </div>
                              <p className="text-sm text-gray-700 ml-12">
                                <strong>Jugadores:</strong>{" "}
                                {team.players.map((player) => player.name).join(", ")}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600 font-medium mb-1">
                                Puntaje Total
                              </p>
                              <p className="text-4xl font-bold text-green-700">
                                {team.total}
                              </p>
                            </div>
                          </div>

                          <div className="border-t-2 border-gray-300 pt-4">
                            <p className="text-sm font-bold text-gray-700 mb-3">
                              Puntajes por Ronda:
                            </p>
                            <div className="grid grid-cols-5 gap-3">
                              {team.scores.map((score, i) => (
                                <div
                                  key={i}
                                  className={`rounded-lg p-3 text-center ${
                                    team.rank === 1
                                      ? "bg-yellow-100 border-2 border-yellow-300"
                                      : "bg-gray-100 border-2 border-gray-300"
                                  }`}
                                >
                                  <p className="text-xs text-gray-600 font-medium mb-1">
                                    R{i + 1}
                                  </p>
                                  <p className="text-xl font-bold text-gray-900">
                                    {score}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="border-t-2 border-gray-300 pt-6 text-center">
                      <p className="font-bold text-gray-900 mb-2">
                        Universidad Mariana - Recreate en la U & Fiestas Marianas
                      </p>
                      <p className="text-sm text-gray-600">
                        Sistema de Gestión de Partidas - Juego de Sapo
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}