// src/pages/Map.jsx
import Navbar from "../Componets/Navbar";
import useVillains from "../context/useVillains";
import { useCharacter } from "../context/useCharacter";
import React, { useState } from "react";
import BattleModal from "../context/BattleModal";
import img from "../Img/3.png";
import Mpa from "../Img/Mapa.png"; // Importando a imagem do herói

const Map = () => {
  const { character } = useCharacter();
  const [selectedVillain, setSelectedVillain] = useState(null);
  const [selectedVillainBoss, setSelectedVillainBoss] = useState(null);
  const { villains, setVillains, boss } = useVillains();

  const startBattle = (villain) => {
    setSelectedVillain(villain);
  };

  const closeModal = () => {
    setSelectedVillain(null);
    setSelectedVillainBoss(null);
  };

  const collisionRadius = 10; // Define a distância mínima entre vilões
  const placedVillains = []; // Lista para armazenar posições já ocupadas

  const getValidPosition = () => {
    let randomX, randomY;
    let validPosition = false;

    while (!validPosition) {
      randomX = Math.floor(Math.random() * (80 - collisionRadius)) + 10;
      randomY = Math.floor(Math.random() * (80 - collisionRadius)) + 10;

      // Verificar se a posição gerada está longe de outras já posicionadas
      validPosition = placedVillains.every(
        (pos) =>
          Math.abs(pos.x - randomX) > collisionRadius &&
          Math.abs(pos.y - randomY) > collisionRadius
      );

      if (validPosition) placedVillains.push({ x: randomX, y: randomY });
    }

    return { x: randomX, y: randomY };
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center relative">
      <Navbar />
      <div className="h-[10vh]"></div>
      {/* Container principal com Hero + Mapa lado a lado */}
      <div className="flex items-start justify-center gap-12 w-[100%] mx-auto">
        {/* Card do Herói */}
        <div className="bg-gradient-to-r from-blue-900 via-gray-800 to-black text-white p-6 rounded w-[40%] h-80 flex items-center gap-6 border-4 border-cyan-500 shadow-2xl">
          <img
            src={character.image}
            alt={character.name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold text-yellow-400">
              {character.name}
            </h2>
            <p>💖 Vida: {character.health}</p>
            <p>⚔️ Ataque: {character.attack}</p>
            <p>🔥 Crítico: {character.critChance}%</p>
            <p>🛡️ Defesa: {character.defense}</p>
          </div>
        </div>

        {/* Mapa dos Vilões */}
        <div
          className="relative w-[50%] h-[80vh] bg-gray-900 border-8 border-cyan-500 rounded shadow-2xl overflow-hidden"
          style={{
            backgroundImage: `url(${Mpa})`,
            backgroundSize: "cover",
          }}
        >
          {/* Camada de opacidade ativada apenas quando o chefe aparecer */}
          {villains.every((v) => !v.isAlive) && (
            <div className="absolute inset-0 bg-black opacity-50"></div>
          )}

          <h2 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-3xl font-extrabold text-yellow-300">
            New York
          </h2>

          {/* Vilões */}
          {villains.map((villain, index) => {
            const { x, y } = getValidPosition();

            return (
              <div
                key={index}
                onClick={() => villain.isAlive && startBattle(villain)}
                className="absolute cursor-pointer flex flex-col items-center transform hover:scale-110 transition-all"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <img
                  src={villain.image}
                  alt={villain.name}
                  className={`w-20 h-20 rounded-full border-2 shadow-md ${
                    villain.isAlive
                      ? "border-red-500"
                      : "border-gray-500 opacity-50"
                  }`}
                />
                <p className="text-lg font-bold mt-2">
                  {villain.isAlive ? villain.name : "☠️ Derrotado"}
                </p>
              </div>
            );
          })}

          {/* Chefe centralizado */}
          {villains.every((v) => !v.isAlive) && (
            <div
              onClick={() => setSelectedVillainBoss(boss)}
              className="absolute cursor-pointer flex flex-col items-center transform hover:scale-110 transition-all"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src={boss.image}
                alt={boss.name}
                className="w-32 h-32 rounded-full border-4 border-purple-500 shadow-xl animate-pulse"
              />
              <p className="text-2xl font-extrabold text-purple-400 mt-2">
                ⚔️ {boss.name}
              </p>
              <span className="bg-purple-700 text-white px-6 py-3 rounded-xl text-lg font-bold shadow-lg transform hover:scale-105 transition-all">
                Desafiar o Chefe!
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Modais de batalha */}
      {selectedVillain && (
        <BattleModal
          selectedVillain={selectedVillain}
          closeModal={closeModal}
          setVillains={setVillains}
        />
      )}
      {selectedVillainBoss && (
        <BattleModal
          selectedVillain={selectedVillainBoss}
          closeModal={closeModal}
          setVillains={setVillains}
        />
      )}
    </div>
  );
};

export default Map;
