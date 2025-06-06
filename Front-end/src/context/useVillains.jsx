// src/context/useVillains.js
import { useState } from "react";
import vilao3 from "../Img/alien1.jpg";
import vilao4 from "../Img/alien2.jpg";
import vilao5 from "../Img/alien3.jpg";
import vilao6 from "../Img/alien4.jpg";

const useVillains = () => {
  const [villains, setVillains] = useState([
    {
      name: "Rainha da Morte",
      health: 100,
      attack: 14,
      defense: 6,
      critChance: 10,
      isAlive: true,
      image: vilao5,
    },
    {
      name: "Vilão Sombrio",
      health: 120,
      attack: 12,
      defense: 8,
      critChance: 8,
      isAlive: true,
      image: vilao3,
    },
    {
      name: "O Corruptor",
      health: 130,
      attack: 16,
      defense: 7,
      critChance: 9,
      isAlive: true,
      image: vilao6,
    },
    {
      name: "Lorde das Trevas",
      health: 150,
      attack: 18,
      defense: 10,
      critChance: 12,
      isAlive: true,
      image: vilao4,
    }
  ]);

  const [boss, setBoss] = useState({
    name: "Chefão das Sombras",
    health: 500,
    attack: 20,
    defense: 12,
    critChance: 15,
    isAlive: true,
    image: vilao5,
  });

  return { villains, setVillains, boss, setBoss };
};

export default useVillains;
