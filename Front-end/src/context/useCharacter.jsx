import React, { createContext, useContext, useState } from "react";
import img from "../Img/Militar.png";

const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [character, setCharacter] = useState({
    image: img,
    name: "Herói",
    health: 100,
    attack: 250,
    critChance: 5,
    defense: 8,
  });

  const attackEnemy = () => {
    const isCritical = Math.random() * 100 < character.critChance;
    const damage = isCritical ? character.attack * 2 : character.attack;
    return damage;
  };

  return (
    <CharacterContext.Provider value={{ character, setCharacter, attackEnemy }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => useContext(CharacterContext);
