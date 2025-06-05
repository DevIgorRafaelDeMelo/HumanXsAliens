import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import background from "../Img/Home.png";
import MKT from "../Img/MKT.png";
import { motion } from "framer-motion";
import COM from "../Img/COM.png";
import INF from "../Img/MEN.png";
import HOS from "../Img/MED.png";
import CharacterCard from "../Components/CharacterCard";
import gunsImg from "../data/Arma";

const Lobby = () => {
  const { userLogin, logout } = useUser();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Mercado Negro");
  const [guns, setGuns] = useState();
  const [selectedGun, setSelectedGun] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!userLogin) {
      navigate("/"); // Se não está logado, vai para auth
      return;
    }

    async function fetchCharacters() {
      try {
        const res = await fetch("http://localhost:5000/characters", {
          headers: {
            Authorization: `Bearer ${userLogin.token}`, // assumindo que o token veio na resposta do login
          },
        });
        const data = await res.json();
        if (res.ok) {
          setCharacters(data.characters);
          setGuns(data.guns);
        } else {
        }
      } catch (error) {
        alert("Erro ao conectar com o servidor");
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
  // Se tem personagem(s), pode mostrar lista ou ir direto para o personagem principal
  if (characters.length === 0) {
    // Se não tem personagens, redireciona ou mostra botão para criar personagem
    return <CharacterCard user={userLogin} />;
  }

  const handleConfirmPurchase = async (gunId) => {
    try {
      const response = await fetch("http://localhost:5000/buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userLogin.token}`, // se estiver autenticado
        },
        body: JSON.stringify({ gunId }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Arma selecionada com sucesso!");
        setShowModal(false);
      } else {
        alert(data.message || "Erro ao selecionar a arma.");
      }
    } catch (error) {
      alert("Erro na comunicação com o servidor.");
    }
  };
  const handleSelectGun = (gun) => {
    setSelectedGun(gun); // salva os dados da arma
    setShowModal(true); // mostra o modal
  };

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
      {selectedOption === "Mercado Negro" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex justify-end items-center h-[60vh] mt-40 w-[100vh] bg-cover bg-center p-10  relative border-[6px] border-cyan-500 shadow-[0_0_50px_cyan] rounded-xl hover:scale-105 transition-transform"
          style={{
            backgroundImage: `url(${MKT})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "50vh",
          }}
        >
          <div className="bg-gradient-to-br from-black/70 via-blue-900 to-black/70 backdrop-blur-md  rounded-xl border-[6px] border-cyan-500/80 border-t-[8px] border-t-blue-500  w-[70%] h-[90%] flex flex-col items-center   relative ">
            <h2 className="text-3xl font-extrabold text-cyan-400 py-4 tracking-wide">
              {selectedOption}
            </h2>
            <ul className="w-full pt-10 grid grid-cols-2 gap-4 overflow-y-auto max-h custom-scroll pr-2 scroll-fade-mask py-10">
              {guns?.map((gun) => (
                <li
                  onClick={() => handleSelectGun(gun)}
                  key={gun.id}
                  className="flex items-center  bg-gradient-to-br mx-4 from-black/80 via-blue-950 to-black/80 text-white px-4 py-3 rounded-xl border-[2px] border-cyan-400 shadow-[0_0_15px_#00ffff80] transition-transform transform  hover:shadow-[0_0_30px_#00ffffcc] duration-300"
                >
                  <div className="relative">
                    <img
                      src={selectImgGund(gun.id)}
                      alt={gun.nome}
                      className="w-16 h-16 object-contain mr-4 rounded-md border-2 border-cyan-500 shadow-[0_0_10px_#00ffff88]"
                    />
                    <div className="absolute top-0 right-0 bg-cyan-500 text-black text-xs px-1 rounded-bl-md font-bold shadow-sm">
                      Lv. {gun.nivel}
                    </div>
                  </div>
                  <div>
                    <p className="text font-extrabold text-cyan-400 tracking-wide">
                      {gun.nome}
                    </p>
                    <p className="text-sm text-yellow-400 font-semibold">
                      ⚔️ Dano: {gun.dano}
                    </p>
                    <p className="text-sm text-green-400 font-semibold">
                      💰 Valor: ${gun.valor}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="absolute bottom-0 w-[80%] h-[6px] bg-cyan-500  rounded-full" />

            {/* Texto com melhor espaçamento e leitura */}
            <p className="text-gray-200 text-lg mt-4"></p>
          </div>
        </motion.div>
      )}
      {selectedOption === "Hospital" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex justify-start items-center h-[60vh] mt-40 w-[100vh] bg-cover bg-center p-20 relative border-[6px] border-cyan-500 shadow-[0_0_50px_cyan] rounded-xl hover:scale-105 transition-transform"
          style={{
            backgroundImage: `url(${HOS})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "50vh",
          }}
        >
          <div className="bg-gradient-to-br from-black/70 via-blue-900 to-black/70 backdrop-blur-md p-8 rounded-xl border-[6px] border-cyan-500/80 border-t-[8px] border-t-blue-500  w-[70%] h-[100%] flex flex-col items-center justify-center relative ">
            {/* Efeito neon no título */}
            <h2 className="text-3xl font-extrabold text-cyan-400  tracking-wide">
              {selectedOption} selecionado!
            </h2>

            {/* Barra luminosa inferior */}
            <div className="absolute bottom-0 w-[80%] h-[6px] bg-cyan-500  rounded-full" />

            {/* Texto com melhor espaçamento e leitura */}
            <p className="text-gray-200 text-lg mt-4">
              Aqui está o conteúdo da opção{" "}
              <span className="font-bold text-cyan-300">{selectedOption}</span>.
            </p>
          </div>
        </motion.div>
      )}
      {selectedOption === "Comandante" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex justify-center items-center h-[60vh] mt-40 w-[100vh] bg-cover bg-center p-10 pt-80 relative border-[6px] border-cyan-500 shadow-[0_0_50px_cyan] rounded-xl hover:scale-105 transition-transform"
          style={{
            backgroundImage: `url(${COM})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "50vh",
          }}
        >
          <div className="bg-gradient-to-br from-black/70 via-blue-900 to-black/70 backdrop-blur-md p-8 rounded-xl border-[6px] border-cyan-500/80 border-t-[8px] border-t-blue-500  w-[80%] h-[100%] flex flex-col items-center justify-center relative ">
            {/* Efeito neon no título */}
            <h2 className="text-3xl font-extrabold text-cyan-400  tracking-wide">
              {selectedOption} selecionado!
            </h2>

            {/* Barra luminosa inferior */}
            <div className="absolute bottom-0 w-[80%] h-[6px] bg-cyan-500  rounded-full" />

            {/* Texto com melhor espaçamento e leitura */}
            <p className="text-gray-200 text-lg mt-4">
              Aqui está o conteúdo da opção{" "}
              <span className="font-bold text-cyan-300">{selectedOption}</span>.
            </p>
          </div>
        </motion.div>
      )}
      {selectedOption === "Informante" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex justify-center items-center h-[60vh] mt-40 w-[100vh] bg-cover bg-center p-20 pt-80 relative border-[6px] border-cyan-500 shadow-[0_0_50px_cyan] rounded-xl hover:scale-105 transition-transform"
          style={{
            backgroundImage: `url(${INF})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "50vh",
          }}
        >
          <div className="bg-gradient-to-br from-black/70 via-blue-900 to-black/70 backdrop-blur-md p-8 rounded-xl border-[6px] border-cyan-500/80 border-t-[8px] border-t-blue-500  w-[80%] h-[50%] flex flex-col items-center justify-center relative ">
            {/* Efeito neon no título */}
            <h2 className="text-3xl font-extrabold text-cyan-400  tracking-wide">
              {selectedOption} selecionado!
            </h2>

            {/* Barra luminosa inferior */}
            <div className="absolute bottom-0 w-[80%] h-[6px] bg-cyan-500  rounded-full" />

            {/* Texto com melhor espaçamento e leitura */}
            <p className="text-gray-200 text-lg mt-4">
              Aqui está o conteúdo da opção{" "}
              <span className="font-bold text-cyan-300">{selectedOption}</span>.
            </p>
          </div>
        </motion.div>
      )}

      {/* Barra Inferior ajustada */}
      <div className="fixed bottom-20 w-[60%] bg-gray-900 p-4 flex justify-between rounded-t-xl shadow-lg border-[4px] border-gray-700">
        {["Mercado Negro", "Hospital", "Comandante", "Informante"].map(
          (option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(option)}
              className="flex-1 text-white bg-gradient-to-r from-cyan-600 to-blue-800 px-5 py-3 mx-2 rounded-lg shadow-md border-[2px] border-cyan-400 hover:shadow-xl   transition-transform active:scale-95 font-bold text-xl tracking-wider"
            >
              {option}
            </button>
          )
        )}
      </div>
      {showModal && selectedGun && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-gradient-to-br from-black/80 via-blue-950 to-black/80 p-6 rounded-xl border-4 border-cyan-400 shadow-[0_0_20px_#00ffff88] w-[90%] max-w-md">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4 text-center">
              Confirmar Compra
            </h2>
            <div className="flex items-center mb-4">
              <img
                src={selectImgGund(selectedGun.id)}
                alt={selectedGun.nome}
                className="w-20 h-20 mr-4 rounded-md border-2 border-cyan-500 shadow"
              />
              <div>
                <p className="text-white font-semibold">{selectedGun.nome}</p>
                <p className="text-yellow-400">⚔️ Dano: {selectedGun.dano}</p>
                <p className="text-green-400">💰 Valor: ${selectedGun.valor}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleConfirmPurchase(selectedGun.id)}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lobby;
