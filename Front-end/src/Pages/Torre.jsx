import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import background from "../Img/Torre.png";
import Load from "../Components/LoadingScreen";

const Torre = () => {
  const { userLogin } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLogin) {
      navigate("/auth");
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

    async function fetchAliens() {
      try {
        const res = await fetch("http://localhost:5000/aliens", {
          headers: {
            Authorization: `Bearer ${userLogin.token}`,
          },
        });
        if (res.ok) {
        } else {
          console.error("Erro ao carregar aliens");
        }
      } catch (error) {
        console.error("Erro ao conectar com o servidor");
      }
    }

    fetchCharacters();
    fetchAliens();
  }, [userLogin, navigate]);

  if (!loading) return <Load />;

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
      className="flex flex-col justify-between items-center"
    ></div>
  );
};

export default Torre;
