import React, { useState } from "react";
import "./Admin.css";
import HeaderLogado from "../../header/header.jsx";
import TravarAgenda from "../travamento/travar.jsx";
import CadastrarBarbeiro from "../Barbeiros/barbeiro.jsx";
import Agenda from "../Agenda/agenda.jsx";
import ServicosPainel from "../ServiçosPainel/servicosPainel.jsx";

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
          <div className="sidebar-header" onClick={() => selecionarMenu("dashboard")}>
            DASHBOARD
          </div>

          <div className="sidebar-section">RECURSOS</div>

          <nav className="sidebar-menu">
            <button onClick={() => selecionarMenu("servicos")}>SERVIÇOS</button>
            <button onClick={() => selecionarMenu("consultar")}>CONSULTAR AGENDAS</button>
            <button onClick={() => selecionarMenu("cadastrar")}>CADASTRAR BARBEIRO</button>
            <button onClick={() => selecionarMenu("travar")}>TRAVAR AGENDA</button>
          </nav>
        </aside>

        <main className="admin-main">
          {/* Renderiza o painel conforme o menu selecionado */}
          {menuSelecionado === "dashboard" && (
            <>
              <header className="admin-header">
                <h2>DASHBOARD</h2>
                <select>
                  <option>SELECIONAR PERÍODO</option>
                </select>
              </header>

              <section className="admin-cards">
                <div className="card">
                  <div className="card-header">Agendamentos x não comparecimento (X)</div>
                  <div className="card-content">
                    {/* Aqui pode colocar o gráfico */}
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">Faturamento e quantidade de clientes</div>
                  <div className="card-content">
                    {/* Outro gráfico ou tabela */}
                  </div>
                </div>
              </section>

              <section className="admin-graph">
                <div className="graph-header">
                  "Gráfico com tempo ocioso de trabalho" <br />
                  (por exemplo, período de trabalho das 8h00 às 12h00, 02 horas sem clientes = 50% de ociosidade)
                </div>
                <div className="graph-content">
                  {/* Espaço para o gráfico */}
                </div>
              </section>
            </>
          )}

          {menuSelecionado === "travar" && <TravarAgenda />}
          {menuSelecionado === "cadastrar" && <CadastrarBarbeiro />}
           {menuSelecionado === "servicos" && <ServicosPainel/>}
          {menuSelecionado === "consultar" && <Agenda/>}
        </main>
      </div>
    </div>
  );
}

export default Admin;
