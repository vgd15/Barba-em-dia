import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderLogado from "../../header/header.jsx";
import "./painelCliente.css";

function PainelCliente() {
  const navigate = useNavigate();
  const [nomeCliente, setNomeCliente] = useState("");
  const [qtdAgendamentos, setQtdAgendamentos] = useState(0);
  const API_URL = "https://backendbarbaemdia.onrender.com";

  useEffect(() => {
    const clienteId = localStorage.getItem("clienteId");
    const token = localStorage.getItem("token");
    const nome = localStorage.getItem("clienteNome");

    if (!clienteId || !token) {
      limparSessaoENavegar();
      return;
    }

    setNomeCliente(nome);

    const buscarAgendamentos = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/Agendamento/Cliente/${clienteId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Se não houver agendamentos, a API retorna 204
        if (response.status === 204) {
          setQtdAgendamentos(0);
          return;
        }

        // Se houver resposta com sucesso
        if (response.data?.success && Array.isArray(response.data.data)) {
          setQtdAgendamentos(response.data.data.length);
        } else {
          console.warn("Resposta inesperada da API:", response.data);
          limparSessaoENavegar();
        }
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          alert("Sessão expirada. Faça login novamente.");
          limparSessaoENavegar();
        } else {
          alert("Erro ao carregar agendamentos. Tente novamente mais tarde.");
        }
      }
    };

    buscarAgendamentos();
  }, [navigate]);

  const limparSessaoENavegar = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("clienteId");
    localStorage.removeItem("clienteNome");
    navigate("/login-cliente");
  };

  return (
    <div className="painel-cliente">
      <HeaderLogado />

      <div className="painel-container">
        <p className="painel-mensagem">
          Olá, <strong>{nomeCliente}</strong>. Você tem{" "}
          <strong>{qtdAgendamentos}</strong> serviço(s) agendado(s).
        </p>

        <div className="botoes">
          <button onClick={() => navigate("/agendamento")}>Agendar horário</button>
          {qtdAgendamentos > 0 && (
          <button onClick={() => navigate("/consultar-agenda")}>
            Consultar agenda
          </button>
        )}
        </div>
      </div>
    </div>
  );
}

export default PainelCliente;
