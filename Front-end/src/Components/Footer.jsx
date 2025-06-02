import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center ">
          <h1>Logo </h1>

          {/* Links */}
          <nav className="flex space-x-6 mt-4 md:mt-0">
            <a href="/Home" className="hover:underline">
              Sobre
            </a>
            <a href="/Home" className="hover:underline">
              Contato
            </a>
            <a href="/Home" className="hover:underline">
              Política de Privacidade
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
