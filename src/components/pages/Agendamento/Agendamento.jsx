import React, { useState, useEffect } from "react";
import "./Agendamento.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import axios from "axios";
import HeaderLogado from "../../header/header";

registerLocale("pt-BR", ptBR);

function Agendamento() {
  const [servicos, setServicos] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState("");
  const [diasDisponiveis, setDiasDisponiveis] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [preferenciaHorario, setPreferenciaHorario] = useState({ inicio: "", fim: "" });

  const API_URL = "http://localhost:5243";

  useEffect(() => {
    carregarServicos();
    carregarDiasDisponiveis();
  }, []);

  const carregarServicos = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      };

      const response = await axios.get(`${API_URL}/api/Servicos`, { headers });

      if (response.data.success) {
        setServicos(response.data.data);
      } else {
        console.error("Erro ao buscar serviços:", response.data.message);
      }
    } catch (error) {
      console.error("Erro ao carregar serviços:", error);
    }
  };

  const carregarDiasDisponiveis = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      };

      const response = await axios.get(`${API_URL}/api/ParametrizacaoHorarios`, { headers });

      if (response.data.success) {
        const dias = response.data.data.map(item => item.diaSemana);
        setDiasDisponiveis(dias);
      } else {
        console.error("Erro ao buscar dias disponíveis:", response.data.message);
      }
    } catch (error) {
      console.error("Erro ao listar dias disponíveis:", error);
    }
  };

  const diaDisponivel = (date) => {
    const diaSemana = date.getDay();
    return diasDisponiveis.includes(diaSemana);
  };

  const confirmarAgendamento = async () => {
    if (!servicoSelecionado || !dataSelecionada || !preferenciaHorario.inicio || !preferenciaHorario.fim) {
      alert("Preencha todos os campos para agendar.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      };

      const agendamento = {
        idCliente: parseInt(localStorage.getItem("userId")), // usa o id do cliente que veio no login
        idBarbeiro: 1, // fixo por enquanto, pode depois melhorar
        idServico: parseInt(servicoSelecionado),
        dataHoraInicio: `${dataSelecionada}T${preferenciaHorario.inicio}`
      };

      const response = await axios.post(`${API_URL}/api/Agendamento/Agendar`, agendamento, { headers });

      if (response.data.success) {
        alert("Agendamento realizado com sucesso!");
      } else {
        alert("Erro ao agendar: " + response.data.message);
      }
    } catch (error) {
      console.error("Erro ao agendar:", error);
      alert("Erro ao agendar.");
    }
  };

  return (
    <div className="agendamento-container">
      <HeaderLogado></HeaderLogado>
    <div className="agendamento">
      <h2>Agende seu horário</h2>

      <label>Serviço:</label>
      <select
        value={servicoSelecionado}
        onChange={(e) => setServicoSelecionado(e.target.value)}
      >
        <option value="">Selecione o serviço</option>
        {servicos.map((servico) => (
          <option key={servico.id} value={servico.id}>
            {servico.descricao}
          </option>
        ))}
      </select>

      <label>Preferência de horário:</label>
      <div className="preferencia-horario">
        <input
          type="time"
          value={preferenciaHorario.inicio}
          onChange={(e) =>
            setPreferenciaHorario({ ...preferenciaHorario, inicio: e.target.value })
          }
        />
        <span>às</span>
        <input
          type="time"
          value={preferenciaHorario.fim}
          onChange={(e) =>
            setPreferenciaHorario({ ...preferenciaHorario, fim: e.target.value })
          }
        />
      </div>

      <label>Escolha o dia:</label>
      <DatePicker
        selected={dataSelecionada ? new Date(dataSelecionada) : null}
        onChange={(date) => setDataSelecionada(date.toISOString().split("T")[0])}
        filterDate={diaDisponivel}
        dateFormat="dd/MM/yyyy"
        placeholderText="Selecione uma data"
        locale="pt-BR"
      />

      <button className="confirmar-agendamento" onClick={confirmarAgendamento}>
        Confirmar Agendamento
      </button>
    </div>
    </div>
  );
}

export default Agendamento;
