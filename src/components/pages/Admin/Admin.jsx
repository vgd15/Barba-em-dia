import React, { useState } from "react";
import "./Admin.css";
import HeaderLogado from "../../header/header.jsx";
import TravarAgenda from "../travamento/travar.jsx";
import CadastrarBarbeiro from "../Barbeiros/barbeiro.jsx";
import Agenda from "../Agenda/agenda.jsx";
import ServicosPainel from "../ServiçosPainel/servicosPainel.jsx";
import PainelEstatisticas from "../Estatisticas/PainelEstatisticas.jsx";

function Admin() {
  const [menuSelecionado, setMenuSelecionado] = useState("dashboard");

  const selecionarMenu = (menu) => {
    setMenuSelecionado(menu);
  };

  return (
    <div className="admin">
      <HeaderLogado />

      <div className="admin-container">
        <aside className="admin-sidebar">
          {/* Aqui adicionamos o onClick para voltar ao dashboard */}
          <div
            className="sidebar-header"
            onClick={() => selecionarMenu("dashboard")}
          >
            DASHBOARD
          </div>

          <div className="sidebar-section">RECURSOS</div>

          <nav className="sidebar-menu">
            <button onClick={() => selecionarMenu("servicos")}>SERVIÇOS</button>
            <button onClick={() => selecionarMenu("consultar")}>
              CONSULTAR AGENDAS
            </button>
            <button onClick={() => selecionarMenu("cadastrar")}>
              CADASTRAR BARBEIRO
            </button>
            <button onClick={() => selecionarMenu("travar")}>
              TRAVAR AGENDA
            </button>
          </nav>
        </aside>

        <main className="admin-main">
          {/* Renderiza o painel conforme o menu selecionado */}
          {menuSelecionado === "dashboard" && <PainelEstatisticas />}

          {menuSelecionado === "travar" && <TravarAgenda />}
          {menuSelecionado === "cadastrar" && <CadastrarBarbeiro />}
          {menuSelecionado === "servicos" && <ServicosPainel />}
          {menuSelecionado === "consultar" && <Agenda />}
        </main>
      </div>
    </div>
  );
}

export default Admin;
