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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white p-8 rounded-xl shadow-2xl w-[450px] flex flex-col items-center space-y-4">
        <h2 className="text-cyan-300 text-2xl font-bold">{item.nome}</h2>

        <img
          src={selectImgGund(item.id)}
          alt={item.nome}
          className="w-32 h-32 border-4 border-cyan-500 rounded-lg shadow-md"
        />

        <div className="w-full text-center space-y-2">
          <p className="text-yellow-300 flex items-center text-lg">
            <GiCrossedSwords className="text-orange-400 mr-2" /> {item.dano}
          </p>
          <p className="text-green-300 flex items-center text-lg">
            <GiShield className="text-blue-400 mr-2" /> {item.defesa}
          </p>
        </div>

        <button
          className="w-full mt-4 bg-red-500 hover:bg-red-600 text-lg font-semibold p-3 rounded-md shadow-md"
          onClick={onClose}
        >
          Fechar
        </button>
        <button
          className="w-full mt-4 bg-red-500 hover:bg-red-600 text-lg font-semibold p-3 rounded-md shadow-md"
          onClick={()=> handleEquipar(item.id)  }
        >
          Equipar
        </button>
      </div>
    </div>
  );
};

export default ItemModal;
