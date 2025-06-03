import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import alienImg from "../data/Aliens";
import { tiposMilitares } from "../data/militaryTypes";
import background from "../Img/Torre.png";

const Map = () => {
  const [characters, setCharacters] = useState([]);
  const character = characters.length > 0 ? characters[0] : null;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userLogin, logout } = useUser();
  const [turn, setTurn] = useState();
  const [battleTurns, setBattleTurns] = useState([]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [damageInfo, setDamageInfo] = useState(null);
  const [aliens, setAliens] = useState([]);
  const activeAlien = aliens.find((alien) => alien.live === 1);
  const [playerHP, setPlayerHP] = useState(character?.health_points);
  const [enemyHP, setEnemyHP] = useState(activeAlien?.vida);
  useEffect(() => {
    if (character) setPlayerHP(character.health_points);
  }, [character]);

  useEffect(() => {
    if (activeAlien) setEnemyHP(activeAlien.vida);
  }, [activeAlien]);

  useEffect(() => {
    if (!userLogin?.token || !userLogin?.id) {
      console.error("Token ou ID do usuário ausente.");
      navigate("/");
      return;
    }

    async function fetchCharacters() {
      try {
        const res = await fetch(
          `http://localhost:5000/characters?user_id=${userLogin.id}`,
          {
            headers: { Authorization: `Bearer ${userLogin.token}` },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setCharacters(data.characters);
        } else {
          alert(`Erro ao buscar personagens: ${data.message}`);
        }
      } catch (error) {
        alert("Erro ao conectar com o servidor.");
        console.error("Erro de conexão:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchAliens() {
      try {
        const res = await fetch("http://localhost:5000/aliens", {
          headers: { Authorization: `Bearer ${userLogin.token}` },
        });
        const data = await res.json();
        if (res.ok) setAliens(data);
      } catch (error) {
        console.error("Erro ao conectar com o servidor");
      }
    }
    fetchAliens();
    fetchCharacters();
  }, [userLogin, navigate]);
  if (loading || !character) return <div>Carregando...</div>;
  const getMilitaryImage = (tipoId) => {
    const selectedMilitaryType = [...tiposMilitares.homens].find(
      (tipo) => tipo.id === tipoId
    );

    return selectedMilitaryType ? selectedMilitaryType.image : "default.png"; // Fallback caso não encontre
  };
  const startBattle = async () => {
    const characterId = character?.id; // Obtém o ID do personagem
    const enemyIds = activeAlien.id;
    console.log(characterId, enemyIds);
    try {
      const response = await fetch("http://localhost:5000/battle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userLogin.token}`,
        },
        body: JSON.stringify({
          characterId,
          enemyIds,
        }),
      });

      const data = await response.json();
      setBattleTurns(data.turns);
      setCurrentTurnIndex(0);
      processTurn(data.turns);

      console.log(data.turns);
    } catch (error) {
      console.error("Erro ao iniciar batalha:", error);
    }
  };
  const processTurn = (turns) => {
    if (!turns.length) return;

    let index = 0;
    const interval = setInterval(() => {
      const turnoAtual = turns[index];

      setDamageInfo(turnoAtual);

      if (turnoAtual.source === "player") {
        setEnemyHP((prevHP) => Math.max(prevHP - turnoAtual.dano, 0));
      } else {
        setPlayerHP((prevHP) => Math.max(prevHP - turnoAtual.dano, 0));
      }

      setTimeout(() => {
        setDamageInfo(null);
      }, 1000);

      index++;
      setCurrentTurnIndex(index);

      if (index >= turns.length) {
        clearInterval(interval);
      }
    }, 2000);
  };
  const getAlienImage = (tipoId) => {
    const selectAlien = alienImg.find((tipo) => tipo.nome === tipoId);
    return selectAlien ? selectAlien.img : "default.png";
  };
  if (loading || !character || !activeAlien) return <div>Carregando...</div>;
  const maxhealth = character.health_points;
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
      className="flex flex-col justify-between items-center"
    >
      <Navbar />
      <div className="flex justify-center    pt-60 ">
        {/* Card do Personagem */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
          className="relative bg-gradient-to-br from-gray-700 via-black to-gray-900 text-white p-8 w-full max-w-lg border-[3px] border-red-500 rounded-xl shadow-lg flex flex-col items-center gap-6"
        >
          {/* Dano recebido - Correto na parte superior */}
          {damageInfo?.source === "enemy" && (
            <motion.div
              initial={{ opacity: 1, scale: 1.2, y: 0 }}
              animate={{ opacity: 0, scale: 1, y: -20 }}
              transition={{ duration: 1 }}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white text-lg font-bold px-4 py-2 rounded-lg shadow-xl"
            >
              -{damageInfo.dano}
            </motion.div>
          )}

          <h3 className="text-3xl font-extrabold text-red-400 drop-shadow-md">
            {character.name}
          </h3>

          {/* Imagem do Personagem */}
          <div className="w-80 h-96 mx-auto rounded-lg overflow-hidden shadow-xl">
            <img
              src={getMilitaryImage(character.tipo_id)}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Barra de Vida */}
          <div className="w-full bg-gray-700 rounded-full h-5 shadow-md mt-5">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: `${(playerHP / maxhealth) * 100}%` }}
              transition={{ duration: 1 }}
              className="h-5 bg-red-600 rounded-full"
            />
            <p className="text-md font-bold text-white mt-2">
              {playerHP} / {maxhealth} HP
            </p>
          </div>

          {/* Pontos de Ataque e Defesa */}
          <div className="flex justify-between w-full mt-6 px-8">
            <p className="text-xl font-bold text-orange-400 flex items-center gap-3 ">
              ⚔️ Ataque: {character.attack_points}
            </p>
            <p className="text-xl font-bold text-blue-400 flex items-center gap-3">
              🛡 Defesa: {character.defense_points}
            </p>
          </div>
        </motion.div>
        {/* Ícone de Batalha */}
        <div className="text-6xl text-gray-300 animate-pulse">⚔️</div>

        {/* Card do Alien */}
        {activeAlien && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="relative bg-gradient-to-br from-gray-700 via-black to-gray-900 text-white p-8 w-full max-w-lg border-[3px] border-red-500 rounded-xl shadow-lg flex flex-col items-center gap-6"
          >
            {/* Dano recebido - Correto na parte superior */}
            {damageInfo?.source === "player" && (
              <motion.div
                initial={{ opacity: 1, scale: 1.2, y: 0 }}
                animate={{ opacity: 0, scale: 1, y: -20 }}
                transition={{ duration: 1 }}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-lg font-bold px-4 py-2 rounded-lg shadow-xl"
              >
                -{damageInfo.dano}
              </motion.div>
            )}

            <h3 className="text-3xl font-extrabold text-red-400 drop-shadow-md">
              {activeAlien.nome}
            </h3>

            {/* Imagem do Alien */}
            <div className="w-80 h-96 mx-auto rounded-lg overflow-hidden shadow-xl">
              <img
                src={getAlienImage(activeAlien.nome)}
                alt={activeAlien.nome}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Barra de Vida */}
            <div className="w-full bg-gray-700 rounded-full h-5 shadow-md mt-5">
              <motion.div
                initial={{ width: "100%" }}
                animate={{
                  width: `${(enemyHP / activeAlien.max_health) * 100}%`,
                }}
                transition={{ duration: 1 }}
                className="h-5 bg-red-600 rounded-full"
              />
              <p className="text-md font-bold text-white mt-2">
                {enemyHP} / {activeAlien.max_health} HP
              </p>
            </div>

            {/* Pontos de Ataque e Defesa */}
            <div className="flex justify-between w-full mt-6 px-8">
              <p className="text-xl font-bold text-orange-400 flex items-center gap-3">
                ⚔️ Ataque: {activeAlien.ataque}
              </p>
              <p className="text-xl font-bold text-blue-400 flex items-center gap-3">
                🛡 Defesa: {activeAlien.defesa}
              </p>
            </div>
          </motion.div>
        )}
      </div>
      <button
        onClick={() => startBattle()}
        className="bg-red-600 text-white text-xl font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-red-700  transition-transform duration-300 ease-in-out"
      >
        ⚔️ Iniciar Batalha
      </button>
    </div>
  );
};

export default Map;
