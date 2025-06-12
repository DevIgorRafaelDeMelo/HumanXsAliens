import React, { useState, useEffect } from "react";
import Img from "../Img/city.png";
import FUZ from "../Img/FUZ.jpeg";
import FUZ2 from "../Img/FUZ2.jpeg";
import MED from "../Img/MED.jpeg";
import MED2 from "../Img/MED2.jpeg";
import ATR from "../Img/ATR.jpeg";
import ATR2 from "../Img/ATR2.jpeg";
import ENG from "../Img/ENG.jpeg";
import ENG2 from "../Img/ENG2.jpeg";
import { useUser } from "../context/UserContext";

import { useNavigate } from "react-router-dom";

const CharacterCard = ({ onCharacterCreated, user }) => {
  const [name, setName] = useState("");
  const { userLogin, logout } = useUser();
  const [tipoId, setTipoId] = useState("");
  const navigate = useNavigate();
  const [generoSelecionado, setGeneroSelecionado] = useState("homens");
  const tiposMilitares = {
    homens: [
      {
        id: 1,
        name: "Fuzileiro",
        image: FUZ,
        description:
          "Soldado especializado em operações terrestres e aquáticas.",
      },
      {
        id: 2,
        name: "Atirador",
        image: ATR,
        description:
          "Especialista em disparos de precisão e combate à distância.",
      },
      {
        id: 3,
        name: "Paramédico",
        image: MED,
        description:
          "Responsável pelo suporte médico e resgate no campo de batalha.",
      },
      {
        id: 4,
        name: "Engenheiro",
        image: ENG,
        description:
          "Especialista em construção, manutenção e desativação de armadilhas.",
      },
    ],
    mulheres: [
      {
        id: 5,
        name: "Fuzileiro",
        image: FUZ2, // Substitua pela imagem correspondente
        description:
          "Soldada especializada em operações terrestres e aquáticas.",
      },
      {
        id: 6,
        name: "Atiradora",
        image: ATR2, // Substitua pela imagem correspondente
        description:
          "Especialista em disparos de precisão e combate à distância.",
      },
      {
        id: 7,
        name: "Paramédica",
        image: MED2, // Substitua pela imagem correspondente
        description:
          "Responsável pelo suporte médico e resgate no campo de batalha.",
      },
      {
        id: 8,
        name: "Engenheira",
        image: ENG2, // Substitua pela imagem correspondente
        description:
          "Especialista em construção, manutenção e desativação de armadilhas.",
      },
    ],
  };

  useEffect(() => {
    if (!userLogin) {
      navigate("/auth"); // Se não está logado, vai para auth
      return;
    }
  }, [userLogin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !tipoId) {
      alert("Preencha nome e selecione um tipo");
      return;
    }

    try {
      // pegar token do localStorage
      const response = await fetch("http://192.168.20.198:5000/registerCharater", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ ESSENCIAL
          Authorization: `Bearer ${userLogin.token}`,
        },
        body: JSON.stringify({ name, tipo_id: tipoId, user_id: userLogin.id }),
      });

      const data = await response.json();

      if (response.ok) {
        onCharacterCreated && onCharacterCreated(data.character); // callback para atualizar estado pai
        navigate("/Lobby");
      } else {
        alert(`Erro: ${data.message || "Não foi possível cadastrar"}`);
      }
    } catch (err) {
      console.error("Erro ao conectar com o servidor:", err);
      alert(
        "Erro ao conectar com o servidor. Verifique sua conexão e tente novamente."
      );
    }
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center relative">
      {/* Imagem de fundo */}
      <img
        src={Img}
        alt="Imagem centralizada"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Card sobre a imagem */}
      <div className="w-[80%] text-center p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-2xl border-2 border-purple-600 relative z-10">
        <h2 className="text-3xl font-extrabold mb-6 text-purple-400 tracking-wide drop-shadow-lg">
          Cadastrar Personagem
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-300 uppercase tracking-wide">
              Nome
            </label>
            <input
              type="text"
              placeholder="Nome do personagem"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-80 rounded-md bg-gray-800 text-gray-200 placeholder-gray-500 border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent px-4 py-3 transition"
            />
          </div>

          <div>
            <label className="block mb-4 font-semibold text-gray-300 uppercase tracking-wide text-lg">
              Sexo
            </label>

            <div className="flex justify-center gap-4 mb-6">
              <button
                type="button"
                onClick={() => setGeneroSelecionado("homens")}
                className={`px-6 py-3 font-bold rounded-md transition ${
                  generoSelecionado === "homens"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                Masculino
              </button>

              <button
                type="button"
                onClick={() => setGeneroSelecionado("mulheres")}
                className={`px-6 py-3 font-bold rounded-md transition ${
                  generoSelecionado === "mulheres"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                Feminino
              </button>
            </div>

            {/* Grid para exibir os cards do tipo militar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {tiposMilitares[generoSelecionado].map((tipo) => (
                <div
                  key={tipo.id}
                  onClick={() => setTipoId(tipo.id)}
                  className={`cursor-pointer flex flex-col items-center bg-gray-900 rounded-lg border-2 ${
                    tipoId === tipo.id
                      ? "border-purple-500 ring-2 ring-purple-400"
                      : "border-gray-700"
                  } p-6 transition-transform transform hover:scale-110 hover:shadow-lg hover:shadow-purple-600`}
                >
                  <img
                    src={tipo.image}
                    alt={tipo.name}
                    className="w-48 h-72 object-cover rounded-md mb-4 border-4 border-gray-700   transition"
                  />
                  <h3 className="text-purple-400 font-extrabold text-lg tracking-wide uppercase">
                    {tipo.name}
                  </h3>
                  <p className="text-gray-300 text-sm text-center italic">
                    {tipo.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-80 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-md shadow-lg tracking-wide transition-transform transform hover:scale-105"
          >
            Alistar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CharacterCard;
