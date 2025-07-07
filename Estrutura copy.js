import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { userLogin, logout } = useUser();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLogin) {
      navigate("/auth");  
      return;
    }
    async function fetchCharacters() {
      try {
        const res = await fetch("http://localhost:5000/characters", {
          headers: {
            Authorization: `Bearer ${userLogin.token}`, 
          },
        });
        const data = await res.json();
        if (res.ok) {
          console.log(data)
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
 
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Home;
