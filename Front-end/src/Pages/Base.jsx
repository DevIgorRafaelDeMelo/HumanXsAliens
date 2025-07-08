import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GiShield, GiCrossedSwords } from "react-icons/gi";
import { tiposMilitares } from "../data/militaryTypes";
import { useUser } from "../context/UserContext";
import Navbar from "../Components/Navbar";
import gunsImg from "../data/Arma";
import ItemModal from "../Components/ItenModal";

const Base = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userLogin, logout } = useUser();
  const character = characters.length > 0 ? characters[0] : null;
  const [depositoItens, setDepositoItens] = useState([]);
  const [itens, setItens] = useState([]);
  const [capa, setCapa] = useState();
  const [arma, setArma] = useState();
  const [torso, setTorso] = useState();
  const [boot, setBoot] = useState();
  const [dano, setDano] = useState();
  const [defessa, setDefessa] = useState();
  const [crit, setCrit] = useState();
  const [vida, setVida] = useState();
  const [critMultiplo, setCritMultiplo] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showInfoArma, setShowInfoArma] = useState(false);
  const [showInfoTorso, setShowInfoTorso] = useState(false);
  const [showInfoCapa, setShowInfoCapa] = useState(false);
  const [showInfoBoot, setShowInfoBoot] = useState(false);
  const [guns, setGuns] = useState();
  const [itemEquip, setItemEquip] = useState([]);
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
  const [tipoSelecionado, setTipoSelecionado] = useState("Todos");

  const depositoItensArray =
    typeof depositoItens === "string"
      ? JSON.parse(depositoItens)
      : depositoItens;
  const ordenadoArray = Array.isArray(depositoItensArray)
    ? [...depositoItensArray].sort((a, b) => {
        const aIsEquipado = itemEquip.includes(a);
        const bIsEquipado = itemEquip.includes(b);

        if (aIsEquipado && !bIsEquipado) return -1;
        if (!aIsEquipado && bIsEquipado) return 1;
        return 0;
      })
    : [];

  useEffect(() => {
    if (!userLogin?.token || !userLogin?.id) {
      console.error("Token ou ID do usuário ausente.");
      navigate("/");
      return;
    }

    async function fetchCharacters() {
      try {
        const res = await fetch(`http://192.168.20.198:5000/characters`, {
          headers: {
            Authorization: `Bearer ${userLogin.token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setGuns(data.guns);
        if (res.ok) {
          setCharacters(data.characters);
          setDepositoItens(data.characters[0].DEPOSITO);
          setItemEquip(data.characters[0].EQUIPADOS);
          setItens(data.guns);
          setCapa(data.characters[0].CAPA);
          setTorso(data.characters[0].TORSO);
          setBoot(data.characters[0].BOOT);
          setArma(data.characters[0].GUN);
          setVida(
            data.characters[0].BOOT_SPELL[0] +
              data.characters[0].CAPA_SPELL[0] +
              data.characters[0].TORSO_SPELL[0] +
              data.characters[0].GUN_SPELL[0]
          );
          setDano(
            data.characters[0].BOOT_SPELL[1] +
              data.characters[0].CAPA_SPELL[1] +
              data.characters[0].TORSO_SPELL[1] +
              data.characters[0].GUN_SPELL[1]
          );
          setCrit(
            [
              data.characters[0].BOOT_SPELL[3],
              data.characters[0].CAPA_SPELL[3],
              data.characters[0].TORSO_SPELL[3],
              data.characters[0].GUN_SPELL[3],
            ]
              .map((value) => parseFloat(value) || 0)
              .reduce((acc, curr) => acc + curr, 0)
          );
          setCritMultiplo(
            [
              data.characters[0].BOOT_SPELL[4],
              data.characters[0].CAPA_SPELL[4],
              data.characters[0].TORSO_SPELL[4],
              data.characters[0].GUN_SPELL[4],
            ]
              .map((value) => parseFloat(value) || 0)
              .reduce((acc, curr) => acc + curr, 0)
              .toFixed(2)
          );
          setDefessa(
            data.characters[0].BOOT_SPELL[2] +
              data.characters[0].CAPA_SPELL[2] +
              data.characters[0].TORSO_SPELL[2] +
              data.characters[0].GUN_SPELL[2]
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
  }, [
    userLogin,
    navigate,
    character,
    capa,
    torso,
    arma,
    boot,
    dano,
    vida,
    crit,
    critMultiplo,
    defessa,
  ]);

  const itensAgrupados = depositoItensArray.reduce((acc, item) => {
    if (!acc[item.TIPO]) {
      acc[item.TIPO] = [];
    }
    acc[item.TIPO].push(item);
    return acc;
  }, {});
  const selectImgGund = (id) => {
    const gun = gunsImg.find((g) => g.id === id);
    return gun ? gun.img : "";
  };
  const ItemComponent = ({ id }) => {
    const item = guns.find((gun) => gun.ID === id);

    if (!item) {
      return <p className="text-red-500 font-bold">Item não encontrado!</p>;
    }

    return (
      <div className="p-3 bg-gray-900 text-white rounded-lg shadow-lg border-2 border-cyan-500 w-[200px] h-[200px] z-50 font-bold text-sm tracking-wide">
        <p className="text-lg font-bold text-cyan-400">{item.NOME}</p>
        <p>
          🗡️ Dano: <span className="text-red-500">{item.DANO}</span>
        </p>
        <p>
          ❤️ Vida: <span className="text-green-500">{item.VIDA}</span>
        </p>
        <p>
          🛡️ Defesa: <span className="text-blue-500">{item.DEFESSA}</span>
        </p>
        <p>
          🎯 Chance Crítico:
          <span className="text-yellow-500">{item.CRITICO}%</span>
        </p>
        <p>
          🔥 M Crítico:
          <span className="text-purple-500">x{item.MULTIPLO_CRITICO}</span>
        </p>
      </div>
    );
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="h-full w-full  bg-gradient-to-br from-gray-800 via-black to-gray-900">
      <Navbar perfil={false} />
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-white  w-[100vh] h-[100vh] flex flex-col items-center p-6  rounded-xl shadow-lg  relative"
        >
          <h2 className="text-2xl font-extrabold text-yellow-300 drop-shadow-md text-center mb-4">
            {character?.name}
          </h2>

          <div className="flex items-center justify-center space-x-10">
            {/* Caixa à esquerda */}
            <div className="flex flex-col space-y-6">
              {/* Arma */}
              <div
                className="relative w-24 h-24 bg-black rounded-xl border-4 border-cyan-500 shadow-md"
                onPointerEnter={() => setShowInfoCapa(true)}
                onMouseOut={() => setShowInfoCapa(false)}
              >
                <img
                  src={selectImgGund(arma)}
                  className="w-full h-full object-cover object-top rounded-xl z-50"
                />
                {showInfoArma && <ItemComponent id={arma} />}
              </div>

              {/* Capa */}
              <div
                className="relative w-24 h-24 bg-black rounded-xl border-4 border-cyan-500 shadow-md"
                onPointerEnter={() => setShowInfoCapa(true)}
                onMouseOut={() => setShowInfoCapa(false)}
              >
                <img
                  src={selectImgGund(capa)}
                  className="w-full h-full object-cover object-top rounded-xl"
                />
                {showInfoCapa && <ItemComponent id={capa} />}
              </div>
            </div>

            {/* Imagem principal */}
            <div className="relative">
              <div className="relative w-52 h-52 overflow-hidden shadow-xl">
                <img
                  src={getMilitaryImage(character.tipo_id)}
                  alt={character?.name}
                  className="w-full h-full object-cover object-top rounded-x2 border-4 border-cyan-500 shadow-[0_0_25px_#00ffff55]"
                />
              </div>
              <div className="absolute -bottom-2 right-0 bg-cyan-500 text-sm px-2 py-1 rounded-lg font-bold shadow-md animate-pulse">
                {getMilitaryName(character.tipo_id)}
              </div>
            </div>

            {/* Caixa à direita */}
            <div className="flex flex-col space-y-6">
              {/* Torso */}
              <div
                className="w-24 h-24 bg-black rounded-xl border-4 border-cyan-500 shadow-md  "
                onPointerEnter={() => setShowInfoTorso(true)}
                onMouseOut={() => setShowInfoTorso(false)}
              >
                <img
                  src={selectImgGund(torso)}
                  className="w-full h-full object-cover object-top rounded-xl"
                />
                {showInfoTorso && <ItemComponent id={torso} />}
              </div>

              {/* Bota */}
              <div
                className="relative w-24 h-24 bg-black rounded-xl border-4 border-cyan-500 shadow-md "
                onPointerEnter={() => setShowInfoBoot(true)}
                onMouseOut={() => setShowInfoBoot(false)}
              >
                <img
                  src={selectImgGund(boot)}
                  className="w-full h-full object-cover object-top rounded-xl"
                />
                {showInfoBoot && <ItemComponent id={boot} />}
              </div>
            </div>
          </div>

          {/* Detalhes */}
          <div className="mt-10 bg-gradient-to-br from-gray-800 via-black to-gray-900 h-[60vh] w-[100vh] p-6 rounded-xl border-2 border-cyan-500 shadow-[0_0_25px_#00ffff55]">
            <div className="flex justify-between items-end w-full border-b border-cyan-500 pb-2 mb-6">
              <h3 className="text-2xl font-extrabold text-cyan-400">
                🎒 Itens no Depósito
              </h3>
              <select
                value={tipoSelecionado}
                onChange={(e) => setTipoSelecionado(e.target.value)}
                className="p-2 px-4 bg-gray-800 text-cyan-300 rounded border border-cyan-500 shadow-md"
              >
                <option value="Todos">All</option>
                <option value="Arma">Arma</option>
                <option value="Buts">Botas</option>
                <option value="Armadura">Torso</option>
                <option value="Capa">Capacete</option>
                {/* Adicione mais opções conforme necessário */}
              </select>
            </div>

            {Array.isArray(depositoItensArray) &&
            depositoItensArray.length > 0 ? (
              <ul className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-4 max-h-[50vh] overflow-y-auto py-8 custom-scroll pr-2 scroll-fade-mask">
                {[...new Set(ordenadoArray)].map((id, index) => {
                  const item = itens.find((i) => i.ID === id);

                  // Verifica se o item existe e aplica o filtro por tipo
                  if (
                    !item ||
                    (tipoSelecionado !== "Todos" &&
                      item.TYPE !== tipoSelecionado)
                  )
                    return null;

                  const quantidade = ordenadoArray.filter(
                    (i) => i === id
                  ).length;

                  return (
                    <li
                      key={index}
                      className="relative flex flex-col items-center shadow-lg transition-transform duration-200 p-3 bg-gray-800 rounded-lg border hover:bg-gray-700 cursor-pointer h-40"
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="relative w-20 h-20 flex items-center bg-gray-700 rounded-md p-2 shadow-md">
                        <img
                          src={selectImgGund(item.ID)}
                          alt={item.NOME}
                          className="w-full h-full object-contain rounded"
                        />
                        {/* Quantidade no canto superior direito */}
                        <span className="absolute top-0 right-0 bg-cyan-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {quantidade}
                        </span>
                      </div>

                      <p className="mt-2 text-cyan-300 text-lg font-semibold text-center">
                        {item.NOME}
                      </p>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-400">Nenhum item no depósito.</p>
            )}

            {/* Exibe o modal quando um item for selecionado */}
            {selectedItem && (
              <ItemModal
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
              />
            )}
          </div>
        </motion.div>
      </div>

      <div className="fixed top-[50vh] left-10 p-4   w-[20%] rounded-lg shadow-lg  ">
        {/* Atributos */}
        <ul className="bg-gradient-to-br from-gray-800 via-black to-gray-900 p-6 rounded-xl border-2 border-cyan-500 shadow-[0_0_25px_#00ffff55] w-full space-y-4 text-gray-300">
          <li className="flex justify-between border-b border-gray-600 pb-2">
            <span className="font-bold">Vida</span>
            <span>
              {character?.health_points} + {vida}
            </span>
          </li>
          <li className="flex justify-between border-b border-gray-600 pb-2">
            <span className="font-bold">Ataque</span>
            <span>
              {character?.attack_points} + {dano}
            </span>
          </li>
          <li className="flex justify-between border-b border-gray-600 pb-2">
            <span className="font-bold">Chance Crítico</span>
            <span>
              {character?.crit_chance}% + {crit}
            </span>
          </li>
          <li className="flex justify-between border-b border-gray-600 pb-2">
            <span className="font-bold">Multiplicador Crítico</span>
            <span>
              {character?.crit_multiplier}% + {critMultiplo}
            </span>
          </li>
          <li className="flex justify-between border-b border-gray-600 pb-2">
            <span className="font-bold">Defesa</span>
            <span>
              {character?.defense_points} + {defessa}
            </span>
          </li>
        </ul>
      </div>
      {/* Barra de XP */}
      <div className="fixed top-0 w-full bg-gray-900  h-5 overflow-hidden  shadow-md border border-yellow-500">
        <motion.div className="h-5 bg-gradient-to-r from-yellow-400 to-yellow-600" />
        <p className="absolute inset-0 flex justify-center items-center text-sm font-bold text-white shadow-md">
          XP: {character?.exp_points} / {character?.next_level_exp}
        </p>
      </div>
    </div>
  );
};

export default Base;
