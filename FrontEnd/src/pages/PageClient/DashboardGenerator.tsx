import { useState, useEffect } from "react";
("use client");

import DashboardGeneral from "./DashboardGeneral";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DashboardGenerator() {
  const [mostrarDashboard, setMostrarDashboard] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // Controla a re-renderização e animação

  const handleGerarDashboard = () => {
    setCarregando(true);

    setTimeout(() => {
      setCarregando(false);
      setMostrarDashboard(true);

      const event = new Event("respostaAtualizada");
      window.dispatchEvent(event);

      // Forçar a animação ao alterar a chave
      setAnimationKey((prev) => prev + 1);
    }, 2000); // Tempo do setTimeout
  };

  return (
    <Card className="p-10 w-full max-w-[1600px] mx-auto relative">
      {!mostrarDashboard ? (
        <div className="flex justify-center items-center relative">
          {!carregando && (
            <Button
              className="text-xl px-8 py-4 bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleGerarDashboard}
            >
              Gerar Dashboard
            </Button>
          )}

          {carregando && (
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="spinner-border animate-spin border-t-4 border-blue-600 border-8 rounded-full w-12 h-12"></div>
            </div>
          )}
        </div>
      ) : (
        <div className="transition-opacity duration-1000 animate-fadeIn">
          <DashboardGeneral key={animationKey} />
        </div>
      )}
    </Card>
  );
}
