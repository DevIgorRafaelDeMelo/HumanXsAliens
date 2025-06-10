import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import background from "../Img/Torre.png";
import OFF from "../Img/Room.png";
import { motion } from "framer-motion";
import alienImg from "../data/Aliens";
import { tiposMilitares } from "../data/militaryTypes";

const Torre = () => {
  const { userLogin, logout } = useUser();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [andares, setAndares] = useState([]);
  const [aliens, setAliens] = useState([]);
  const [showBattleModal, setShowBattleModal] = useState(false);
  const [playerHP, setPlayerHP] = useState();
  const [enemyHP, setEnemyHP] = useState();
  const [battleTurns, setBattleTurns] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const character = characters.length > 0 ? characters[0] : null;
  const getAlienImage = (tipoId) => {
    const selectAlien = alienImg.find((tipo) => tipo.nome === tipoId);

    return selectAlien ? selectAlien.img : "default.png"; // Fallback caso não encontre
  };
  const getMilitaryImage = (tipoId) => {
    const selectedMilitaryType = [...tiposMilitares.homens].find(
      (tipo) => tipo.id === tipoId
    );

    return selectedMilitaryType ? selectedMilitaryType.image : "default.png"; // Fallback caso não encontre
  };
  const startBattle = async () => {
    const characterId = character?.id; // Obtém o ID do personagem
    const enemyIds = aliens
      .filter((alien) => andares.aliens_ids.includes(alien.id))
      .slice(0, 5)
      .map((alien) => alien.id); // Obtém os IDs dos 5 inimigos

    try {
      const response = await fetch("http://localhost:5000/start-battle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userLogin.token}`, // 🔥 Token do usuário
        },
        body: JSON.stringify({
          characterId,
          enemyIds,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setShowBattleModal(true); // Abre o modal de batalha
      } else {
        console.error("Erro ao iniciar batalha:", data.message);
      }
    } catch (error) {
      console.error("Erro de conexão com o servidor:", error);
    }
  };
  useEffect(() => {
    if (!userLogin) {
      navigate("/auth"); // Se não está logado, vai para auth
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

    async function fetchAndares() {
      try {
        const res = await fetch("http://localhost:5000/andares", {
          headers: {
            Authorization: `Bearer ${userLogin.token}`, // Assumindo que o token veio na resposta do login
          },
        });
        const data = await res.json();
        if (res.ok) {
          setAndares(data);
        } else {
          console.error("Erro ao carregar andares");
        }
      } catch (error) {
        console.error("Erro ao conectar com o servidor");
      }
    }

    async function fetchAliens() {
      try {
        const res = await fetch("http://localhost:5000/aliens", {
          headers: {
            Authorization: `Bearer ${userLogin.token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setAliens(data); // Definindo estado dos aliens
        } else {
          console.error("Erro ao carregar aliens");
        }
      } catch (error) {
        console.error("Erro ao conectar com o servidor");
      }
    }

    fetchCharacters();
    fetchAndares();
    fetchAliens();
  }, [userLogin, navigate]);

  if (loading) return <div>Carregando...</div>;

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
      {/* Card centralizado */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} // Inicia pequeno e invisível
        animate={{ opacity: 1, scale: 1 }} // Expande e aparece suavemente
        transition={{ duration: 0.8, type: "spring" }} // Transição suave
        className="bg-white/10 backdrop-blur-md border-[4px] border-cyan-500 rounded-xl w-[75%]  flex flex-col items-center  p-8 m-60 mb-0"
        style={{
          backgroundImage: `url(${OFF})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "60vh",
        }}
      >
        <div className="w-[100%] mt-10">
          <motion.div
            key={andares.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="  border-cyan-500 rounded-xl flex flex-col items-center shadow-lg hover:scale-105 transition-transform"
          >
            <h2 className="text-xl font-bold text-cyan-300 bg-white/10 px-4 py-2 backdrop-blur-md rounded-md">
              {andares.nome}
            </h2>
            <div className="flex flex-wrap justify-center gap-6 my-12">
              {aliens
                .filter((alien) => andares.aliens_ids.includes(alien.id)) // 🔥 Filtra somente os aliens do andar
                .map((alien) => (
                  <div
                    key={alien.id}
                    className="bg-white/10 backdrop-blur-md border-[4px] border-cyan-500 rounded-xl flex flex-col items-center p-6 shadow-lg w-60 transition-transform  hover:border-cyan-400"
                  >
                    <h2 className="text-xl font-bold text-cyan-300">
                      {alien.nome}
                    </h2>

                    <div className="relative w-40 h-60 overflow-hidden shadow-xl rounded-lg mt-2">
                      <img
                        src={getAlienImage(alien.nome)}
                        alt={alien.nome}
                        className="w-full h-full object-cover object-top transition-opacity duration-300 "
                      />
                    </div>

                    <p className="text-gray-200 mt-2 text-sm">
                      Nível: {alien.nv}
                    </p>
                    <p className="text-gray-200 text-sm">
                      Ataque: {alien.ataque}
                    </p>
                  </div>
                ))}
            </div>
            <button
              onClick={() => {
                setShowBattleModal(true);
                startBattle(); // 🔥 Agora a função é chamada corretamente
              }}
              className="mt-4 px-6 py-2 bg-cyan-500 text-white font-bold rounded-lg shadow-md hover:bg-cyan-400"
            >
              Entrar
            </button>
          </motion.div>
        </div>
      </motion.div>
      {showBattleModal && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center">
          <div className="bg-white/10 border-[4px] border-cyan-500 rounded-xl p-8 w-[80vh] text-center shadow-lg">
            <h2 className="text-xl font-bold text-red-500">⚔ Batalha!</h2>

            {/* Personagem e Inimigo lado a lado */}
            <div className="flex justify-between items-center mt-6">
              {/* Personagem */}
              <div className="bg-white/10 border-[4px] border-cyan-500 rounded-xl flex flex-col items-center p-6 shadow-lg w-60 relative">
                <h2 className="text-xl font-bold text-cyan-300">
                  {character?.name}
                </h2>
                <img
                  src={getMilitaryImage(character.tipo_id)}
                  alt={character?.name}
                  className="w-40 h-60 object-cover shadow-xl"
                />

                {/* Vida Perdida */}
                {battleTurns[currentTurn]?.dano && (
                  <div className="absolute top-2 text-red-500 text-lg font-bold animate-pulse">
                    -{battleTurns[currentTurn].dano} HP!
                  </div>
                )}

                {/* Barra de Vida do Jogador */}
                <div className="w-full bg-red-800 rounded-full mt-2">
                  <div
                    className="bg-green-500 text-xs font-bold text-center p-1 rounded-full"
                    style={{
                      width: `${(playerHP / characters.health_points) * 100}%`,
                    }}
                  >
                    HP: {playerHP}
                  </div>
                </div>
              </div>

              {/* VS */}
              <h2 className="text-red-500 text-2xl font-bold">VS</h2>

              {/* Inimigo Atual */}
              {aliens.length > 0 && (
                <div className="bg-white/10 border-[4px] border-cyan-500 rounded-xl flex flex-col items-center p-6 shadow-lg w-60 relative">
                  <h2 className="text-xl font-bold text-cyan-300">
                    {aliens[0].nome}
                  </h2>
                  <img
                    src={getAlienImage(aliens[0].nome)}
                    alt={aliens[0].nome}
                    className="w-40 h-60 object-cover shadow-xl"
                  />

                  {/* Vida Perdida */}
                  {battleTurns[currentTurn]?.dano && (
                    <div className="absolute top-2 text-red-500 text-lg font-bold animate-pulse">
                      -{battleTurns[currentTurn].dano} HP!
                    </div>
                  )}

                  {/* Barra de Vida do Inimigo */}
                  <div className="w-full bg-red-800 rounded-full mt-2">
                    <div
                      className="bg-green-500 text-xs font-bold text-center p-1 rounded-full"
                      style={{ width: `${(enemyHP / aliens[0].vida) * 100}%` }}
                    >
                      HP: {enemyHP}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Botão para fechar batalha */}
            <button
              onClick={() => setShowBattleModal(false)}
              className="mt-4 px-6 py-2 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-500"
            >
              Fugir da Batalha
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Torre;
