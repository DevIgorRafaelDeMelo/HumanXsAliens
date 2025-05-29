import Navbar from "../Componets/Navbar";
import useVillains from "../context/useVillains";
import { useCharacter } from "../context/useCharacter";
import React, { useState } from "react";
import BattleModal from "../context/BattleModal";

const Map = () => {
  const { character, attackEnemy, setCharacter } = useCharacter();
  const [selectedVillain, setSelectedVillain] = useState(null); // Estado para armazenar o vilão selecionado
  const { villains, setVillains } = useVillains();

  const startBattle = (villain) => {
    setSelectedVillain(villain); // Define o vilão para iniciar a batalha
  };

  const closeModal = () => {
    setSelectedVillain(null); // Fecha o modal
  };
  const allVillainsDefeated = villains.every(
    (villain) => villain.isAlive === false
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center">
      <Navbar />
      <div className="h-[10vh]"></div>

      {/* Container principal com flex */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8  w-[80%] mx-auto">
        {/* Card do Herói */}
        <div className="bg-gray-800  justify-center items-center flex text-white p-6 rounded-md w-full h-80">
          <img
            src={character.image}
            alt={character.name}
            className="w-24 h-24 rounded-full m-auto"
          />
          <div className="justify-center items-center ">
            <h2 className="text-xl font-bold">{character.name}</h2>
            <p>💖 Vida: {character.health}</p>
            <p>⚔️ Ataque: {character.attack}</p>
            <p>🔥 Chance de crítico: {character.critChance}%</p>
            <p>🛡️ Defesa: {character.defense}</p>
          </div>
        </div>

        {/* Lista de Vilões */}
        <div className="bg-gray-800 text-white p-6 rounded-md w-full relative">
          <h2 className="text-2xl font-bold text-center">Vilões no Mapa</h2>
          <ul className="space-y-4 mt-4">
            {villains.map((villain, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-700 p-3 rounded-md gap-4"
              >
                <img
                  src={villain.image}
                  alt={villain.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                  <strong className="text-lg">{villain.name}</strong>
                  <p>💖 Vida: {villain.health}</p>
                  <p>⚔️ Ataque: {villain.attack}</p>
                  <p>🔥 Crítico: {villain.critChance}%</p>
                  <p>🛡️ Defesa: {villain.defense}</p>
                </div>
                {villain.isAlive ? (
                  <button
                    onClick={() => startBattle(villain)}
                    className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 ml-auto"
                  >
                    ⚔️ Lutar!
                  </button>
                ) : (
                  <span className="text-gray-400 font-bold">☠️ Derrotado</span>
                )}
              </li>
            ))}
          </ul>

          {/* Botão do chefe cobrindo toda a área */}
          {villains.every((v) => !v.isAlive) && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-md">
              <button
                onClick={() =>
                  alert("Você está pronto para enfrentar o chefe!")
                }
                className="bg-purple-600 hover:bg-purple-800 text-white px-6 py-4 rounded text-xl font-bold shadow-lg"
              >
                ⚔️ Batalhar com Chefe
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Modal de batalha */}
      {selectedVillain && (
        <BattleModal
          selectedVillain={selectedVillain}
          closeModal={closeModal}
          setVillains={setVillains}
        />
      )}
    </div>
  );
};

export default Map;
