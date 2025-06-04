import React from "react";
import { motion } from "framer-motion";

const Modal = ({ winner, onClose, exp, money }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-gradient-to-br from-gray-900 to-black p-10 rounded-lg shadow-[0_0_20px_rgba(255,0,0,0.8)] text-center border-4 border-red-500"
      >
        {/* Ícone de vitória ou derrota com animação */}
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-4xl font-extrabold text-white tracking-wider"
        >
          {winner === "player" ? "🏆 Vitória Suprema!" : "💀 Derrota Brutal!"}
        </motion.h2>

        {/* Mensagem de vitória ou derrota */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-gray-300 text-lg font-semibold"
        >
          {winner === "player"
            ? "Você dizimou seus inimigos e provou sua supremacia! ⚔️🔥"
            : "O inimigo foi implacável desta vez... Mas a guerra ainda não acabou! 💀"}
        </motion.p>

        {/* Recompensas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-white text-lg font-bold"
        >
          <p>
            💰 Dinheiro ganho: <span className="text-green-400">{money}</span>
          </p>
          <p>
            ⚡ EXP recebido: <span className="text-yellow-300">{exp}</span>
          </p>
        </motion.div>

        {/* Botão de fechar com efeito */}
        <motion.button
          onClick={onClose}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mt-6 px-8 py-3 bg-red-600 text-white font-bold text-lg rounded-lg shadow-xl hover:bg-red-700 transition-all"
        >
          Fechar e Preparar-se para a Próxima!
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Modal;
