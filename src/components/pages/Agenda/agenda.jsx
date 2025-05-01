import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "./agenda.css";

function Agenda() {
  const API_URL = "https://backendbarbaemdia.onrender.com"; // ajuste para sua API

  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [idBarbeiro, setIdBarbeiro] = useState("");
  const [idServico, setIdServico] = useState("");
  const [agendamentos, setAgendamentos] = useState([]);
  const [todosHorarios, setTodosHorarios] = useState([]);

  useEffect(() => {
    buscarAgendamentos();
  }, [dataSelecionada, idBarbeiro, idServico]);

  const buscarAgendamentos = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const dataFormatada = dataSelecionada.toISOString().split("T")[0];

      const params = {
        data: `${dataFormatada}T00:00:00`
      };
      if (idBarbeiro) params.idBarbeiro = idBarbeiro;
      if (idServico) params.idServico = idServico;

      const response = await axios.get(`${API_URL}/api/Agendamento`, {
        params,
        headers
      });

      if (response.data.success) {
        setAgendamentos(response.data.data || []);
      }
      gerarTodosHorarios();
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  };

  const gerarTodosHorarios = () => {
    const inicio = new Date(dataSelecionada);
    inicio.setHours(8, 0, 0, 0);

    const fim = new Date(dataSelecionada);
    fim.setHours(18, 0, 0, 0);

    const horarios = [];
    while (inicio <= fim) {
      horarios.push(new Date(inicio));
      inicio.setMinutes(inicio.getMinutes() + 30);
    }
    setTodosHorarios(horarios);
  };

  const buscarAgendamentoNoHorario = (horario) => {
    return agendamentos.find(agendamento => {
      const dataAgendamento = new Date(agendamento.dataHoraInicio);
      return dataAgendamento.getHours() === horario.getHours() &&
             dataAgendamento.getMinutes() === horario.getMinutes();
    });
  };

  return (
    <div className="agenda-container">
      <h2>Consultar Agendas</h2>

      <div className="agenda-formulario">
        <label>ID do Barbeiro (opcional):</label>
        <input
          type="number"
          value={idBarbeiro}
          onChange={(e) => setIdBarbeiro(e.target.value)}
          placeholder="Digite o ID do barbeiro"
        />

        <label>ID do Serviço (opcional):</label>
        <input
          type="number"
          value={idServico}
          onChange={(e) => setIdServico(e.target.value)}
          placeholder="Digite o ID do serviço"
        />

        <label>Selecione uma data:</label>
        <DatePicker
          selected={dataSelecionada}
          onChange={(date) => setDataSelecionada(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="dd/MM/yyyy HH:mm"
          placeholderText="Selecione data e hora"
          inline
        />
      </div>

      <div className="agenda-horarios">
        {todosHorarios.map((horario, index) => {
          const agendamento = buscarAgendamentoNoHorario(horario);

          return (
            <div
              key={index}
              className={`horario ${agendamento ? 'indisponivel' : 'disponivel'}`}
            >
              <span>{horario.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span><br />
              {agendamento ? (
                <strong>{agendamento.cliente?.nome || "Reservado"}</strong>
              ) : (
                <em>Disponível</em>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Agenda;
