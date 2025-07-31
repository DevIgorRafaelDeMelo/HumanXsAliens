import React, { useEffect, useState } from "react";
import gunsImg from "../data/Arma";
import { useUser } from "../context/UserContext";
import { GiToolbox } from "react-icons/gi";
import { FaDollarSign } from "react-icons/fa";
import medKitImg from "../data/MedKit";

const ItemModal = ({ item, onClose, equip, medKit }) => {
  const [characters, setCharacters] = useState([]);
  const { userLogin } = useUser();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [vendaIndex, setVendaIndex] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [showResultModal, setShowResultModal] = useState(false);
  const [statusModal, setStatusModal] = useState();
  const [selectedItem] = useState(item);
  const [update, setUpdate] = useState();
  const [modalUpdate, setModalUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nivelItem, setNivelItem] = useState();
  const [defItem, setDefItem] = useState();
  const [vidaItem, setVidaItem] = useState();
  const [critItem, setCritItem] = useState();
  const [mulCritItem, setMulCritItem] = useState();
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    if (!medKit) {
      setNivelItem(item.NV_ITEM || item.NIVEL);
      setDefItem(item.DEFESA || item.DEFESSA);
      setVidaItem(item.USER_ITEM_VIDA || item.VIDA);
      setCritItem(item.USER_ITEM_CRITICO || item.CRITICO);
      setMulCritItem(item.USER_ITEM_MULTIPLI_CRITICO || item.MULTIPLO_CRITICO);
    }
  }, [medKit, item]);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const res = await fetch(`http://192.168.20.198:5000/characters`, {
          headers: {
            Authorization: `Bearer ${userLogin.token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (res.ok) {
          setCharacters(data.characters);
        } else {
          alert(`Erro ao buscar personagens: ${data.message}`);
        }
      } catch (error) {
        alert("Erro ao conectar com o servidor.");
        console.error("Erro de conexão:", error);
      }
    }
    fetchCharacters();
  }, [userLogin]);
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
      setTimeout(() => {}, 1000);
    }
  };
  const selectImgMedKit = (id) => {
    const gun = medKitImg.find((g) => g.ID === id);
    return gun ? gun.img : "";
  };
  const handleEquipar = async (itemId) => {
    try {
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
      setTimeout(() => {}, 1000);
    }
  };

  const handleMed = async (id, quantidade) => {
    try {
      const response = await fetch("http://192.168.20.198:5000/Med", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userLogin.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idMed: id,
          qtd: quantidade,
        }),
      });

      const resultado = await response.json();
      console.log("Resposta do servidor:", resultado);
    } catch (error) {
      console.error("Erro ao medicar:", error);
    }
  };
  const handleBetter = async (itemId) => {
    try {
      const res = await fetch("http://192.168.20.198:5000/Better", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userLogin.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: itemId }),
      });
      const data = await res.json();
      setUpdate(data.Update);
      setNivelItem(data.items.NV_ITEM);
      setDefItem(data.items.DEFESA);
      setCritItem(data.items.USER_ITEM_CRITICO);
      setMulCritItem(data.items.USER_ITEM_MULTIPLI_CRITICO);
      setVidaItem(data.items.USER_ITEM_VIDA);
      if (!res.ok) {
        throw new Error("Erro ao equipar o item!");
      }
    } catch (error) {
      console.error("Erro ao enviar para o back-end:", error);
    } finally {
      setTimeout(() => {}, 1000);
    }
  };
  if (!medKit) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white p-8 rounded-2xl shadow-2xl w-full max-w-md mx-auto flex flex-col items-center space-y-6 border-2 border-cyan-500 relative overflow-hidden">
          <div className="absolute top-4 left-4 bg-cyan-600 text-white font-semibold px-3 py-1 rounded-full shadow text-xs uppercase tracking-wide">
            Nível {nivelItem}
          </div>
          <h2 className="text-cyan-300 text-3xl font-bold tracking-wide shadow-sm text-center">
            {selectedItem.NOME}
          </h2>
          <img
            src={selectImgGund(selectedItem.ID)}
            alt={selectedItem.nome}
            className="w-40 h-40 border-4 border-cyan-500 rounded-xl shadow-xl transform hover:scale-110 transition duration-300"
          />
          <button
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-5 py-3 rounded-lg shadow-lg transition"
            onClick={() => setIsModalOpen(true)}
          >
            Melhorar
          </button>
          <ul className="bg-gray-900 bg-opacity-70 p-6 rounded-xl w-full space-y-3 text-gray-300 shadow-inner border border-gray-700">
            {[
              ["Vida", vidaItem],
              ["Ataque", selectedItem.DANO],
              ["Defesa", defItem],
              ["Crítico", Number(critItem).toFixed(2)],
              ["Multiplicador Crítico", Number(mulCritItem).toFixed(2)],
            ].map(([label, value]) => (
              <li
                key={label}
                className="flex justify-between items-center border-b border-gray-600 pb-2 text-sm"
              >
                <span className="font-bold text-white">{label}</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>

          <button
            className="absolute top-4 right-4 text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center shadow-md transition"
            onClick={onClose}
          >
            ✕
          </button>
          <div className="flex flex-col w-full space-y-4 mt-4">
            {!equip && (
              <>
                <button
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-lg py-3 rounded-md shadow-lg transition hover:scale-105"
                  onClick={() => {
                    handleEquipar(selectedItem.ID);
                    onClose();
                  }}
                >
                  Equipar
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold text-lg py-3 rounded-md shadow-lg transition hover:scale-105"
                  onClick={() => confirmarVenda(item.ID)}
                >
                  Vender
                </button>
              </>
            )}
          </div>
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
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white px-8 py-10 rounded-2xl shadow-2xl w-full max-w-md border border-cyan-600 relative">
              <h3 className="text-3xl font-extrabold mb-6 text-cyan-400 text-center tracking-wide drop-shadow">
                Melhoria do Item
              </h3>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex items-center gap-2">
                  <FaDollarSign className="h-6 w-6 text-green-400" />
                  <p className="text-base text-gray-300 font-medium">
                    Preço em moedas:{" "}
                    <span className="text-white font-bold">
                      {(
                        1230 * selectedItem.NV_ITEM || 1230 * item.NIVEL
                      ).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <GiToolbox className="h-6 w-6 text-blue-400" />
                  <p className="text-base text-gray-300 font-medium">
                    Custo técnico:{" "}
                    <span className="text-white font-bold">
                      {895 * selectedItem.NV_ITEM || 895 * item.NIVEL}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-6 mt-8">
                <button
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition-transform hover:scale-105"
                  onClick={() => {
                    const resultado = handleBetter(selectedItem.ID);

                    setUpdate(resultado);
                    setIsModalOpen(false);
                    setModalUpdate(true);
                  }}
                >
                  Confirmar
                </button>

                <button
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition-transform hover:scale-105"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
              </div>
              <button
                className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
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
        {modalUpdate && (
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white px-8 py-10 rounded-2xl shadow-2xl w-full max-w-md border border-cyan-600 flex flex-col items-center space-y-6">
              <h3 className="text-2xl font-extrabold text-center tracking-wide drop-shadow text-cyan-400">
                {update ? "New Nivel" : "Falha"}
              </h3>
              <div className="flex flex-col items-center space-y-4">
                {update ? (
                  <></>
                ) : (
                  <>
                    <p className="text-base text-gray-300 font-medium text-center">
                      Não foi possível aplicar a melhoria no item. Tente
                      novamente.
                    </p>
                  </>
                )}
              </div>
              {update && (
                <div className="relative text-sm text-gray-200 rounded-2xl p-6 w-full space-y-6">
                  <div className="absolute top-4 right-4 px-4 py-2 rounded-full text-white text-5xl font-black  drop-shadow-xl animate-pulse z-10">
                    NV {nivelItem}
                  </div>
                  <div className="relative flex justify-center">
                    <img
                      src={selectImgGund(selectedItem.ID)}
                      alt={selectedItem.NOME}
                      className="w-44 h-44 border-4 border-cyan-500 rounded-xl shadow-2xl transform hover:scale-105 transition duration-300"
                    />
                  </div>
                  <h4 className="text-xl text-center font-bold text-cyan-400 uppercase tracking-wide">
                    {characters.name}
                  </h4>
                  <div className="text-center space-y-1">
                    <p className="text-lg font-semibold text-white">
                      {selectedItem.NOME} —{" "}
                      <span className="text-cyan-300">
                        {selectedItem.CATEGORIA}
                      </span>
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2 bg-gray-800/60 p-4 rounded-xl shadow-inner text-sm text-gray-100">
                    <div>
                      🗡️ <span className="font-bold">Dano:</span>{" "}
                      {selectedItem.DANO}
                    </div>
                    <div>
                      🛡️ <span className="font-bold">Defesa:</span>{" "}
                      {selectedItem.DEFESA}
                    </div>
                    <div>
                      💥 <span className="font-bold">Crítico:</span>{" "}
                      {selectedItem.CRITICO}
                    </div>
                    <div>
                      🎯 <span className="font-bold">Mult. Crítico:</span>{" "}
                      {selectedItem.MULTIPLO_CRITICO}
                    </div>
                    <div>
                      🏷️ <span className="font-bold">Tier:</span>{" "}
                      {selectedItem.TIER}
                    </div>
                    <div>
                      📈 <span className="font-bold">Nível:</span>{" "}
                      {selectedItem.NV_ITEM}
                    </div>
                  </div>
                </div>
              )}
              <button
                className={`px-6 py-2 font-bold rounded-lg shadow-md transition-transform hover:scale-105 ${
                  update
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
                onClick={() => setModalUpdate(false)}
              >
                Confirmar
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
  }
  if (medKit) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white p-8 rounded-2xl shadow-2xl w-full max-w-md mx-auto flex flex-col items-center space-y-6 border-2 border-cyan-500 relative overflow-hidden">
          <h2 className="text-cyan-300 text-3xl font-bold tracking-wide shadow-sm text-center">
            {selectedItem.NOME}
          </h2>
          <img
            src={selectImgMedKit(selectedItem.ID)}
            alt={selectedItem.NOME}
            className="w-40 h-40 border-4 border-cyan-500 rounded-xl shadow-xl transition duration-300"
          />

          <div className="text-white text-xl font-bold tracking-wide bg-gradient-to-r from-cyan-700 via-cyan-500 to-cyan-600 px-4 py-2 shadow-lg border border-cyan-400">
            {selectedItem.QTD_ITEM}{" "}
            <span className="text-xs text-gray-200 ml-1">UN</span>
          </div>

          <div className="w-full bg-gray-800 text-cyan-300 p-4 rounded-lg shadow-inner mt-2 border border-cyan-600 text-center">
            <p className="text-sm font-semibold">Vida que será recuperada:</p>
            <p className="text-2xl font-bold tracking-wide mt-1">
              {quantidade * item.LIFE_TOTAL} HP
            </p>
          </div>
          <button
            className="absolute top-4 right-4 text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center shadow-md transition"
            onClick={onClose}
          >
            ✕
          </button>

          <div className="flex items-center mt-2 bg-gradient-to-br from-black/80 via-blue-900 to-black/80 px-3 py-2 rounded-lg border-[2px] border-blue-400 shadow-[0_0_10px_#00ffff88]">
            <button
              className="text-white text-xl px-3 py-1 rounded-md hover:bg-blue-800 transition"
              onClick={() => setQuantidade((q) => Math.max(q - 1, 1))}
            >
              −
            </button>
            <span className="text-white px-4 font-bold tracking-wider">
              {quantidade}
            </span>
            <button
              className="text-white text-xl px-3 py-1 rounded-md hover:bg-blue-800 transition"
              onClick={() =>
                setQuantidade((q) => Math.min(q + 1, selectedItem.QTD_ITEM))
              }
            >
              ＋
            </button>
          </div>
          <button
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-lg p-3 rounded-md shadow-lg transition hover:scale-105"
            onClick={() => {
              handleMed(selectedItem.ID, quantidade);
              onClose();
            }}
          >
            Medicar
          </button>
          <div className="flex flex-col w-full space-y-4 mt-4"></div>
        </div>
      </div>
    );
  }
};

export default ItemModal;
