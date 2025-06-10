import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineThunderbolt } from "react-icons/ai";
import { GiShield, GiCrossedSwords } from "react-icons/gi";
import { tiposMilitares } from "../data/militaryTypes";
import { FaSignOutAlt } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userLogin, logout } = useUser();
  const [money, setMoney] = useState();
  const [dano, setDano] = useState();
  const [defessa, setDefessa] = useState();
  const [crit, setCrit] = useState();
  const [vida, setVida] = useState();
  const [critMultiplo, setCritMultiplo] = useState();

  // Definir `character` depois que os dados forem carregados
  const character = characters.length > 0 ? characters[0] : null;

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
          setMoney(data.characters[0].money);
          setVida(
            data.characters[0].BOOT_SPELL[4] +
              data.characters[0].CAPA_SPELL[4] +
              data.characters[0].TORSO_SPELL[4] +
              data.characters[0].GUN_SPELL[4]
          );
          setDano(
            data.characters[0].BOOT_SPELL[0] +
              data.characters[0].CAPA_SPELL[0] +
              data.characters[0].TORSO_SPELL[0] +
              data.characters[0].GUN_SPELL[0]
          );
          setCrit(
            [
              data.characters[0].BOOT_SPELL[2],
              data.characters[0].CAPA_SPELL[2],
              data.characters[0].TORSO_SPELL[2],
              data.characters[0].GUN_SPELL[2],
            ]
              .map((value) => parseFloat(value) || 0) // Converte para número ou usa 0 se inválido
              .reduce((acc, curr) => acc + curr, 0) // Soma os valores
          );
          setCritMultiplo(
            [
              data.characters[0].BOOT_SPELL[3],
              data.characters[0].CAPA_SPELL[3],
              data.characters[0].TORSO_SPELL[3],
              data.characters[0].GUN_SPELL[3],
            ]
              .map((value) => parseFloat(value) || 0) // Converte para número ou usa 0 se inválido
              .reduce((acc, curr) => acc + curr, 0) // Soma os valores
              .toFixed(2) // Mantém apenas duas casas decimais
          );

          setDefessa(
            data.characters[0].BOOT_SPELL[1] +
              data.characters[0].CAPA_SPELL[1] +
              data.characters[0].TORSO_SPELL[1] +
              data.characters[0].GUN_SPELL[1]
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

    fetchCharacters();
  }, [userLogin, navigate, characters]);

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

  if (loading) return <div>Carregando...</div>;

  return (
    <nav className="fixed w-full z-50 flex justify-between items-center ">
      {/* Card animado */}
      <div className="fixed flex z-1 left-8 top-[22vh]  p-2 border-4 border-t-[20px] border-cyan-400  bg-gradient-to-br from-blue-900 via-cyen-500 to-blue-500 text-white  font-bold tracking-widest rounded-b-lg">
        <FaDollarSign className="h-6 me-4 text-green-500  " />{" "}
        <span className="text-white-100">{money}</span>
      </div>
      <div className="fixed top-5 right-5">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-6 py-3 rounded-lg font-bold text-gray-300  border-2  transition-all 
      duration-300 ease-in-out  hover:text-white hover:bg-red-800 bg-black"
        >
          <FaSignOutAlt className="text-white text-xl animate-pulse" />
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="bg-gradient-to-br from-gray-800 via-black to-gray-900 text-white p-2 w-[20%] h-48 flex items-center border-[3px] border-cyan-400 rounded-xl shadow-lg m-4 relative"
      >
        {/* Nível do Personagem - Agora maior e destacado */}
        <div className="absolute -top-4 right-[-10px] bg-cyan-500 text-black text-2xl p-2 py-2 rounded-lg font-extrabold shadow-xl">
          Lvl {character?.level}
        </div>

        {/* Imagem do Personagem */}
        <div className="relative">
          <div className="relative w-40 h-40 overflow-hidden shadow-xl">
            <img
              src={getMilitaryImage(character.tipo_id)}
              alt={character?.name}
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="absolute -bottom-2 right-0 bg-cyan-500 text-xs px-2 py-1 rounded-lg font-bold shadow-md animate-pulse">
            {getMilitaryName(character.tipo_id)}
          </div>
        </div>

        {/* Detalhes do Personagem */}
        <div className="flex flex-col gap-2 p-4 w-full">
          <h2 className="text-xl font-extrabold text-yellow-300 drop-shadow-md text-center">
            {character?.name}
          </h2>

          {/* Barra de Vida */}
          <div className="relative w-full bg-gray-700 rounded-full h-4 overflow-hidden mt-2 shadow-md">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${vida + character?.health_points}%` }}
              transition={{ duration: 1 }}
              className="h-4 bg-red-500 rounded-full"
            />
            <p className="absolute inset-0 flex justify-center items-center text-xs font-bold text-white">
              {vida + character?.health_points} /
              {vida + character?.health_points} HP
            </p>
          </div>

          {/* Barra de XP */}
          <div className="relative w-full bg-gray-700 rounded-full h-3 overflow-hidden mt-2 shadow-md">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${vida}%` }}
              transition={{ duration: 1 }}
              className="h-3 bg-yellow-500 rounded-full"
            />
            <p className="absolute inset-0 flex justify-center items-center text-xs font-bold text-white">
              XP: {character?.exp_points} / {character?.next_level_exp}
            </p>
          </div>

          {/* Atributos do Personagem */}
          <div className="grid grid-cols-2 gap-2 mt-3 text-white text-sm font-semibold">
            <p className="flex items-center gap-2">
              <AiOutlineThunderbolt className="text-red-400" />
              MC:
              {critMultiplo}
            </p>
            <p className="flex items-center gap-2">
              <GiCrossedSwords className="text-orange-400" />
              ATK: {dano}
            </p>
            <p className="flex items-center gap-2">
              <AiOutlineThunderbolt className="text-yellow-400" />
              CC: {crit}%
            </p>
            <p className="flex items-center gap-2">
              <GiShield className="text-blue-400" />
              DEF: {defessa}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Menu */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          type: "spring",
          stiffness: 120,
        }}
        className="relative top-40 px-10 justify-end items-center  "
      >
        {" "}
        {/* Primeira lista de links */}
        <ul className="space-y-4">
          <li>
            <Link
              to="/lobby"
              className="flex items-center justify-between w-44 font-semibold text-gray-300 bg-gradient-to-r from-blue-900 via-cyan-500 to-blue-900 shadow-[0_4px_15px_#00ffff55] border-2 border-cyan-500 text-lg tracking-wide hover:scale-105 hover:text-yellow-300 transition-all duration-300 ease-in-out rounded-lg px-4 py-3"
            >
              Início
            </Link>
          </li>
          <li>
            <Link
              to="/map"
              className="flex items-center justify-between w-44 font-semibold text-gray-300 bg-gradient-to-r from-blue-900 via-cyan-500 to-blue-900 shadow-[0_4px_15px_#00ffff55] border-2 border-cyan-500 text-lg tracking-wide hover:scale-105 hover:text-yellow-300 transition-all duration-300 ease-in-out rounded-lg px-4 py-3"
            >
              Mapa
            </Link>
          </li>
        </ul>
        {/* Segunda lista de links */}
        <ul className="space-y-4 mt-4">
          <li>
            <Link
              to="/torre"
              className="flex items-center justify-between w-44 font-semibold text-gray-300 bg-gradient-to-r from-gray-800 via-blue-500 to-gray-800 shadow-[0_4px_15px_#0084ff55] border-2 border-blue-500 text-lg tracking-wide hover:scale-105 hover:text-yellow-300 transition-all duration-300 ease-in-out rounded-lg px-4 py-3"
            >
              Torre
            </Link>
          </li>
          <li>
            <Link
              to="/base"
              className="flex items-center justify-between w-44 font-semibold text-gray-300 bg-gradient-to-r from-gray-800 via-blue-500 to-gray-800 shadow-[0_4px_15px_#0084ff55] border-2 border-blue-500 text-lg tracking-wide hover:scale-105 hover:text-yellow-300 transition-all duration-300 ease-in-out rounded-lg px-4 py-3"
            >
              Base
            </Link>
          </li>
        </ul>
      </motion.div>
    </nav>
  );
};

export default Navbar;
