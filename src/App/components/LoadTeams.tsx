// ==========================================
// ARCHIVO: LoadTeams.tsx
// PROPÓSITO: Componente para cargar equipos guardados
// DESCRIPCIÓN: Pantalla para seleccionar y cargar equipos del historial
// ==========================================

import { Button } from "../components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { ArrowLeft, FolderOpen, Download } from "lucide-react";
import { Team } from "../types";

interface LoadTeamsProps {
  setCurrentScreen: (screen: string) => void;
  savedTeams: Team[];
  selectedTeamsToLoad: string[];
  handleToggleTeamSelection: (teamId: string) => void;
  handleLoadTeams: () => void;
}

export default function LoadTeams({
  setCurrentScreen,
  savedTeams,
  selectedTeamsToLoad,
  handleToggleTeamSelection,
  handleLoadTeams,
}: LoadTeamsProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* BOTÓN PARA VOLVER */}
      <Button
        variant="ghost"
        className="mb-6 text-white hover:text-yellow-400 hover:bg-gray-900"
        onClick={() => setCurrentScreen("menu")}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver al Menú
      </Button>

      {/* TARJETA PRINCIPAL */}
      <Card className="border-2 border-yellow-200 shadow-lg">
        {/* ENCABEZADO */}
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

        {/* CONTENIDO */}
        <CardContent className="space-y-6 pt-6">
          {/* LISTA DE EQUIPOS GUARDADOS */}
          <div className="space-y-3">
            {/* Iterar sobre todos los equipos guardados */}
            {savedTeams.map((team) => (
              <div
                key={team.id}
                className={`flex items-start space-x-3 p-4 border-2 rounded-lg transition-all cursor-pointer ${
                  // Cambiar estilo si el equipo está seleccionado
                  selectedTeamsToLoad.includes(team.id)
                    ? "bg-green-50 border-green-500"
                    : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }`}
                onClick={() => handleToggleTeamSelection(team.id)}
              >
                {/* CHECKBOX */}
                <Checkbox
                  id={`team-${team.id}`}
                  checked={selectedTeamsToLoad.includes(team.id)}
                  onCheckedChange={() =>
                    handleToggleTeamSelection(team.id)
                  }
                  className="mt-1"
                />
                {/* INFORMACIÓN DEL EQUIPO */}
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

          {/* BOTÓN CARGAR */}
          <Button
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white h-12 text-lg"
            onClick={handleLoadTeams}
            // Desabilitar si no hay equipos seleccionados
            disabled={selectedTeamsToLoad.length === 0}
          >
            <Download className="w-5 h-5 mr-2" />
            Cargar Equipos Seleccionados ({selectedTeamsToLoad.length})
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}