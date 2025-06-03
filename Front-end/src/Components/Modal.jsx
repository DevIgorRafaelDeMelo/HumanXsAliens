import React from "react";

const Modal = ({ winner, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md">
      <div className="bg-gradient-to-br from-gray-800 to-black p-8 rounded-lg shadow-2xl text-center border-2 border-gray-600">
        <h2 className="text-3xl font-bold text-white">
          {winner === "player" ? "🏆 Você venceu!" : "💀 O inimigo venceu!"}
        </h2>
       
        <p className="mt-2 text-gray-300 text-lg">
          {winner === "player"
            ? "Parabéns, guerreiro! Você dominou a batalha. ⚔️"
            : "Infelizmente, desta vez o inimigo levou a melhor... Tente novamente! 🔥"}
        </p>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition-all"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Modal;
