import React from "react";
import { GiCrossedSwords, GiShield } from "react-icons/gi";
import gunsImg from "../data/Arma";
import { useUser } from "../context/UserContext";

const ItemModal = ({ item, onClose }) => {
  const { userLogin, logout } = useUser();
  if (!item) return null;

  const selectImgGund = (id) => {
    const gun = gunsImg.find((g) => g.id === id);
    return gun ? gun.img : "";
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
    } catch (error) {
      console.error("Erro ao enviar para o back-end:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8 rounded-xl shadow-2xl w-[500px] flex flex-col items-center space-y-6 border-2 border-cyan-500">
        <h2 className="text-cyan-300 text-3xl font-extrabold tracking-wider shadow-md">
          {item.nome}
        </h2>

        <img
          src={selectImgGund(item.id)}
          alt={item.nome}
          className="w-40 h-40 border-4 border-cyan-500 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
        />

        <ul className="  from-gray-800 via-black to-gray-900 p-6 rounded-xl w-full space-y-4 text-gray-300">
          <li className="flex justify-between border-b border-gray-600 pb-2">
            <span className="font-bold">Vida</span>
            <span>{item.vida}</span>
          </li>
          <li className="flex justify-between border-b border-gray-600 pb-2">
            <span className="font-bold">Ataque</span>
            <span>{item.dano}</span>
          </li>
          <li className="flex justify-between border-b border-gray-600 pb-2">
            <span className="font-bold">Chance Crítico</span>
            <span>{item.defesa}</span>
          </li>
          <li className="flex justify-between border-b border-gray-600 pb-2">
            <span className="font-bold">Multiplicador Crítico</span>
            <span>{item.chance_critico}</span>
          </li>
          <li className="flex justify-between border-b border-gray-600 pb-2">
            <span className="font-bold">Multiplicador Crítico</span>
            <span>{item.multiplicador_critico}</span>
          </li>
        </ul>

        <button
          className="w-full mt-4 bg-red-600 hover:bg-red-700 text-xl font-bold p-4 rounded-md shadow-lg transition-transform transform hover:scale-105"
          onClick={onClose}
        >
          Fechar
        </button>
        <button
          className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-xl font-bold p-4 rounded-md shadow-lg transition-transform transform hover:scale-105"
          onClick={() => {
            handleEquipar(item.id);
            onClose();
          }}
        >
          Equipar Agora!
        </button>
      </div>
    </div>
  );
};

export default ItemModal;
