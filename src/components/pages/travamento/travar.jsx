import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "./travar.css";

function TravarAgenda() {
  const [idBarbeiro, setIdBarbeiro] = useState("");
  const [motivo, setMotivo] = useState("");
  const [dataHoraInicio, setDataHoraInicio] = useState(null);
  const [dataHoraFim, setDataHoraFim] = useState(null);
  const [travamentos, setTravamentos] = useState([]);
  const [idSelecionado, setIdSelecionado] = useState(null); // Para editar

  const API_URL = "http://localhost:5243";

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };

  const limparCampos = () => {
    setIdBarbeiro("");
    setMotivo("");
    setDataHoraInicio(null);
    setDataHoraFim(null);
    setIdSelecionado(null);
  };

  const listarTravamentos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/Travamentos`, { headers });
      if (response.data.success) {
        setTravamentos(response.data.data);
      } else {
        alert("Erro ao buscar travamentos: " + response.data.message);
      }
    } catch (error) {
      console.error("Erro ao buscar travamentos:", error);
    }
  };

  useEffect(() => {
    listarTravamentos();
  }, []);

  const salvarTravamento = async () => {
    if (!idBarbeiro || !motivo || !dataHoraInicio || !dataHoraFim) {
      alert("Preencha todos os campos.");
      return;
    }

    const payload = {
      idBarbeiro: parseInt(idBarbeiro),
      motivo,
      dataHoraInicio: dataHoraInicio.toISOString(),
      dataHoraFim: dataHoraFim.toISOString(),
    };

    try {
      if (idSelecionado) {
        // Se houver ID selecionado, é edição (PUT)
        await axios.put(`${API_URL}/api/Travamentos/${idSelecionado}`, payload, { headers });
        alert("Travamento atualizado com sucesso!");
      } else {
        // Se não, é cadastro novo (POST)
        await axios.post(`${API_URL}/api/Travamentos`, payload, { headers });
        alert("Travamento cadastrado com sucesso!");
      }
      listarTravamentos();
      limparCampos();
    } catch (error) {
      console.error("Erro ao salvar travamento:", error);
      alert("Erro ao salvar travamento.");
    }
  };

  const editarTravamento = (travamento) => {
    setIdSelecionado(travamento.id);
    setIdBarbeiro(travamento.barbeiro.id);
    setMotivo(travamento.motivo);
    setDataHoraInicio(new Date(travamento.dataHoraInicio));
    setDataHoraFim(new Date(travamento.dataHoraFim));
  };

  const deletarTravamento = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esse travamento?")) return;

    try {
      await axios.delete(`${API_URL}/api/Travamentos/${id}`, { headers });
      alert("Travamento excluído com sucesso!");
      listarTravamentos();
    } catch (error) {
      console.error("Erro ao excluir travamento:", error);
      alert("Erro ao excluir travamento.");
    }
  };

  return (
    <div className="travar-agenda">
      <h2>Gerenciar Travamentos</h2>

      <div className="form-group">
        <label>ID do Barbeiro:</label>
        <input
          type="number"
          value={idBarbeiro}
          onChange={(e) => setIdBarbeiro(e.target.value)}
          placeholder="Digite o ID do barbeiro"
        />
      </div>

      <div className="form-group">
        <label>Motivo:</label>
        <input
          type="text"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          placeholder="Digite o motivo"
        />
      </div>

      <div className="form-group">
        <label>Data e Hora de Início:</label>
        <DatePicker
          selected={dataHoraInicio}
          onChange={(date) => setDataHoraInicio(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="dd/MM/yyyy HH:mm"
          placeholderText="Selecione a data e hora de início"
          locale="pt-BR"
        />
      </div>

      <div className="form-group">
        <label>Data e Hora de Fim:</label>
        <DatePicker
          selected={dataHoraFim}
          onChange={(date) => setDataHoraFim(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="dd/MM/yyyy HH:mm"
          placeholderText="Selecione a data e hora de fim"
          locale="pt-BR"
        />
      </div>

      <button className="confirmar-travamento" onClick={salvarTravamento}>
        {idSelecionado ? "Atualizar Travamento" : "Cadastrar Travamento"}
      </button>

      <hr />

      <h3>Travamentos Existentes</h3>
      <div className="lista-travamentos">
        {travamentos.length === 0 && <p>Nenhum travamento cadastrado.</p>}

        {travamentos.map((travamento) => (
          <div key={travamento.id} className="item-travamento">
            <p><strong>Barbeiro:</strong> {travamento.barbeiro?.nome}</p>
            <p><strong>Motivo:</strong> {travamento.motivo}</p>
            <p><strong>Início:</strong> {new Date(travamento.dataHoraInicio).toLocaleString()}</p>
            <p><strong>Fim:</strong> {new Date(travamento.dataHoraFim).toLocaleString()}</p>

            <div className="botoes-travamento">
              <button onClick={() => editarTravamento(travamento)}>Editar</button>
              <button onClick={() => deletarTravamento(travamento.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TravarAgenda;
