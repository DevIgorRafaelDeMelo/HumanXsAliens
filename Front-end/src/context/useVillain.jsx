 
import useVillains from "./useVillains";

const useVillain = () => {
  const [villain, setVillain] = useVillains

  const attackHero = () => {
    const isCritical = Math.random() * 100 < villain.critChance;
    const damage = isCritical ? villain.attack * 2 : villain.attack;
    return damage;
  };

  return { villain, attackHero, setVillain };
};

export default useVillain;