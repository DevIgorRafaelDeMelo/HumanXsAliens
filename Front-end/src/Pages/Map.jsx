import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import alienImg from "../data/Aliens";
import { tiposMilitares } from "../data/militaryTypes";
import background from "../Img/Torre.png";
import Modal from "../Components/Modal";
import x from "../Img/X.png";

const Map = () => {
  const [characters, setCharacters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const character = characters.length > 0 ? characters[0] : null;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userLogin, logout } = useUser();
  const [battleTurns, setBattleTurns] = useState([]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [damageInfo, setDamageInfo] = useState(null);
  const [aliens, setAliens] = useState([]);
  const [card, setCard] = useState();
  const [playerHP, setPlayerHP] = useState();
  const [enemyHP, setEnemyHP] = useState();
  const [winner, setWinner] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [exp, setExp] = useState();
  const [money, setMoney] = useState();
  const [dano, setDano] = useState();
  const [defessa, setDefessa] = useState();
  const [crit, setCrit] = useState();
  const [vida, setVida] = useState();
  const [critMultiplo, setCritMultiplo] = useState();
  useEffect(() => {
    if (!userLogin?.token || !userLogin?.id) {
      console.error("Token ou ID do usuário ausente.");
      navigate("/");
      return;
    }

    async function fetchCharacters() {
      try {
        const res = await fetch(
          `http://192.168.20.198:5000/characters?user_id=${userLogin.id}`,
          {
            headers: { Authorization: `Bearer ${userLogin.token}` },
          }
        );

        const data = await res.json();
        setCard(data.enemies);
        if (res.ok) {
          setCharacters(data.characters);
          setEnemyHP(data.enemies.vida);
          setVida(
            data.characters[0].health_points +
              data.characters[0].BOOT_SPELL[4] +
              data.characters[0].CAPA_SPELL[4] +
              data.characters[0].TORSO_SPELL[4] +
              data.characters[0].GUN_SPELL[4]
          );
          setDano(
            data.characters[0].attack_points +
              data.characters[0].BOOT_SPELL[0] +
              data.characters[0].CAPA_SPELL[0] +
              data.characters[0].TORSO_SPELL[0] +
              data.characters[0].GUN_SPELL[0]
          );
          setCrit(
            [
              data.characters[0].crit_chance,
              data.characters[0].BOOT_SPELL[2],
              data.characters[0].CAPA_SPELL[2],
              data.characters[0].TORSO_SPELL[2],
              data.characters[0].GUN_SPELL[2],
            ]
              .map((value) => parseFloat(value) || 0)
              .reduce((acc, curr) => acc + curr, 0)
          );
          setCritMultiplo(
            [
              data.characters[0].crit_multiplier,
              data.characters[0].BOOT_SPELL[3],
              data.characters[0].CAPA_SPELL[3],
              data.characters[0].TORSO_SPELL[3],
              data.characters[0].GUN_SPELL[3],
            ]
              .map((value) => parseFloat(value) || 0)
              .reduce((acc, curr) => acc + curr, 0)
              .toFixed(2)
          );

          setDefessa(
            data.characters[0].defense_points +
              data.characters[0].BOOT_SPELL[1] +
              data.characters[0].CAPA_SPELL[1] +
              data.characters[0].TORSO_SPELL[1] +
              data.characters[0].GUN_SPELL[1]
          );
          setPlayerHP(
            data.characters[0].health_points +
              data.characters[0].BOOT_SPELL[4] +
              data.characters[0].CAPA_SPELL[4] +
              data.characters[0].TORSO_SPELL[4] +
              data.characters[0].GUN_SPELL[4]
          );
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
        const res = await fetch("http://192.168.20.198:5000/aliens", {
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
  const getMilitaryImage = (tipoId) => {
    const selectedMilitaryType = [...tiposMilitares.homens].find(
      (tipo) => tipo.id === tipoId
    );

    return selectedMilitaryType ? selectedMilitaryType.image : "default.png";
  };
  const startBattle = async () => {
    setDisabled(true);
    const characterId = character?.id;
    const enemyIds = card.id;
    try {
      const response = await fetch("http://192.168.20.198:5000/battle", {
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

      setMoney(data.money);
      setExp(data.exp);
      setWinner(data.winner);
      setBattleTurns(data.turns);
      setCurrentTurnIndex(0);
      processTurn(data.turns, data.enemies);
    } catch (error) {
      console.error("Erro ao iniciar batalha:", error);
    }
  };
  const processTurn = (turns, enemies) => {
    if (!turns.length) return;

    let index = 0;
    const interval = setInterval(() => {
      const turnoAtual = turns[index];

      setDamageInfo(turnoAtual);

      setTimeout(() => {
        setDamageInfo(null);
      }, 1000);

      index++;

      setCurrentTurnIndex(index);

      if (turnoAtual.source === "enemy") {
        setPlayerHP((prevHP) => prevHP - turnoAtual.dano);
      } else {
        setEnemyHP((prevHP) => prevHP - turnoAtual.dano);
      }

      if (index >= turns.length) {
        clearInterval(interval);
        setTimeout(() => {
          setShowModal(true);
          setCard(enemies);
          setEnemyHP(enemies.vida);
          setPlayerHP(vida);
          setDisabled(false);
        }, 2000);
      }
    }, 2000);
  };
  const getAlienImage = (tipoId) => {
    const selectAlien = alienImg.find((tipo) => tipo.nome === tipoId);
    return selectAlien ? selectAlien.img : "default.png";
  };

  if (loading || !character) return <div>Carregando...</div>;
  const maxhealth = vida;

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
      <div
        style={{
          backgroundImage: `url(${x})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "50vh",
          width: "50vh",
        }}
        className="fixed flex flex-col mt-40 justify-between items-center"
      ></div>
      <div className="flex justify-center  w-[100%]  pt-40 ">
        {/* Card do Personagem */}
        <motion.div
          initial={{ opacity: 0, x: -2000 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
          className="relative bg-gradient-to-br from-gray-700 via-black to-gray-900 text-white p-8  max-w-lg border-[3px] border-red-500 rounded-xl shadow-lg flex flex-col items-center gap-6"
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
          <div className="w-80 h-80 mx-auto rounded-lg overflow-hidden shadow-xl">
            <img
              src={getMilitaryImage(character.tipo_id)}
              className="w-full h-full object-cover object-top"
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
          <ul className="w-full mt-6 px-8 space-y-4 text-gray-400">
            <li className="flex justify-between border-b border-gray-600 pb-2">
              <span className=" font-bold">Ataque</span>
              <span>{dano}</span>
            </li>
            <li className="flex justify-between border-b border-gray-600 pb-2">
              <span className="  font-bold">Defesa</span>
              <span>{defessa}</span>
            </li>
            <li className="flex justify-between border-b border-gray-600 pb-2">
              <span className="  font-bold">Chance Crítico</span>
              <span>{crit}%</span>
            </li>
            <li className="flex justify-between border-b border-gray-600 pb-2">
              <span className="  font-bold">Múltiplo Crítico</span>
              <span>{critMultiplo}</span>
            </li>
          </ul>
        </motion.div>
        {/* Ícone de Batalha */}
        <div className="w-[200px] h-32 flex items-center justify-center"></div>

        {/* Card do Alien */}
        {card && (
          <motion.div
            initial={{ opacity: 0, x: 2000 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="relative bg-gradient-to-br from-gray-700 via-black to-gray-900 text-white p-8   max-w-lg border-[3px] border-red-500 rounded-xl shadow-lg flex flex-col items-center gap-6"
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
              {card.nome}
            </h3>

            {/* Imagem do Alien */}
            <div className="w-80 h-80 mx-auto rounded-lg overflow-hidden shadow-xl">
              <img
                src={getAlienImage(card.nome)}
                alt={card.nome}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Barra de Vida */}
            <div className="w-full bg-gray-700 rounded-full h-5 shadow-md mt-5">
              <motion.div
                initial={{ width: "100%" }}
                animate={{
                  width: `${Math.max((enemyHP / card.vida) * 100, 0)}%`,
                }}
                transition={{ duration: 1 }}
                className="h-5 bg-red-600 rounded-full"
              />

              <p className="text-md font-bold text-white mt-2">
                {enemyHP} / {card.vida} HP
              </p>
            </div>

            {/* Pontos de Ataque e Defesa */}

            <ul className="w-full mt-6 px-8 space-y-4 text-gray-400">
              <li className="flex justify-between border-b border-gray-600 pb-2">
                <span className=" font-bold">Ataque</span>
                <span>{card.ataque}</span>
              </li>
              <li className="flex justify-between border-b border-gray-600 pb-2">
                <span className="  font-bold">Defesa</span>
                <span>{card.defesa}</span>
              </li>
            </ul>
          </motion.div>
        )}
      </div>

      <button
        onClick={startBattle}
        disabled={disabled}
        className={`fixed top-[80vh] px-6 py-4 rounded-lg shadow-[0_0_25px_#ff000055] text-xl font-bold tracking-wide
  ${
    disabled
      ? "bg-gray-500 cursor-not-allowed"
      : "bg-red-600 hover:bg-red-700 text-white transition-all duration-300 ease-in-out  aborder-2 border-red-500 shadow-lg hover:shadow-[0_0_40px_#ff0000aa]"
  }`}
      >
        FIGHT!
      </button>

      {showModal && (
        <Modal
          className="z-10"
          winner={winner}
          exp={exp}
          money={money}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Map;
