import React, { useState, useEffect } from "react";
import "./Agendamento.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import axios from "axios";
import HeaderLogado from "../../header/header";
import { useNavigate } from "react-router-dom";

registerLocale("pt-BR", ptBR);

function Agendamento() {
  const navigate = useNavigate();

  const [servicos, setServicos] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState("");
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [preferenciaHorario, setPreferenciaHorario] = useState({
    inicio: "",
    fim: "",
  });

  const [horariosIndisponiveis, setHorariosIndisponiveis] = useState([]);
  const [barbeiros, setBarbeiros] = useState([]);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState("");

  const API_URL = "https://backendbarbaemdia.onrender.com";

  useEffect(() => {
    const fetchHorariosIndisponiveis = async () => {
      if (!servicoSelecionado) return;

      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        };

        const params = new URLSearchParams();
        params.append("idServico", servicoSelecionado);
        if (barbeiroSelecionado) {
          params.append("idBarbeiro", barbeiroSelecionado);
        }
        if (preferenciaHorario.inicio) {
          params.append(
            "horarioPreferencialInicial",
            preferenciaHorario.inicio
          );
        }
        if (preferenciaHorario.fim) {
          params.append("horarioPreferencialFinal", preferenciaHorario.fim);
        }

        const response = await axios.get(
          `${API_URL}/api/Agendamento/HorariosIndisponiveis?${params.toString()}`,
          { headers }
        );

        if (response.data.success) {
          setHorariosIndisponiveis(response.data.data);
        } else {
          console.error(
            "Erro ao buscar horários indisponíveis:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Erro ao carregar horários indisponíveis:", error);
      }
    };

    setHorarioSelecionado(null); // Limpa o horário selecionado ao mudar o serviço ou barbeiro
    setHorariosIndisponiveis([]); // Limpa os horários indisponíveis ao mudar o serviço ou barbeiro

    fetchHorariosIndisponiveis();
  }, [servicoSelecionado, barbeiroSelecionado, preferenciaHorario]);

  useEffect(() => {
    carregarServicos();
    carregarHorariosDisponiveis();
    carregarBarbeiros();
  }, []);

  const carregarBarbeiros = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };

      const response = await axios.get(`${API_URL}/api/Barbeiros/Ativos`, {
        headers,
      });

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
        Accept: "application/json", // Corrigido para o valor aceito pela API
      };

      const response = await axios.get(`${API_URL}/api/Servicos/Ativos`, {
        headers,
      });

      if (response.data.success) {
        setServicos(response.data.data);
      } else {
        console.error("Erro ao buscar serviços:", response.data.message);
      }
    } catch (error) {
      console.error("Erro ao carregar serviços:", error);
    }
  };

  const carregarHorariosDisponiveis = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };

      const response = await axios.get(
        `${API_URL}/api/ParametrizacaoHorarios`,
        { headers }
      );

      if (response.data.success) {
        const dias = response.data.data;
        setHorariosDisponiveis(dias);
        setHorarioSelecionado(null); // Limpa o horário selecionado
      } else {
        console.error(
          "Erro ao buscar dias disponíveis:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Erro ao listar dias disponíveis:", error);
    }
  };

  const horarioDisponivel = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    const diaSemana = new Date(time).getDay();
    const horario = horariosDisponiveis.find((h) => h.diaSemana === diaSemana);

    if (!horario) return false; // Se não houver horário disponível para o dia da semana, retorna falso

    const horaInicio = new Date(
      `${selectedDate.toISOString().split("T")[0]}T${horario.horaInicio}`
    );

    const horaFim = new Date(
      `${selectedDate.toISOString().split("T")[0]}T${horario.horaFim}`
    );

    if (selectedDate < horaInicio || selectedDate > horaFim) return false; // Se o horário não estiver dentro do intervalo, retorna falso

    if (preferenciaHorario.inicio !== "") {
      const horaPreferidaInicio = new Date(
        `${selectedDate.toISOString().split("T")[0]}T${
          preferenciaHorario.inicio
        }`
      );

      if (selectedDate < horaPreferidaInicio) {
        return false; // Se o horário não estiver dentro do intervalo preferido, retorna falso
      }
    }

    if (preferenciaHorario.fim !== "") {
      const horaPreferidaFim = new Date(
        `${selectedDate.toISOString().split("T")[0]}T${preferenciaHorario.fim}`
      );

      if (selectedDate > horaPreferidaFim) {
        return false; // Se o horário não estiver dentro do intervalo preferido, retorna falso
      }
    }

    const horariosIndisponiveisDate = horariosIndisponiveis.map((h) =>
      new Date(h).toISOString()
    );

    // Verifica se o horário já está agendado
    if (horariosIndisponiveisDate.includes(selectedDate.toISOString())) {
      return false; // Se o horário já estiver agendado, retorna falso
    }

    return currentDate.getTime() < selectedDate.getTime();
  };

  const filtrarData = (date) => {
    const diaSemana = new Date(date).getDay();
    const horario = horariosDisponiveis.find((h) => h.diaSemana === diaSemana);

    if (!horario) return false; // Se não houver horário disponível para o dia da semana, retorna falso

    const horaInicio = horario.horaInicio.split(":").map(Number)[0];
    const horaFim = horario.horaFim.split(":").map(Number)[0];

    for (let h = horaInicio; h < horaFim; h++) {
      for (let m = 0; m < 60; m += 15) {
        const tentativa = new Date(date);
        tentativa.setHours(h, m, 0, 0);
        if (horarioDisponivel(tentativa)) return true; // Pelo menos um horário válido
      }
    }
    return false; // Nenhum horário permitido => desabilita a data
  };

  const encontrarPrimeiraHoraValida = (dataSelecionada) => {
    const diaSemana = new Date(dataSelecionada).getDay();
    const horario = horariosDisponiveis.find((h) => h.diaSemana === diaSemana);

    if (!horario) return null; // Se não houver horário disponível para o dia da semana, retorna falso

    const horaInicio = horario.horaInicio.split(":").map(Number)[0];
    const horaFim = horario.horaFim.split(":").map(Number)[0];

    for (let h = horaInicio; h < horaFim; h++) {
      for (let m = 0; m < 60; m += 15) {
        const tentativa = new Date(dataSelecionada);
        tentativa.setHours(h, m, 0, 0);
        if (horarioDisponivel(tentativa)) return tentativa;
      }
    }
    return null;
  };

  const handleChange = (date) => {
    if (horarioDisponivel(date)) {
      setHorarioSelecionado(date);
      return;
    }

    const ajustado = encontrarPrimeiraHoraValida(date);
    if (ajustado) {
      setHorarioSelecionado(ajustado);
    } else {
      setHorarioSelecionado(date); // fallback, não deveria acontecer se filterDate estiver certo
    }
  };

  const confirmarAgendamento = async () => {
    if (!servicoSelecionado || !horarioSelecionado) {
      alert("Preencha todos os campos para agendar.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };

      const agendamento = {
        idCliente: parseInt(localStorage.getItem("clienteId")),
        idBarbeiro: barbeiroSelecionado ? parseInt(barbeiroSelecionado) : null,
        idServico: parseInt(servicoSelecionado),
        dataHoraInicio: new Date(
          horarioSelecionado.getTime() -
            horarioSelecionado.getTimezoneOffset() * 60000
        ).toISOString(),
      };

      const response = await axios.post(
        `${API_URL}/api/Agendamento/Agendar`,
        agendamento,
        { headers }
      );

      if (response.data.success) {
        alert("Agendamento realizado com sucesso!");
        navigate("/painel-cliente");
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

        <label>Serviço:</label>
        <select
          value={servicoSelecionado}
          onChange={(e) => setServicoSelecionado(e.target.value)}
        >
          <option value="">Selecione o serviço</option>
          {barbeiroSelecionado
            ? barbeiros
                .find((b) => b.id === parseInt(barbeiroSelecionado))
                ?.barbeiroServicos.map((bs) => (
                  <option key={bs.servico.id} value={bs.servico.id}>
                    {bs.servico.descricao}
                  </option>
                ))
            : servicos.map((servico) => (
                <option key={servico.id} value={servico.id}>
                  {servico.descricao}
                </option>
              ))}
        </select>

        <label>Barbeiro:</label>
        <select
          value={barbeiroSelecionado}
          onChange={(e) => setBarbeiroSelecionado(e.target.value)}
        >
          <option value="">Sem Preferência</option>
          {barbeiros.map((barbeiro) => (
            <option key={barbeiro.id} value={barbeiro.id}>
              {barbeiro.nome}
            </option>
          ))}
        </select>

        <label>Preferência de horário:</label>
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

        <div className="calendario">
          <label>Escolha o horário:</label>
          <DatePicker
            selected={horarioSelecionado ? new Date(horarioSelecionado) : null}
            onChange={(date) => handleChange(date)}
            filterTime={horarioDisponivel}
            filterDate={filtrarData}
            dateFormat="dd/MM/yyyy HH:mm"
            placeholderText={
              servicoSelecionado
                ? "Selecione um horário"
                : "Selecione um serviço primeiro"
            }
            locale="pt-BR"
            minDate={new Date()}
            timeIntervals={15}
            showTimeSelect
            disabled={!servicoSelecionado} // Desabilita o calendário se nenhum serviço for selecionado
          />
          {!servicoSelecionado && (
            <p className="warning">
              Por favor, selecione um serviço para habilitar o calendário.
            </p>
          )}
        </div>

        <button
          className="confirmar-agendamento"
          onClick={confirmarAgendamento}
        >
          Confirmar Agendamento
        </button>
      </div>

      <a className="back" href="/painel-cliente">
        Voltar
      </a>
    </div>
  );
}

export default Agendamento;
