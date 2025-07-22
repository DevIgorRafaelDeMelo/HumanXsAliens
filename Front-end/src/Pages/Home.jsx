import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Load from "../Components/LoadingScreen";

const Home = () => {
  const { userLogin } = useUser(); 
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
          `http://192.168.20.198:5000/characters?user_id=${userLogin.id}`,
          {
            headers: { Authorization: `Bearer ${userLogin.token}` },
          }
        );
        const data = await res.json();

        if (res.ok) { 
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

   if (loading) return <Load />;
 
  return (
    <div className="h-full w-full bg-red">
      <Navbar />
       
    </div>
  );
};

export default Home;
