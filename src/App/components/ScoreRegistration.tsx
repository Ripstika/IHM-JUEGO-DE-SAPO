// ==========================================
// ARCHIVO: ScoreRegistration.tsx
// PROPÓSITO: Componente para registrar puntajes
// DESCRIPCIÓN: Pantalla para ingresar puntajes por equipo y ronda
// ==========================================

import { Button } from "../components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ArrowLeft, Target, Save, Users } from "lucide-react";
import { Team } from "../types";

interface ScoreRegistrationProps {
  setCurrentScreen: (screen: string) => void;
  teams: Team[];
  numRounds: number;
  selectedTeam: string;
  setSelectedTeam: (value: string) => void;
  selectedRound: string;
  setSelectedRound: (value: string) => void;
  pointsInput: string;
  setPointsInput: (value: string) => void;
  handleSaveScore: () => void;
}

export default function ScoreRegistration({
  setCurrentScreen,
  teams,
  numRounds,
  selectedTeam,
  setSelectedTeam,
  selectedRound,
  setSelectedRound,
  pointsInput,
  setPointsInput,
  handleSaveScore,
}: ScoreRegistrationProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* BOTÓN PARA VOLVER */}
      <Button
        variant="ghost"
        className="mb-6 text-white hover:text-green-400 hover:bg-gray-900"
        onClick={() => setCurrentScreen("menu")}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver al Menú
      </Button>

      {/* TARJETA PRINCIPAL */}
      <Card className="border-2 border-green-200 shadow-lg">
        {/* ENCABEZADO */}
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

        {/* CONTENIDO */}
        <CardContent className="space-y-6 pt-6">
          {/* VALIDAR QUE HAYA EQUIPOS */}
          {teams.length === 0 ? (
            // Mensaje si no hay equipos registrados
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 text-center">
              <Users className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <p className="text-yellow-800 font-medium">
                No hay equipos registrados. Por favor, registra o carga
                equipos primero.
              </p>
            </div>
          ) : (
            // Formulario si hay equipos
            <>
              {/* SELECTOR DE EQUIPO */}
              <div className="space-y-3">
                <Label className="text-gray-900 text-lg">
                  Seleccionar Equipo
                </Label>
                <select
                  className="w-full h-12 rounded-md border-2 border-green-300 bg-white px-3 text-base text-gray-900 outline-none focus:border-green-600"
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                >
                  <option value="">Selecciona un equipo</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* SELECTOR DE RONDA */}
              <div className="space-y-3">
                <Label className="text-gray-900 text-lg">
                  Seleccionar Ronda
                </Label>
                <select
                  className="w-full h-12 rounded-md border-2 border-green-300 bg-white px-3 text-base text-gray-900 outline-none focus:border-green-600"
                  value={selectedRound}
                  onChange={(e) => setSelectedRound(e.target.value)}
                >
                  <option value="">Selecciona una ronda</option>
                  {[...Array(numRounds)].map((_, i) => (
                    <option key={i + 1} value={String(i + 1)}>
                      Ronda {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* ENTRADA DE PUNTAJE */}
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

              {/* BOTÓN GUARDAR */}
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg"
                onClick={handleSaveScore}
                // Desabilitar si no están todos los campos llenos
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
  );
}