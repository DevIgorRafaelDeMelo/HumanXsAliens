// src/pages/Map.jsx
import Navbar from "../Componets/Navbar";
 
import Img from "../Img/Torre.png";

const Torre = () => {
 

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-blue-950 text-white flex flex-col items-center relative">
      <img
        src={Img}
        alt="Imagem centralizada"
        className="max-w-full h-[100vh] rounded-lg shadow-lg fixed w-full"
      />
      <Navbar />
      <div className="h-[10vh]"></div>
    
    </div>
  );
};

export default Torre;
