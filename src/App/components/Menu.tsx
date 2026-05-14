// ==========================================
// ARCHIVO: Menu.tsx
// PROPÓSITO: Componente para la pantalla de menú principal
// DESCRIPCIÓN: Muestra las opciones principales del sistema
// ==========================================

import { Button } from "../components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Settings,
  Users,
  FolderOpen,
  Target,
  BarChart3,
  FileText,
  Trophy,
} from "lucide-react";

interface MenuProps {
  setCurrentScreen: (screen: string) => void;
}

export default function Menu({ setCurrentScreen }: MenuProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* ENCABEZADO */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          {/* Icono del trofeo */}
          <Trophy className="w-20 h-20 text-yellow-500 drop-shadow-lg" />
        </div>
        {/* Título principal */}
        <h2 className="text-5xl font-bold text-white mb-2">
          Sistema de Gestión
        </h2>
        {/* Subtítulo con el nombre del juego */}
        <h3 className="text-3xl font-bold text-green-500 mb-4">
          Juego de Sapo
        </h3>
        {/* Descripción de la aplicación */}
        <p className="text-gray-300 text-lg">
          Sistema para gestionar partidas del juego tradicional de Sapo
          durante eventos universitarios
        </p>
      </div>

      {/* GRID DE OPCIONES */}
      {/* Hay 6 tarjetas principales que representan las funciones del sistema */}
      <div className="grid grid-cols-2 gap-4">
        {/* OPCIÓN 1: DEFINIR RONDAS */}
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

        {/* OPCIÓN 2: REGISTRAR EQUIPO */}
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

        {/* OPCIÓN 3: CARGAR EQUIPOS */}
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

        {/* OPCIÓN 4: REGISTRAR PUNTAJES */}
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

        {/* OPCIÓN 5: MOSTRAR PUNTAJES */}
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

        {/* OPCIÓN 6: GENERAR REPORTE */}
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

      {/* PIE DE PÁGINA */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-400 font-medium">
          Universidad - Recreate U & Fiestas Marianas
        </p>
      </div>
    </div>
  );
}