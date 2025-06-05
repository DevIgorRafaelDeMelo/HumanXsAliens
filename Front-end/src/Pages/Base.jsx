import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineThunderbolt } from "react-icons/ai";
import { GiShield, GiCrossedSwords } from "react-icons/gi";
import { tiposMilitares } from "../data/militaryTypes";
import { useUser } from "../context/UserContext";
import Navbar from "../Components/Navbar";
import gunsImg from "../data/Arma";

const Base = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userLogin, logout } = useUser();
  const character = characters.length > 0 ? characters[0] : null;
  const [depositoItens, setDepositoItens] = useState([]);
  const [itens, setItens] = useState([]);
  const depositoItensArray =
    typeof depositoItens === "string"
      ? JSON.parse(depositoItens)
      : depositoItens;
  const getMilitaryImage = (tipoId) => {
    const selectedMilitaryType = [...tiposMilitares.homens].find(
      (tipo) => tipo.id === tipoId
    );

    return selectedMilitaryType ? selectedMilitaryType.image : "default.png"; // Fallback caso não encontre
  };
  const getMilitaryName = (tipoId) => {
    const selectedMilitaryType = [...tiposMilitares.homens].find(
      (tipo) => tipo.id === tipoId
    );

    return selectedMilitaryType
      ? selectedMilitaryType.name
      : "Tipo desconhecido"; // Fallback caso o ID não seja encontrado
  };

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
          setDepositoItens(data.characters[0].DEPOSITO);
          setItens(data.guns);
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

    fetchCharacters();
  }, [userLogin, navigate]);
  const selectImgGund = (id) => {
    console.log(id);
    const gun = gunsImg.find((g) => g.id === id);
    return gun ? gun.img : "";
  };

  if (loading) return <div>Carregando...</div>;

  // Se tem personagem(s), pode mostrar lista ou ir direto para o personagem principal
  return (
    <div className="h-full w-full  bg-gradient-to-br from-gray-800 via-black to-gray-900  ">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-white  w-[100vh] h-[100vh] flex flex-col items-center p-6  rounded-xl shadow-lg  relative"
        >
          {/* Nível */}
          <div className="absolute -top-0 right-[0px] text-white text-3xl  rounded-lg font-extrabold shadow-xl">
            Lvl {character?.level}
          </div>

          {/* Imagem */}
          <div className="relative">
            <div className="relative w-52 h-52 overflow-hidden shadow-xl">
              <img
                src={getMilitaryImage(character.tipo_id)}
                alt={character?.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-2 right-0 bg-cyan-500 text-sm px-2 py-1 rounded-lg font-bold shadow-md animate-pulse">
              {getMilitaryName(character.tipo_id)}
            </div>
          </div>

          {/* Detalhes */}
          <div className="flex flex-col gap-3 p-6 w-full">
            <h2 className="text-2xl font-extrabold text-yellow-300 drop-shadow-md text-center">
              {character?.name}
            </h2>

            {/* Barra de vida */}
            <div className="relative w-full bg-gray-700 rounded-full h-6 overflow-hidden mt-3 shadow-md">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${character.health_points}%` }}
                transition={{ duration: 1 }}
                className="h-6 bg-red-500 rounded-full"
              />
              <p className="absolute inset-0 flex justify-center items-center text-sm font-bold text-white">
                {character?.health_points} / {character?.max_health_points} HP
              </p>
            </div>

            {/* Barra de XP */}
            <div className="relative w-full bg-gray-700 rounded-full h-5 overflow-hidden mt-2 shadow-md">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${character.health_points}%` }}
                transition={{ duration: 1 }}
                className="h-5 bg-yellow-500 rounded-full"
              />
              <p className="absolute inset-0 flex justify-center items-center text-sm font-bold text-white">
                XP: {character?.exp_points} / {character?.next_level_exp}
              </p>
            </div>

            {/* Atributos */}
            <div className="grid grid-cols-2 gap-3 mt-4 text-white text-base font-semibold">
              <p className="flex items-center gap-2">
                <AiFillHeart className="text-red-400" />
                Vida: {character?.health_points}
              </p>
              <p className="flex items-center gap-2">
                <GiCrossedSwords className="text-orange-400" />
                Ataque: {character?.attack_points}
              </p>
              <p className="flex items-center gap-2">
                <AiOutlineThunderbolt className="text-yellow-400" />
                Crítico: {character?.crit_chance}%
              </p>
              <p className="flex items-center gap-2">
                <GiShield className="text-blue-400" />
                Defesa: {character?.defense_points}
              </p>
            </div>

            {/* 🧱 Itens do Depósito */}
            <div className="mt-10 bg-gradient-to-br from-gray-800 via-black to-gray-900 p-6 rounded-xl border-2 border-cyan-500 shadow-[0_0_25px_#00ffff55]">
              <h3 className="text-2xl font-extrabold text-cyan-400 mb-6 border-b border-cyan-500 pb-2">
                🎒 Itens no Depósito
              </h3>

              {Array.isArray(depositoItensArray) &&
              depositoItensArray.length > 0 ? (
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 max-h-[40vh] overflow-y-auto custom-scroll pr-2 scroll-fade-mask">
                  {depositoItensArray.map((id, index) => {
                    const item = itens.find((i) => i.id === id);
                    if (!item) return null;

                    return (
                      <li
                        key={index}
                        className="flex items-center  shadow-lg hover:scale-105 transition-transform duration-200"
                      >
                        <img
                          src={selectImgGund(item.id)}
                          alt={item.nome}
                          className="w-14 h-14 object-contain mr-3 border-2 border-cyan-500 rounded-md shadow-md"
                        />
                        <div className="space-y-1">
                          <p className="text-cyan-300 font-bold text-sm">
                            {item.nome}
                          </p>
                          <p className="text-yellow-300 flex items-center text-sm">
                            <GiCrossedSwords className="text-orange-400 mr-1" />
                            {item.dano}
                          </p>
                          <p className="text-green-300 flex items-center text-sm">
                            <GiShield className="text-blue-400 mr-1" />
                            {item.defesa}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-gray-400">Nenhum item no depósito.</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Base;
