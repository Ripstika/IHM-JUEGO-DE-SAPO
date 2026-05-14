// ==========================================
// ARCHIVO: TeamRegistration.tsx
// PROPÓSITO: Componente para registrar nuevos equipos
// DESCRIPCIÓN: Pantalla para crear equipos con sus jugadores
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
import { ArrowLeft, Users, Save, Trash2 } from "lucide-react";

interface TeamRegistrationProps {
  setCurrentScreen: (screen: string) => void;
  teamName: string;
  setTeamName: (value: string) => void;
  playerNames: string[];
  setPlayerNames: (value: string[]) => void;
  handleSaveTeam: () => void;
  handleClearTeamForm: () => void;
}

export default function TeamRegistration({
  setCurrentScreen,
  teamName,
  setTeamName,
  playerNames,
  setPlayerNames,
  handleSaveTeam,
  handleClearTeamForm,
}: TeamRegistrationProps) {
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

      {/* TARJETA DE REGISTRO */}
      <Card className="border-2 border-green-200 shadow-lg">
        {/* ENCABEZADO */}
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

        {/* CONTENIDO DEL FORMULARIO */}
        <CardContent className="space-y-6 pt-6">
          {/* NOMBRE DEL EQUIPO */}
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

          {/* LISTA DE JUGADORES */}
          <div className="space-y-4">
            <Label className="text-gray-900 text-lg">Jugadores</Label>
            {/* Renderizar 5 campos de entrada para jugadores */}
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

          {/* BOTONES DE ACCIÓN */}
          <div className="flex gap-3">
            {/* BOTÓN GUARDAR */}
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700 text-white h-12"
              onClick={handleSaveTeam}
              disabled={!teamName.trim() || playerNames.every((n) => !n.trim())}
            >
              <Save className="w-5 h-5 mr-2" />
              Guardar Equipo
            </Button>
            {/* BOTÓN LIMPIAR */}
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
  );
}