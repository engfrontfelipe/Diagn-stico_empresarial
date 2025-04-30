import { useState } from "react";
("use client");

import DashboardGeneral from "./DashboardGeneral";
import { Button } from "@/components/ui/button";

export default function DashboardGenerator() {
  const [mostrarDashboard, setMostrarDashboard] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const handleGerarDashboard = () => {
    setCarregando(true);

    setTimeout(() => {
      setCarregando(false);
      setMostrarDashboard(true);

      const event = new Event("respostaAtualizada");
      window.dispatchEvent(event);

      setAnimationKey((prev) => prev + 1);
    }, 500);
  };

  const handleFecharDashboard = () => {
    setMostrarDashboard(false);
  };

  return (
    <>
      {!mostrarDashboard ? (
        <div className="flex justify-center items-center relative">
          {!carregando && (
            <Button
              onClick={handleGerarDashboard}
              className="px-4 py-2 bg-primary  rounded-md w-full cursor-pointer"
            >
              Gerar Dashboard
            </Button>
          )}

          {carregando && (
            <div className="flex justify-center items-center">
              <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-primary"></div>
            </div>
          )}
        </div>
      ) : (
        <div className="transition-opacity duration-1000 animate-fadeIn relative">
          <button
            onClick={handleFecharDashboard}
            className="cursor-pointer absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-lg"
          >
            ×
          </button>
          <DashboardGeneral key={animationKey} />
        </div>
      )}
    </>
  );
}
