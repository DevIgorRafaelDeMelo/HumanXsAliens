import React from "react";
import Navbar from "../Componets/Navbar";
import { useCharacter } from "../context/useCharacter";// Certifique-se de que o caminho está correto!

const Home = () => {
  const { character, attackEnemy } = useCharacter(); // Obtém os dados do personagem e função de ataque

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      <div className="h-[10vh]"></div>
      <div className="bg-gray-800 text-white p-4 rounded-md max-w-sm mx-auto flex items-center">
        <img
          src={character.image}
          alt={character.name}
          className="w-24 h-24 rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl font-bold">{character.name}</h2>
          <p>💖 Vida: {character.health}</p>
          <p>⚔️ Ataque: {character.attack}</p>
          <p>🔥 Chance de crítico: {character.critChance}%</p>
          <p>🛡️ Defesa: {character.defense}</p>

        </div>

      </div>
    </div>
  );
};

export default Home;
