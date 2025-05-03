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
  const [barbeiros, setBarbeiros] = useState([]);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState("");

  const API_URL = "https://backendbarbaemdia.onrender.com";

  useEffect(() => {
    carregarServicos();
    carregarDiasDisponiveis();
    carregarBarbeiros();
  }, []);

  const carregarBarbeiros = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      };

      const response = await axios.get(`${API_URL}/api/Barbeiros/Ativos`, { headers });

      if (response.data.success) {
        setBarbeiros(response.data.data);
      } else {
        console.error("Erro ao buscar barbeiros:", response.data.message);
      }
    } catch (error) {
      console.error("Erro ao carregar barbeiros:", error);
    }
  };

  const carregarServicos = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json" // Corrigido para o valor aceito pela API
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

      let idBarbeiroFinal;

      if (barbeiroSelecionado) {
        idBarbeiroFinal = parseInt(barbeiroSelecionado);
      } else {
        // Filtra os barbeiros que oferecem o serviço selecionado
        const barbeirosDisponiveis = barbeiros.filter(b =>
          b.barbeiroServicos.some(bs => bs.servico.id === parseInt(servicoSelecionado))
        );

        if (barbeirosDisponiveis.length === 0) {
          alert("Nenhum barbeiro disponível para este serviço.");
          return;
        }

        const barbeiroAleatorio = barbeirosDisponiveis[Math.floor(Math.random() * barbeirosDisponiveis.length)];
        idBarbeiroFinal = barbeiroAleatorio.id;
      }

      const agendamento = {
        idCliente: parseInt(localStorage.getItem("clienteId")),
        idBarbeiro: idBarbeiroFinal,
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
      <HeaderLogado />
      <div className="agendamento">
        <h2>Agende seu horário</h2>

        <label>Barbeiro:</label>
        <select
          value={barbeiroSelecionado}
          onChange={(e) => setBarbeiroSelecionado(e.target.value)}
        >
          <option value="">Escolher depois</option>
          {barbeiros.map((barbeiro) => (
            <option key={barbeiro.id} value={barbeiro.id}>
              {barbeiro.nome}
            </option>
          ))}
        </select>

        <label>Serviço:</label>
        <select
          value={servicoSelecionado}
          onChange={(e) => setServicoSelecionado(e.target.value)}
        >
          <option value="">Selecione o serviço</option>
          {barbeiroSelecionado
            ? barbeiros.find(b => b.id === parseInt(barbeiroSelecionado))?.barbeiroServicos.map(bs => (
                <option key={bs.servico.id} value={bs.servico.id}>
                  {bs.servico.descricao}
                </option>
              ))
            : servicos.map(servico => (
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
            onChange={(e) => setPreferenciaHorario({ ...preferenciaHorario, inicio: e.target.value })}
          />
          <span>às</span>
          <input
            type="time"
            value={preferenciaHorario.fim}
            onChange={(e) => setPreferenciaHorario({ ...preferenciaHorario, fim: e.target.value })}
          />
        </div>

        
        <div className="calendario">
        <label>Escolha o dia:</label>
        <DatePicker
          selected={dataSelecionada ? new Date(dataSelecionada) : null}
          onChange={(date) => setDataSelecionada(date.toISOString().split("T")[0])}
          filterDate={diaDisponivel}
          dateFormat="dd/MM/yyyy"
          placeholderText="Selecione uma data"
          locale="pt-BR"
        />
       </div>

        <button className="confirmar-agendamento" onClick={confirmarAgendamento}>
          Confirmar Agendamento
        </button>
      </div>

      <a className="back" href="/painel-cliente">Voltar</a>
    </div>
  );
}

export default Agendamento;
