import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharacterCard from "../Components/CharacterCard";
import background from "../Img/Home.png";

import { motion } from "framer-motion";

const Home = () => {
  const { userLogin, logout } = useUser();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  if (loading) return <div>Carregando...</div>;

  if (characters.length === 0) {
    // Se não tem personagens, redireciona ou mostra botão para criar personagem
    return <CharacterCard user={userLogin} />;
  }

  // Se tem personagem(s), pode mostrar lista ou ir direto para o personagem principal
  return (
    <div className="h-full w-full bg-red">
      <Navbar />
      <>000000000000000000</>
    </div>
  );
};

export default Home;
