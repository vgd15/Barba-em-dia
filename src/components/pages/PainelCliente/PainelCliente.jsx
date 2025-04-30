import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderLogado from "../../header/header.jsx";


function PainelCliente() {
  const navigate = useNavigate();

  return (
    <div className="painel-cliente">
      <HeaderLogado />

      <div className="painel-container">
        <p className="painel-mensagem">
          Olá, <strong>(nome do cliente)</strong>. Você tem <strong>"0"</strong> serviços agendados.
        </p>

        <div className="botoes">
          <button onClick={() => navigate("/agendamento")}>Agendar horário</button>
          <button onClick={() => navigate("/consultar-agenda")}>Consultar agenda</button>
        </div>
      </div>
    </div>
  );
}

export default PainelCliente;
