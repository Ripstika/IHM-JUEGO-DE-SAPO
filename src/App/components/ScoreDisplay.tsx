// ==========================================
// ARCHIVO: ScoreDisplay.tsx
// PROPÓSITO: Componente para mostrar puntajes
// DESCRIPCIÓN: Pantalla para visualizar tabla de puntajes por ronda
// ==========================================

import { Button } from "../components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { Team } from "../types";

interface RankedTeam extends Team {
  total: number;
  scores: number[];
  rank: number;
}

interface ScoreDisplayProps {
  setCurrentScreen: (screen: string) => void;
  teams: Team[];
  numRounds: number;
  rankedTeams: RankedTeam[];
}

export default function ScoreDisplay({
  setCurrentScreen,
  teams,
  numRounds,
  rankedTeams,
}: ScoreDisplayProps) {
  return (
    <div className="max-w-6xl mx-auto">
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

        {/* CONTENIDO */}
        <CardContent className="pt-6">
          {/* VALIDAR QUE HAYA EQUIPOS */}
          {teams.length === 0 ? (
            // Mensaje si no hay equipos
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 text-center">
              <BarChart3 className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <p className="text-yellow-800 font-medium">
                No hay equipos registrados para mostrar puntajes.
              </p>
            </div>
          ) : (
            // Mostrar tabla de puntajes
            <div className="space-y-6">
              {/* TABLA CON PUNTAJES */}
              <div className="overflow-x-auto">
                <Table>
                  {/* ENCABEZADO DE LA TABLA */}
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      {/* Columna de ranking */}
                      <TableHead className="w-16 font-bold text-gray-900">
                        #
                      </TableHead>
                      {/* Columna de nombre de equipo */}
                      <TableHead className="font-bold text-gray-900">
                        Equipo
                      </TableHead>
                      {/* Columnas para cada ronda */}
                      {[...Array(numRounds)].map((_, i) => (
                        <TableHead
                          key={i}
                          className="text-center font-bold text-gray-900"
                        >
                          R{i + 1}
                        </TableHead>
                      ))}
                      {/* Columna del total */}
                      <TableHead className="text-center font-bold text-gray-900">
                        Total
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* FILAS DE EQUIPOS */}
                    {rankedTeams.map((team) => (
                      <TableRow key={team.id} className="hover:bg-gray-50">
                        {/* Ranking */}
                        <TableCell className="font-bold text-lg text-center">
                          {team.rank}º
                        </TableCell>
                        {/* Nombre del equipo */}
                        <TableCell className="font-semibold text-gray-900">
                          {team.name}
                        </TableCell>
                        {/* Puntajes por ronda */}
                        {team.scores.map((score, index) => (
                          <TableCell
                            key={index}
                            className="text-center font-medium"
                          >
                            {score}
                          </TableCell>
                        ))}
                        {/* Total */}
                        <TableCell className="text-center font-bold text-lg text-green-600">
                          {team.total}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* INFORMACIÓN ADICIONAL */}
              {rankedTeams.length > 0 && (
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="text-green-800 font-medium text-center">
                    🏆 <strong>Equipo Ganador:</strong> {rankedTeams[0].name} con{" "}
                    {rankedTeams[0].total} puntos
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}