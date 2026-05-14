// ==========================================
// ARCHIVO: Report.tsx
// PROPÓSITO: Componente para generar reporte final
// DESCRIPCIÓN: Pantalla para mostrar reporte completo de la partida
// ==========================================

import { Button } from "../components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { ArrowLeft, Download, Trophy, Target, Users, FileText } from "lucide-react";
import { Team } from "../types";

interface RankedTeam extends Team {
  total: number;
  scores: number[];
  rank: number;
}

interface ReportProps {
  setCurrentScreen: (screen: string) => void;
  teams: Team[];
  numRounds: number;
  rankedTeams: RankedTeam[];
  winner: RankedTeam | undefined;
}

export default function Report({
  setCurrentScreen,
  teams,
  numRounds,
  rankedTeams,
  winner,
}: ReportProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* BOTONES DE ACCIÓN */}
      <div className="mb-6 flex gap-3">
        {/* BOTÓN VOLVER AL MENÚ */}
        <Button
          variant="ghost"
          className="text-white hover:text-green-400 hover:bg-gray-900"
          onClick={() => setCurrentScreen("menu")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Menú
        </Button>
        {/* BOTÓN IMPRIMIR */}
        <Button
          variant="outline"
          className="border-2 border-white text-white hover:bg-gray-900 hover:border-green-500"
          onClick={() => window.print()}
        >
          <Download className="w-4 h-4 mr-2" />
          Imprimir Reporte
        </Button>
      </div>

      {/* TARJETA DEL REPORTE */}
      <Card className="border-2 border-green-200 shadow-xl">
        {/* ENCABEZADO DEL REPORTE */}
        <CardHeader className="text-center border-b-2 border-gray-200 bg-gradient-to-b from-white to-gray-50">
          <div className="flex justify-center mb-4">
            <Trophy className="w-16 h-16 text-green-700" />
          </div>
          <CardTitle className="text-4xl text-gray-900">
            Reporte Final - Juego de Sapo
          </CardTitle>
          <CardDescription className="text-base text-gray-700 mt-2">
            {/* Mostrar la fecha actual en formato español */}
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </CardDescription>
        </CardHeader>

        {/* CONTENIDO DEL REPORTE */}
        <CardContent className="space-y-8 pt-8">
          {/* VALIDAR QUE HAYA DATOS */}
          {teams.length === 0 ? (
            // Mensaje si no hay datos
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-8 text-center">
              <FileText className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
              <p className="text-yellow-800 font-medium text-lg">
                No hay datos suficientes para generar el reporte. Por
                favor, registra equipos y puntajes.
              </p>
            </div>
          ) : (
            // Mostrar reporte completo
            <>
              {/* ========== SECCIÓN: EQUIPO GANADOR ========== */}
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

              {/* ========== SECCIÓN: ESTADÍSTICAS ========== */}
              <div className="grid grid-cols-3 gap-4">
                {/* Estadística: Rondas Jugadas */}
                <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 text-center">
                  <Target className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-700 font-medium mb-1">
                    Rondas Jugadas
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {numRounds}
                  </p>
                </div>
                {/* Estadística: Equipos Participantes */}
                <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-6 text-center">
                  <Users className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-700 font-medium mb-1">
                    Equipos Participantes
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {teams.length}
                  </p>
                </div>
                {/* Estadística: Total Jugadores */}
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

              {/* ========== SECCIÓN: RESULTADOS DETALLADOS ========== */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-300 pb-3">
                  Resultados Detallados
                </h3>

                {/* Iterar sobre equipos ordenados por ranking */}
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

              {/* ========== SECCIÓN: PIE DE PÁGINA ========== */}
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
  );
}