import React, { useState, useEffect } from "react";
import "./Agendamento.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";

function Agendamento() {
  const [servicoSelecionado, setServicoSelecionado] = useState("");
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState("");
  const [preferenciaHorario, setPreferenciaHorario] = useState({
    inicio: "",
    fim: "",
  });
  const [diasDisponiveis, setDiasDisponiveis] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState("");

  const servicos = [
    { id: 1, nome: "Corte Masculino" },
    { id: 2, nome: "Barba" },
    { id: 3, nome: "Corte + Barba" },
  ];

  const barbeiros = [
    { id: 1, nome: "João" },
    { id: 2, nome: "Carlos" },
    { id: 3, nome: "Pedro" },
  ];

  useEffect(() => {
    if (servicoSelecionado) {
      buscarDiasDisponiveis();
    }
  }, [servicoSelecionado, barbeiroSelecionado, preferenciaHorario]);

  const diaDisponivel = (date) => {
    return diasDisponiveis.includes(date.toISOString().split("T")[0]);
  };

  const buscarDiasDisponiveis = async () => {
    try {
      // Simula a chamada ao backend
      const dias = ["2025-04-15", "2025-04-16", "2025-04-17"];
      setDiasDisponiveis(dias);
    } catch (err) {
      console.error(err);
    }
  };

  const buscarHorarios = async () => {
    if (!dataSelecionada) return;
    try {
      const horarios = ["09:00", "10:00", "14:00", "15:00"];
      setHorariosDisponiveis(horarios);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmarAgendamento = async () => {
    try {
      alert("Agendamento confirmado!");
    } catch (err) {
      console.error(err);
      alert("Erro ao agendar.");
    }
  };

  registerLocale("pt-BR", ptBR);

  return (
    <div className="agendamento">
      <h2>Agende seu horário</h2>

      <label>Serviço:</label>
      <select
        value={servicoSelecionado}
        onChange={(e) => setServicoSelecionado(e.target.value)}
      >
        {servicos.map((servico) => (
          <option key={servico.id} value={servico.id}>
            {servico.nome}
          </option>
        ))}
      </select>

      <label>Barbeiro (opcional):</label>
      <select
        value={barbeiroSelecionado}
        onChange={(e) => setBarbeiroSelecionado(e.target.value)}
      >
        <option value="">Não tenho preferência</option>
        {barbeiros.map((barbeiro) => (
          <option key={barbeiro.id} value={barbeiro.id}>
            {barbeiro.nome}
          </option>
        ))}
      </select>

      <label>Preferência de horário (opcional):</label>
      <div className="preferencia-horario">
        <input
          type="time"
          value={preferenciaHorario.inicio}
          onChange={(e) =>
            setPreferenciaHorario({
              ...preferenciaHorario,
              inicio: e.target.value,
            })
          }
        />
        <span>às</span>
        <input
          type="time"
          value={preferenciaHorario.fim}
          onChange={(e) =>
            setPreferenciaHorario({
              ...preferenciaHorario,
              fim: e.target.value,
            })
          }
        />
      </div>

      <label>Escolha o dia:</label>
      <DatePicker
        selected={dataSelecionada}
        onChange={(date) =>
          setDataSelecionada(date.toISOString().split("T")[0])
        }
        filterDate={diaDisponivel}
        dateFormat="dd/MM/yyyy"
        placeholderText="Selecione uma data"
        locale="pt-BR"
      />

      <button onClick={buscarHorarios}>Ver horários disponíveis</button>

      {horariosDisponiveis.length > 0 && (
        <>
          <label>Horários:</label>
          <div
            className="horarios"
            style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
          >
            {horariosDisponiveis.map((horario) => (
              <button
                key={horario}
                className={horario === horarioSelecionado ? "selecionado" : ""}
                onClick={() => setHorarioSelecionado(horario)}
              >
                {horario}
              </button>
            ))}
          </div>
          <button onClick={confirmarAgendamento} disabled={!horarioSelecionado}>
            Confirmar
          </button>
        </>
      )}
    </div>
  );
}

export default Agendamento;
