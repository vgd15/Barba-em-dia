import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderLogado from "../../header/header.jsx";
import "./ConsultarAgendaCliente.css";

function ConsultarAgenda() {
  const navigate = useNavigate();
  const [agendamentos, setAgendamentos] = useState([]);
  const API_URL = "https://backendbarbaemdia.onrender.com";

  useEffect(() => {
    buscarAgendamentos();
  }, []);

  const buscarAgendamentos = async () => {
    const clienteId = localStorage.getItem("clienteId");
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${API_URL}/api/Agendamento/Cliente/${clienteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 204 || !response.data.data?.length) {
        setAgendamentos([]);
      } else if (response.data.success) {
        setAgendamentos(response.data.data);
      }
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      alert("Erro ao carregar agendamentos.");
    }
  };

  const cancelarAgendamento = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(`${API_URL}/api/Agendamento/Cancelar/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Agendamento cancelado.");
      buscarAgendamentos();
    } catch (error) {
      console.error("Erro ao cancelar:", error);
      alert("Erro ao cancelar o agendamento.");
    }
  };

  const reagendarAgendamento = async (agendamento) => {
    const token = localStorage.getItem("token");

    const novoHorario = new Date();
    novoHorario.setDate(novoHorario.getDate() + 1); // agenda para amanhã
    const dataHoraInicio = novoHorario.toISOString();

    const payload = {
      idCliente: agendamento.cliente.id,
      idBarbeiro: agendamento.barbeiro.id,
      idServico: agendamento.servico.id,
      dataHoraInicio,
    };

    try {
      await axios.put(`${API_URL}/api/Agendamento/Reagendar/${agendamento.id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      alert("Agendamento reagendado.");
      buscarAgendamentos();
    } catch (error) {
      console.error("Erro ao reagendar:", error);
      alert("Erro ao reagendar o agendamento.");
    }
  };

  return (
    <div className="painel-cliente">
      <HeaderLogado />
      <div className="painel-container">
        <h2 className="painel-mensagem">Seus agendamentos</h2>

        {agendamentos.length === 0 ? (
  <p className="painel-mensagem">Você ainda não possui agendamentos.</p>
) : (
    
  agendamentos.map((agendamento) => (
    <div key={agendamento.id} className="agendamento-bloco">
      <ul className="lista-agendamentos">
        <li className="agendamento-item">
          <p><strong>Serviço:</strong> {agendamento.servico?.descricao}</p>
          <p><strong>Barbeiro:</strong> {agendamento.barbeiro?.nome}</p>
          <p><strong>Data:</strong> {new Date(agendamento.dataHoraInicio).toLocaleDateString("pt-BR")}</p>
          <p><strong>Horário:</strong> {new Date(agendamento.dataHoraInicio).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}</p>
        </li>
      </ul>

      <div className="botoes">
        <button onClick={() => reagendarAgendamento(agendamento)}>Reagendar</button>
        <button onClick={() => cancelarAgendamento(agendamento.id)}>Cancelar</button>
      </div>
    </div>
  ))
)}
        <div className="botoes">
          <button onClick={() => navigate("/agendamento")}>Agendar novo horário</button>
        </div>
      </div>
      <a className="back" href="/painel-cliente">Voltar</a>
    </div>
  );
}

export default ConsultarAgenda;
