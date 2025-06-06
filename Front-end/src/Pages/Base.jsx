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
  const [menuAbertoIndex, setMenuAbertoIndex] = useState(null);
  const [capa, setCapa] = useState();
  const [arma, setArma] = useState();
  const [torso, setTorso] = useState();
  const [boot, setBoot] = useState();
  const handleVender = (index) => {
    console.log(`Item ${index} vendido!`);
    // Aqui você pode adicionar lógica para venda do item
  };

  const handleEquipar = async (itemId) => {
    try {
      const res = await fetch("http://localhost:5000/equipar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userLogin.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: itemId }),
      });

      if (!res.ok) {
        throw new Error("Erro ao equipar o item!");
      }

      const data = await res.json();
      const updatedCharacter = data.characters[0];

      setCapa(updatedCharacter.CAPA);
      setTorso(updatedCharacter.TORSO);
      setBoot(updatedCharacter.BOOT);
      setArma(updatedCharacter.GUN);

      console.log("Item equipado com sucesso:", updatedCharacter);
    } catch (error) {
      console.error("Erro ao enviar para o back-end:", error);
    }
  };

  const depositoItensArray =
    typeof depositoItens === "string"
      ? JSON.parse(depositoItens)
      : depositoItens;
  const getMilitaryImage = (tipoId) => {
    const selectedMilitaryType = [...tiposMilitares.homens].find(
      (tipo) => tipo.id === tipoId
    );

    return selectedMilitaryType ? selectedMilitaryType.image : "default.png";
  };
  const getMilitaryName = (tipoId) => {
    const selectedMilitaryType = [...tiposMilitares.homens].find(
      (tipo) => tipo.id === tipoId
    );

    return selectedMilitaryType
      ? selectedMilitaryType.name
      : "Tipo desconhecido";
  };

  useEffect(() => {
    if (!userLogin?.token || !userLogin?.id) {
      console.error("Token ou ID do usuário ausente.");
      navigate("/");
      return;
    }

    async function fetchCharacters() {
      try {
        const res = await fetch(`http://localhost:5000/characters`, {
          headers: {
            Authorization: `Bearer ${userLogin.token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (res.ok) {
          setCharacters(data.characters);
          setDepositoItens(data.characters[0].DEPOSITO);
          setItens(data.guns);
          setCapa(data.characters[0].CAPA);
          setTorso(data.characters[0].TORSO);
          setBoot(data.characters[0].BOOT);
          setArma(data.characters[0].GUN);
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
    const gun = gunsImg.find((g) => g.id === id);
    return gun ? gun.img : "";
  };
  useEffect(() => {
    console.log("Atualizando imagens...");
  }, [arma, boot, torso, capa]);

  if (loading) return <div>Carregando...</div>;

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
          <h2 className="text-2xl font-extrabold text-yellow-300 drop-shadow-md text-center mb-4">
            {character?.name}
          </h2>
          {/* Imagem */}
          <div className="flex items-center justify-center space-x-10">
            {/* Caixa à esquerda da imagem */}
            <div className="flex flex-col space-y-6">
              <div className="w-24 h-24 bg-black rounded-xl border-4 border-cyan-500 shadow-md">
                <img
                  src={selectImgGund(arma)}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="w-24 h-24 bg-black rounded-xl border-4 border-cyan-500 shadow-md">
                <img
                  src={selectImgGund(capa)}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Imagem */}
            <div className="relative">
              <div className="relative w-52 h-52 overflow-hidden shadow-xl">
                <img
                  src={getMilitaryImage(character.tipo_id)}
                  alt={character?.name}
                  className="w-full h-full object-cover object-top rounded-xl border-4 border-cyan-500 shadow-[0_0_25px_#00ffff55]"
                />
              </div>
              <div className="absolute -bottom-2 right-0 bg-cyan-500 text-sm px-2 py-1 rounded-lg font-bold shadow-md animate-pulse">
                {getMilitaryName(character.tipo_id)}
              </div>
            </div>

            {/* Caixa à direita da imagem */}
            <div className="flex flex-col space-y-6">
              <div className="w-24 h-24 bg-black rounded-xl border-4 border-cyan-500 shadow-md">
                <img
                  src={selectImgGund(torso)}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="w-24 h-24 bg-black rounded-xl border-4 border-cyan-500 shadow-md">
                <img
                  src={selectImgGund(boot)}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
          {/* Detalhes */}
          <div className="flex flex-col gap-3 p-6 w-full">
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
                        className="relative flex items-center shadow-lg transition-transform duration-200 p-3"
                        onMouseEnter={() => setMenuAbertoIndex(index)}
                        onMouseLeave={() => setMenuAbertoIndex(null)}
                      >
                        {/* Imagem do item */}
                        <div className="relative">
                          <img
                            src={selectImgGund(item.id)}
                            alt={item.nome}
                            className="w-14 h-14 object-contain border-2 border-cyan-500 rounded-md shadow-md"
                          />

                          {/* Menu lateral estilizado */}
                          {menuAbertoIndex === index && (
                            <div className="absolute top-1/2 left-full ml-3 -translate-y-1/2 bg-gray-900 text-white p-2 rounded-md shadow-lg w-28 space-y-1 border border-cyan-500">
                              <button
                                className="block w-full text-left px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600 transition"
                                onClick={() => handleEquipar(item.id)}
                              >
                                Equipar
                              </button>
                              <button
                                className="block w-full text-left px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600 transition"
                                onClick={() => handleVender(index)}
                              >
                                Vender
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Informações do item */}
                        <div className="ml-3 space-y-1">
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

      <div>
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
      </div>
    </div>
  );
};

export default Base;
