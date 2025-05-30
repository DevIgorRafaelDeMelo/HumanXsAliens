import React, { useState, useEffect } from "react";
import { useCharacter } from "./useCharacter";
import ReactHowler from "react-howler";
import winSound from "../sounds/win.mp3";
import { FaArrowLeft } from "react-icons/fa";
import { GiCrossedSwords } from "react-icons/gi";
import heroSound from "../sounds/attack.mp3";
import alienSound from "../sounds/alien.mp3";

const BattleModal = ({ selectedVillain, closeModal, setVillains }) => {
  const { character, setCharacter } = useCharacter();
  const [heroHealth, setHeroHealth] = useState(0);
  const [maxHeroHealth, setMaxHeroHealth] = useState(0);
  const [villainHealth, setVillainHealth] = useState(selectedVillain.health);
  const [attacker, setAttacker] = useState(character.name);
  const [winner, setWinner] = useState(null);
  const [battleActive, setBattleActive] = useState(true);
  const [playHeroSound, setPlayHeroSound] = useState(false);
  const [playAlienSound, setPlayAlienSound] = useState(false);

  // Só roda 1 vez ao abrir o modal
  useEffect(() => {
    setHeroHealth(character.health);
    setMaxHeroHealth(character.health);
  }, []); // <== remove o dependency array com character.health

  useEffect(() => {
    if (attacker === character.name) {
      setPlayAlienSound(true);
    } else if (attacker === selectedVillain.name) {
      setPlayHeroSound(true);
    }

    if (!battleActive || !selectedVillain) return;

    const interval = setInterval(() => {
      const isHeroAttacking = attacker === character.name;

      if (isHeroAttacking) {
        const crit = Math.random() * 100 < character.critChance;
        const damage = crit ? character.attack * 2 : character.attack;

        setVillainHealth((prev) => {
          const newHealth = Math.max(prev - damage, 0);
          if (newHealth === 0) {
            setWinner(character.name);
            setBattleActive(false);
            setVillains((prev) =>
              prev.map((v) =>
                v.name === selectedVillain.name ? { ...v, isAlive: false } : v
              )
            );
            clearInterval(interval);
          }
          return newHealth;
        });

        setAttacker(selectedVillain.name);
      } else {
        const crit = Math.random() * 100 < selectedVillain.critChance;
        const damage = crit
          ? selectedVillain.attack * 2
          : selectedVillain.attack;
        const netDamage = Math.max(damage - character.defense, 0);

        setHeroHealth((prev) => {
          const newHealth = Math.max(prev - netDamage, 0);
          if (newHealth === 0) {
            setWinner(selectedVillain.name);
            setBattleActive(false);
            clearInterval(interval);
          }

          // Atualiza o personagem no contexto (mantendo maxHeroHealth intacto)
          setCharacter((prevChar) => ({ ...prevChar, health: newHealth }));
          return newHealth;
        });

        setAttacker(character.name);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [attacker, battleActive]);

  useEffect(() => {
    if (winner) {
      const timeout = setTimeout(() => {
        closeModal();
      }, 5000); // Espera 5 segundos antes de fechar o modal

      return () => clearTimeout(timeout); // Limpa o timeout se o componente desmontar
    }
  }, [winner]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fundo estilizado com textura e brilho suave */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-90 backdrop-blur-xl"></div>

      {/* Modal de batalha com efeito metálico */}
      <div className="text-white p-8 rounded-3xl w-[95%] max-w-4xl text-center shadow-2xl relative flex bg-gradient-to-br from-gray-800 to-gray-900 border-none">
        {playHeroSound && (
          <ReactHowler
            src={heroSound}
            playing={true}
            onEnd={() => setPlayHeroSound(false)}
          />
        )}
        {playAlienSound && (
          <ReactHowler
            src={alienSound}
            playing={true}
            onEnd={() => setPlayAlienSound(false)}
          />
        )}
        {winner && <ReactHowler src={winSound} playing />}

        {/* Painéis de combate */}
        <div className="flex justify-between w-full gap-20 relative">
          {/* Herói */}
          <div className="flex flex-col items-center  w-3/5 bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-2xl">
            <div className="w-full bg-gray-700 rounded-full h-3 mb-10 my-4">
              <div
                className="bg-green-500 h-full animate-pulse"
                style={{ width: `${(heroHealth / maxHeroHealth) * 100}%` }}
              ></div>
            </div>

            <div
              className={`flex flex-col items-center transition-transform ${
                attacker === character.name ? "animate-shake" : ""
              }`}
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-50 h-50   border-2 border-gray-400 shadow-md"
              />
            </div>

            <strong className="text-2xl mt-2 py-10 text-cyan-300">
              {character.name}
            </strong>
            <p className="text-lg mt-1 text-gray-300">
              💖 {heroHealth} / {maxHeroHealth} HP
            </p>
          </div>

          {/* Ícone de Espadas Cruzadas - Centralizado */}
          <div className=" transform   top-1/2  flex items-center justify-center   p-3 drop-shadow-lg    ">
            <GiCrossedSwords
              size={60}
              className="text-gray-400 animate-pulse "
            />
          </div>

          {/* Vilão */}
          <div className="flex flex-col items-center w-3/5 bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-2xl">
            <div className="w-full bg-gray-700 rounded-full h-3 mb-10 my-4">
              <div
                className="bg-red-500 h-full animate-pulse"
                style={{
                  width: `${(villainHealth / selectedVillain.health) * 100}%`,
                }}
              ></div>
            </div>

            <img
              src={selectedVillain.image}
              alt={selectedVillain.name}
              className="w-50 h-50   border-2 border-gray-400 shadow-md transition-transform hover:scale-105"
            />
            <strong className="text-2xl py-10 mt-2 text-red-300">
              {selectedVillain.name}
            </strong>
            <p className="text-lg mt-1 text-gray-300">
              💖 {villainHealth} / {selectedVillain.health} HP
            </p>
          </div>
        </div>
      </div>

      {/* Botão de fuga estilizado */}
      <button
        onClick={closeModal}
        className="absolute top-6 right-6 bg-black/50 backdrop-blur-md border-none text-gray-400 hover:bg-gray-700 hover:text-white transition-all duration-300 px-6 py-3 rounded-lg shadow-md font-semibold tracking-wide flex items-center gap-2"
      >
        <FaArrowLeft size={20} />
        Fugir da Batalha
      </button>

      {/* Tela de vitória com efeito especial e brilho */}
      {winner && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-gray-800/90 backdrop-blur-md rounded-xl px-8 py-5 shadow-2xl text-gray-300 font-extrabold text-3xl animate-pulse tracking-wider">
          🏆 Vitória de {winner}!
        </div>
      )}
    </div>
  );
};

export default BattleModal;
