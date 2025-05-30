import React from "react";
import { Link } from "react-router-dom";
import { useCharacter } from "../context/useCharacter";
import { motion } from "framer-motion"; 
import { AiFillHeart, AiOutlineThunderbolt } from "react-icons/ai";
import { GiShield, GiCrossedSwords } from "react-icons/gi";
import {
  FaHome,
  FaMapMarkedAlt,
  FaChessRook,
  FaHouseUser,
} from "react-icons/fa";

const Navbar = () => {
  const { character } = useCharacter();
 

  return (
    <nav className="fixed w-full z-50 flex justify-between items-center ">
      {/* Card animado */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="bg-gradient-to-br from-blue-800/60 via-gray-800/60 to-black/60 text-white p-8 w-[22%] h-48 flex items-center  border-[3px] border-cyan-400 rounded-xl shadow-[0_0_20px_5px_rgba(0,255,255,0.3)] m-4"
      >
        <div   className="relative">
          <img
            src={character.image}
            alt={character.name}
            className="w-32 h-32  shadow-[0_0_20px_rgba(0,255,255,0.6)] object-cover"
          />
          <div className="absolute -bottom-2 right-0 bg-cyan-500 text-xs px-2 py-1 rounded-lg font-bold shadow-md animate-pulse">
            Herói
          </div>
        </div>

        <div className="flex flex-col gap-1 p-4 w-full">
          <h2 className="text-xl font-extrabold text-yellow-400 drop-shadow-md">
            {character.name}
          </h2>

          {/* Barra de vida */}
          <div className="w-full bg-gray-700 rounded-full h-3 mt-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${character.health}%` }}
              transition={{ duration: 1 }}
              className="h-3 bg-pink-500 rounded-full"
            />
          </div>
          <p className="text-sm flex items-center gap-1 mt-2">
            <AiFillHeart className="text-pink-400" />
            <span>{character.health} Vida</span>
          </p>
          <p className="text-sm flex items-center gap-1">
            <GiCrossedSwords className="text-red-400" />
            <span>{character.attack} Ataque</span>
          </p>
          <p className="text-sm flex items-center gap-1">
            <AiOutlineThunderbolt className="text-orange-400" />
            <span>{character.critChance}% Crítico</span>
          </p>
          <p className="text-sm flex items-center gap-1">
            <GiShield className="text-blue-400" />
            <span>{character.defense} Defesa</span>
          </p>
        </div>
      </motion.div>

      {/* Menu */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
        className="relative top-40 px-10 justify-end items-center rounded-bl-xl  "
      >
        <ul className="space-x-6">
          <li>
            <Link
              to="/"
              className="flex  my-4 items-center gap-3 text-white w-44 font-semibold backdrop-blur-lg bg-gradient-to-r from-blue-900 via-cyan-500 to-blue-900 shadow-lg border-2 border-cyan-500 text-lg tracking-wide hover:scale-110 hover:text-yellow-300 transition-transform duration-300 ease-in-out rounded-lg px-4 py-2"
            >
              <FaHome className="text-yellow-300 text-xl animate-pulse" />{" "}
              {/* Ícone de casa com efeito */}
              Início
            </Link>
          </li>
          <li>
            <Link
              to="/map"
              className="flex items-center gap-3 text-white w-44 font-semibold backdrop-blur-lg bg-gradient-to-r from-blue-900 via-cyan-500 to-blue-900 shadow-lg border-2 border-cyan-500 text-lg tracking-wide hover:scale-110 hover:text-yellow-300 transition-transform duration-300 ease-in-out rounded-lg px-4 py-2"
            >
              <FaMapMarkedAlt className="text-yellow-300 text-xl animate-pulse" />{" "}
              {/* Ícone de mapa com efeito */}
              Mapa
            </Link>
          </li>
        </ul>

        <ul className="space-x-6">
          <li>
            <Link
              to="/torre"
              className="flex  my-4 items-center gap-3 text-white w-44 font-semibold backdrop-blur-lg bg-gradient-to-r from-gray-800 via-blue-500 to-gray-800 shadow-lg border-2 border-blue-500 text-lg tracking-wide hover:scale-110 hover:text-yellow-300 transition-transform duration-300 ease-in-out rounded-lg px-4 py-2"
            >
              <FaChessRook className="text-yellow-300 text-xl animate-pulse" />{" "}
              {/* Ícone de torre com efeito */}
              Torre
            </Link>
          </li>
          <li>
            <Link
              to="/map"
              className="flex items-center gap-3 text-white w-44 font-semibold backdrop-blur-lg bg-gradient-to-r from-gray-800 via-blue-500 to-gray-800 shadow-lg border-2 border-blue-500 text-lg tracking-wide hover:scale-110 hover:text-yellow-300 transition-transform duration-300 ease-in-out rounded-lg px-4 py-2"
            >
              <FaHouseUser className="text-yellow-300 text-xl animate-pulse" />{" "}
              {/* Ícone de abrigo com efeito */}
              Abrigo
            </Link>
          </li>
        </ul>
      </motion.div>
    </nav>
  );
};

export default Navbar;
