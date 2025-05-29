import React, { useState, useEffect } from "react";
import { useCharacter } from "./useCharacter";

const BattleModal = ({ selectedVillain, closeModal, setVillains }) => {
  const { character, setCharacter } = useCharacter();
  const [heroHealth, setHeroHealth] = useState(character.health); // Inicializa com vida salva
  const [villainHealth, setVillainHealth] = useState(selectedVillain.health);
  const [attacker, setAttacker] = useState(character.name);
  const [winner, setWinner] = useState(null);
  const [battleActive, setBattleActive] = useState(true);

  // **Mantém a vida do personagem entre batalhas**
  useEffect(() => {
    setHeroHealth(character.health); // Atualiza com a vida real do personagem
  }, [character.health]);

  useEffect(() => {
    if (selectedVillain && battleActive) {
      const battleInterval = setInterval(() => {
        let attackDamage;

        if (attacker === character.name) {
          attackDamage =
            Math.random() * 100 < character.critChance
              ? character.attack * 2
              : character.attack;
          setVillainHealth((prev) => Math.max(prev - attackDamage, 0));
          setAttacker(selectedVillain.name);
        } else {
          // ⚠️ Verifica se o vilão ainda está vivo ANTES de atacar
          if (villainHealth > 0) {
            attackDamage =
              Math.random() * 100 < selectedVillain.critChance
                ? selectedVillain.attack * 2
                : selectedVillain.attack;

            const damageReceived = Math.max(
              attackDamage - character.defense,
              0
            );

            setHeroHealth((prev) => {
              const newHealth = Math.max(prev - damageReceived, 0);
              setCharacter((prevCharacter) => ({
                ...prevCharacter,
                health: newHealth, // Atualiza globalmente
              }));
              return newHealth;
            });
          }

          setAttacker(character.name);
        }

        // **Verifica quem perdeu com a vida globalmente atualizada**
        if (heroHealth <= 0 || villainHealth <= 0) {
          clearInterval(battleInterval);
          setBattleActive(false);
          const winnerName =
            heroHealth <= 0 ? selectedVillain.name : character.name;
          setWinner(winnerName);

          // Atualiza vilão derrotado
          if (villainHealth <= 0) {
            setVillains((prev) =>
              prev.map((villain) =>
                villain.name === selectedVillain.name
                  ? { ...villain, isAlive: false }
                  : villain
              )
            );
          }
        }
      }, 2000);

      return () => clearInterval(battleInterval);
    }
  }, [selectedVillain, attacker, battleActive]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-900 text-white p-6 rounded-md w-96 text-center flex flex-col gap-6">
        <h2 className="text-2xl font-bold">
          ⚔️ Batalha contra {selectedVillain.name}!
        </h2>

        {winner ? (
          <p className="text-xl font-bold text-green-400">
            🏆 {winner} venceu a batalha!
          </p>
        ) : (
          <>
            <p className="text-md font-bold text-yellow-400">
              Atacando: {attacker}
            </p>

            <div className="flex justify-between items-center gap-6">
              <div className="flex flex-col items-center">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-24 h-24 rounded-full"
                />
                <strong className="text-lg mt-2">{character.name}</strong>
                <p className="text-red-400">💖 Vida: {heroHealth}</p>
                <p>🛡️ Defesa: {character.defense}</p>
                <p>⚔️ Ataque: {character.attack}</p>
              </div>

              <div className="text-3xl font-bold">VS</div>

              <div className="flex flex-col items-center">
                <img
                  src={selectedVillain.image}
                  alt={selectedVillain.name}
                  className="w-24 h-24 rounded-full"
                />
                <strong className="text-lg mt-2">{selectedVillain.name}</strong>
                <p className="text-red-400">💖 Vida: {villainHealth}</p>
                <p>⚔️ Ataque: {selectedVillain.attack}</p>
              </div>
            </div>
          </>
        )}

        <button
          onClick={closeModal}
          className="bg-red-500 px-4 py-2 rounded mt-4 hover:bg-red-700"
        >
          ❌ Fechar
        </button>
      </div>
    </div>
  );
};

export default BattleModal;
