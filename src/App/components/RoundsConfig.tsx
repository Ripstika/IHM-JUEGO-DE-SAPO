// ==========================================
// ARCHIVO: RoundsConfig.tsx
// PROPÓSITO: Componente para configurar el número de rondas
// DESCRIPCIÓN: Pantalla para definir cuántas rondas se jugarán
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
import { Label } from "./ui/label";
import { ArrowLeft, Settings, Save } from "lucide-react";

interface RoundsConfigProps {
  setCurrentScreen: (screen: string) => void;
  numRounds: number;
  roundsInput: string;
  setRoundsInput: (value: string) => void;
  handleSaveRounds: () => void;
}

export default function RoundsConfig({
  setCurrentScreen,
  numRounds,
  roundsInput,
  setRoundsInput,
  handleSaveRounds,
}: RoundsConfigProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* BOTÓN PARA VOLVER AL MENÚ */}
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

        {/* CONTENIDO */}
        <CardContent className="space-y-6 pt-6">
          {/* CAMPO DE ENTRADA */}
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

          {/* INFORMACIÓN ACTUAL */}
          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
            <p className="text-green-800 font-medium">
              <strong>Configuración actual:</strong> {numRounds} ronda
              {numRounds !== 1 ? "s" : ""}
            </p>
          </div>

          {/* BOTÓN GUARDAR */}
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
  );
}