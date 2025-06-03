import React from "react";

const BattleCards = ({ player, enemy }) => {
  const Bar = ({ current, max, color }) => (
    <div className="bg-gray-300 rounded-lg h-5 w-full overflow-hidden mb-1">
      <div
        className={`h-full transition-all duration-500`}
        style={{
          width: `${(current / max) * 100}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );

  return (
    <div className="flex justify-center items-center gap-8 mt-10 font-sans">
      {/* Player Card */}
      <div className="border-2 border-gray-800 rounded-xl p-6 w-48 shadow-lg bg-white text-center">
        <h3 className="text-xl font-semibold mb-2">{player.nome}</h3>
        <Bar current={player.hp} max={player.maxHp} color="#22c55e" />
        <p className="mb-2">
          HP: {player.hp} / {player.maxHp}
        </p>
        <p>Ataque: {player.ataque}</p>
      </div>

      {/* Sword Icon */}
      <div className="text-4xl font-bold select-none">⚔️</div>

      {/* Enemy Card */}
      <div className="border-2 border-gray-800 rounded-xl p-6 w-48 shadow-lg bg-white text-center">
        <h3 className="text-xl font-semibold mb-2">{enemy.nome}</h3>
        <Bar current={enemy.hp} max={enemy.maxHp} color="#ef4444" />
        <p className="mb-2">
          HP: {enemy.hp} / {enemy.maxHp}
        </p>
        <p>Ataque: {enemy.ataque}</p>
      </div>
    </div>
  );
};

export default BattleCards;
