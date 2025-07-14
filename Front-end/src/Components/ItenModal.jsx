import React, { useEffect, useState } from "react";
import gunsImg from "../data/Arma";
import { useUser } from "../context/UserContext";

const ItemModal = ({ item, onClose }) => {
  const { userLogin, logout } = useUser();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [vendaIndex, setVendaIndex] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [showResultModal, setShowResultModal] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [statusModal, setStatusModal] = useState();
  const [recarregando, setRecarregando] = useState(false);
  const [selectedItem, setSelectedItem] = useState(item);
  const [nivelItem, setNivelItem] = useState(item.NIVEL);
  const [defItem, setDefItem] = useState(item.DEFESA || item.DEFESSA);

  useEffect(() => {
    if (!item) return null;
  }, [item]);

  const confirmarVenda = (index) => {
    setVendaIndex(index);
    setShowConfirmModal(true);
  };

  const selectImgGund = (id) => {
    const gun = gunsImg.find((g) => g.id === id);
    return gun ? gun.img : "";
  };
  const handleVender = async () => {
    try {
      setRecarregando(true);
      const res = await fetch("http://192.168.20.198:5000/vender", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userLogin.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: vendaIndex }),
      });

      const data = await res.json();

      setStatusModal(data.STATUS);

      const formattedScrap = new Intl.NumberFormat("pt-BR").format(
        data.scrapGanho
      );
      setModalMessage(
        `A quebra desse item gerou <span class="text-yellow-300 font-extrabold">${formattedScrap}</span> scraps!`
      );
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setShowConfirmModal(false);
      setShowResultModal(true);
      setTimeout(() => {
        setRecarregando(false);
      }, 1000);
    }
  };
  const handleEquipar = async (itemId) => {
    try {
      setRecarregando(true);

      const res = await fetch("http://192.168.20.198:5000/equipar", {
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
    } catch (error) {
      console.error("Erro ao enviar para o back-end:", error);
    } finally {
      setTimeout(() => {
        setRecarregando(false);
      }, 1000);
    }
  };
  const handleBetter = async (itemId) => {
    try {
      setRecarregando(true);

      const res = await fetch("http://192.168.20.198:5000/Better", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userLogin.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: itemId }),
      });
      const data = await res.json();
      setSelectedItem(data.items);
      setNivelItem(data.items.NV_ITEM);
      setDefItem(data.items.DEFESA)
      if (!res.ok) {
        throw new Error("Erro ao equipar o item!");
      }
    } catch (error) {
      console.error("Erro ao enviar para o back-end:", error);
    } finally {
      setTimeout(() => {
        setRecarregando(false);
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8 rounded-xl shadow-2xl w-[500px] flex flex-col items-center space-y-6 border-2 border-cyan-500">
        <div className="relative top-4 left-4 bg-cyan-700 text-white font-bold px-3 py-1 rounded-md shadow-md text-sm">
          Nível {nivelItem}
        </div>

        <h2 className="text-cyan-300 text-3xl font-extrabold tracking-wider shadow-md">
          {selectedItem.NOME}
        </h2>

        <img
          src={selectImgGund(selectedItem.ID)}
          alt={selectedItem.nome}
          className="w-40 h-40 border-4 border-cyan-500 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
        />
        <button
          className="  mt-4 px-6 bg-green-600 hover:bg-green-700 text-xl font-bold p-4 rounded-md shadow-lg transition-transform transform hover:scale-105"
          onClick={() => handleBetter(selectedItem.ID)}
        >
          Melhorar
        </button>

        <ul className="  from-gray-800 via-black to-gray-900 p-6 rounded-xl w-full space-y-4 text-gray-300">
          <li className="flex justify-between border-b border-gray-600 pb-2">
            <span className="font-bold">Vida</span>
            <span>{selectedItem.VIDA}</span>
          </li>
          <li className="flex justify-between border-b border-gray-600 pb-2">
            <span className="font-bold">Ataque</span>
            <span>{selectedItem.DANO}</span>
          </li>
          <li className="flex justify-between border-b border-gray-600 pb-2">
            <span className="font-bold">Defesa</span>
            <span>{defItem}</span>
          </li>
          <li className="flex justify-between border-b border-gray-600 pb-2">
            <span className="font-bold">Multiplicador Crítico</span>
            <span>{selectedItem.CRITICO}</span>
          </li>
          <li className="flex justify-between border-b border-gray-600 pb-2">
            <span className="font-bold">Multiplicador Crítico</span>
            <span>{selectedItem.MULTIPLO_CRITICO}</span>
          </li>
        </ul>

        <button
          className="absolute top-10 right-10 text-white bg-red-600 hover:bg-red-700 font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-md"
          onClick={onClose}
        >
          ✕
        </button>

        <button
          className="w-full mt-4 bg-cyan-600 hover:bg-cyan-400 text-xl font-bold p-4 rounded-md shadow-lg transition-transform transform hover:scale-105"
          onClick={() => {
            handleEquipar(selectedItem.ID);
            onClose();
          }}
        >
          Equipar
        </button>

        <button
          className="w-full mt-4 bg-red-600 hover:bg-red-700 text-xl font-bold p-4 rounded-md shadow-lg transition-transform transform hover:scale-105"
          onClick={() => confirmarVenda(item.ID)}
        >
          Vender
        </button>
      </div>
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 rounded-xl shadow-2xl w-[400px] flex flex-col items-center space-y-6 border-2 border-cyan-500">
            <h3 className="text-cyan-300 text-2xl font-extrabold tracking-wide shadow-md text-center">
              Deseja confirmar a venda?
            </h3>

            <div className="flex w-full justify-between gap-4">
              <button
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancelar
              </button>
              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105"
                onClick={handleVender}
              >
                Confirmar Venda
              </button>
            </div>
          </div>
        </div>
      )}
      {statusModal && showResultModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 rounded-xl shadow-2xl w-[400px] flex flex-col items-center space-y-6 border-2 border-cyan-500">
            <h3
              className="text-center text-lg"
              dangerouslySetInnerHTML={{ __html: modalMessage }}
            ></h3>
            <button
              className="bg-cyan-600 hover:bg-cyan-400 text-white font-bold px-6 py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
              onClick={() => {
                setShowResultModal(false);
                onClose();
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
      {!statusModal && showResultModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 rounded-xl shadow-2xl w-[400px] flex flex-col items-center space-y-6 border-2 border-cyan-500">
            <h3 className="text-center text-lg">Esse item está equipado</h3>
            <button
              className="bg-cyan-600 hover:bg-cyan-400 text-white font-bold px-6 py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
              onClick={() => {
                setShowResultModal(false);
                onClose();
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemModal;
