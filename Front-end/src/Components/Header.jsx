import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCircle,
  FaTv,
  FaCog,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";
import { useUser } from "../context/UserContext";

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { userLogin, logout } = useUser();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // limpa contexto e localStorage
    setShowUserMenu(false); // fecha o menu
    navigate("/Home"); // redireciona
  };

  return (
    <div>
      {userLogin && (
        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
          Sair
        </button>
      )}
      <header className="flex items-center justify-between px-6 py-4 bg-primary text-white shadow-md fixed top-0 w-full h-[10vh]">
        {/* Logo */}
        <h1
          className="text-xl font-bold cursor-pointer hover:text-gray-300"
          onClick={() => (window.location.href = "/Home")}
        >
          Logo
        </h1>

        {/* Verifica se usuário está logado */}
        {userLogin ? (
          <div
            className="flex items-center gap-2 mx-4 cursor-pointer"
            onClick={() => {
              setShowUserMenu((prev) => !prev);
              setIsOpen(false);
            }}
          >
            <FaUserCircle size={24} />
            <span className="text-sm">{userLogin.nome}</span>
          </div>
        ) : (
          <Link
            to="/AuthScreen"
            onClick={() => {
              setShowUserMenu(false);
              setIsOpen(false);
            }}
            className="text-sm mx-4 hover:text-gray-300"
          >
            Login / Register
          </Link>
        )}
      </header>
      {/* Menu de usuário com animação */}
      <AnimatePresence>
        {showUserMenu && (
          <motion.ul
            className="fixed top-[10vh] right-0 w-[50%] bg-white text-black p-4 z-10 shadow-lg border-t sm:w-[200px]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <li className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer">
              <FaTv />
              <Link to="/myChanel" className="text-black">
                Meu Canal
              </Link>
            </li>

            <li className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer">
              <FaCog />
              <span>Configurações</span>
            </li>
            <li className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer">
              <FaHistory />
              <span>Histórico</span>
            </li>
            <li
              className="flex items-center gap-2 p-2 text-red-500 hover:bg-gray-200 cursor-pointer"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
              <span>Sair</span>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
