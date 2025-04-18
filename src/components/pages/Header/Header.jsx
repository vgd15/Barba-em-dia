import React from "react";
import "./Header.css";
import logo from "../../img/logo.png";

function Header() {
  return (
    <header>
      <div className="header-content">
        {/* Logo como imagem clicável */}
        <a href="#home" className="logo">
          <img src={logo} alt="Paulinho Barbearia" />
        </a>

        {/* Menu de navegação, que será escondido em telas pequenas */}
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#sobre">Sobre Nós</a>
          <a href="#servicos">Serviços</a>
          <a href="#contato">Contato</a>
        </nav>

        {/* Botão de Agendamento */}
        <button className="agendar-btn" onClick={() => window.location.href = "/agendamento"}>
          <span>Agende seu Horário</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
