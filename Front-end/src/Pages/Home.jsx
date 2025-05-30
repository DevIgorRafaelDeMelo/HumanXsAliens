import React from "react";
import Navbar from "../Componets/Navbar";
import { useCharacter } from "../context/useCharacter"; // Certifique-se de que o caminho está correto!
import Img from "../Img/Home.png";
import MED from "../Img/MED.png";
import COM from "../Img/COM.png";
import MEN from "../Img/MEN.png";
import MKT from "../Img/MKT.png";

const Home = () => {
  const { character, attackEnemy } = useCharacter(); // Obtém os dados do personagem e função de ataque

  return (
    <div className="  bg-gray-100 text-gray-900">
      <Navbar />
      <img
        src={Img}
        alt="Imagem centralizada"
        className="max-w-full h-[100vh] w-full rounded-lg shadow-lg fixed"
      />
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center gap-8 flex-wrap p-10 ">
        {[
          { id: 1, img: MED, title: "Hospital" },
          { id: 2, img: COM, title: "Comandante" },
          { id: 3, img: MEN, title: "Entregas" },
          { id: 4, img: MKT, title: "Mercado Negro" },
        ].map((card) => (
          <div
            key={card.id}
            className="w-64 bg-gray-900/80 text-white rounded-lg  overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col items-center justify-center py-4 backdrop-blur-lg border-[4px] border-cyan-500    "
          >
            {/* Imagem do Card */}
            

            {/* Título do Card */}
            <h3 className="text-2xl font-bold  mt-4 transition duration-300 hover:text-cyan-400">
              {card.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
