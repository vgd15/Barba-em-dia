import React, { useState, useEffect } from "react";
import axios from "axios";

function ServicosPainel() {
  const [servicos, setServicos] = useState([]);
  const [novoServico, setNovoServico] = useState({
    descricao: "",
    duracaoPadrao: "00:00",
    preco: 0,
    ativo: true,
  });
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [idBusca, setIdBusca] = useState("");
  const API_URL = "https://backendbarbaemdia.onrender.com"; // ajuste se necessário

  useEffect(() => {
    buscarTodosServicos();
  }, []);

  const getTokenHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };
  };

  const buscarTodosServicos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/Servicos`, {
        headers: getTokenHeaders(),
      });
      if (response.data.success) {
        setServicos(response.data.data);
      }
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    }
  };

  const buscarServicoPorId = async () => {
    if (!idBusca) {
      alert("Informe o ID para buscar");
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/api/Servicos/${idBusca}`, {
        headers: getTokenHeaders(),
      });
      if (response.data.success) {
        setServicoSelecionado(response.data.data);
      }
    } catch (error) {
      console.error("Erro ao buscar serviço:", error);
    }
  };

  const cadastrarServico = async () => {
    try {
      novoServico.duracaoPadrao = novoServico.duracaoPadrao + ":00";

      const response = await axios.post(
        `${API_URL}/api/Servicos`,
        novoServico,
        { headers: getTokenHeaders() }
      );
      if (response.data.success) {
        alert("Serviço cadastrado com sucesso!");
        buscarTodosServicos();
        setNovoServico({
          descricao: "",
          duracaoPadrao: "00:00",
          preco: 0,
          ativo: true,
        });
      } else {
        alert("Erro ao cadastrar serviço.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar serviço:", error);
    }
  };

  const deletarServico = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/Servicos/${id}`, {
        headers: getTokenHeaders(),
      });
      alert("Serviço deletado com sucesso!");
      buscarTodosServicos();
    } catch (error) {
      console.error("Erro ao deletar serviço:", error);
    }
  };

  const ativarServico = async (id) => {
    try {
      await axios.put(
        `${API_URL}/api/Servicos/Ativar/${id}`,
        {},
        { headers: getTokenHeaders() }
      );
      alert("Serviço ativado com sucesso!");
      buscarTodosServicos();
    } catch (error) {
      console.error("Erro ao ativar serviço:", error);
    }
  };

  const inativarServico = async (id) => {
    try {
      await axios.put(
        `${API_URL}/api/Servicos/Inativar/${id}`,
        {},
        { headers: getTokenHeaders() }
      );
      alert("Serviço inativado com sucesso!");
      buscarTodosServicos();
    } catch (error) {
      console.error("Erro ao inativar serviço:", error);
    }
  };

  return (
    <div className="servicos-painel">
      <h2>Painel de Serviços</h2>

      <div className="formulario-cadastro">
        <h3>Cadastrar Novo Serviço</h3>
        <input
          type="text"
          placeholder="Descrição"
          value={novoServico.descricao}
          onChange={(e) =>
            setNovoServico({ ...novoServico, descricao: e.target.value })
          }
        />
        <input
          type="time"
          placeholder="Duração Padrão (ex: 00:30)"
          value={novoServico.duracaoPadrao}
          onChange={(e) =>
            setNovoServico({ ...novoServico, duracaoPadrao: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Preço"
          value={novoServico.preco}
          onChange={(e) =>
            setNovoServico({
              ...novoServico,
              preco: parseFloat(e.target.value),
            })
          }
        />
        <button onClick={cadastrarServico}>Cadastrar Serviço</button>
      </div>

      <div className="buscar-servico">
        <h3>Buscar Serviço por ID</h3>
        <input
          type="number"
          placeholder="Digite o ID"
          value={idBusca}
          onChange={(e) => setIdBusca(e.target.value)}
        />
        <button onClick={buscarServicoPorId}>Buscar</button>

        {servicoSelecionado && (
          <div className="servico-detalhes">
            <h4>Detalhes do Serviço:</h4>
            <p>
              <b>ID:</b> {servicoSelecionado.id}
            </p>
            <p>
              <b>Descrição:</b> {servicoSelecionado.descricao}
            </p>
            <p>
              <b>Duração:</b> {servicoSelecionado.duracaoPadrao}
            </p>
            <p>
              <b>Preço:</b> R$ {servicoSelecionado.preco}
            </p>
            <p>
              <b>Ativo:</b> {servicoSelecionado.ativo ? "Sim" : "Não"}
            </p>
          </div>
        )}
      </div>

      <div className="lista-servicos">
        <h3>Lista de Serviços</h3>
        <ul>
          {servicos.map((servico) => (
            <li key={servico.id}>
              <strong>{servico.descricao}</strong> - {servico.duracaoPadrao} -
              R$ {servico.preco} - {servico.ativo ? "Ativo" : "Inativo"}
              <div className="acoes-servico">
                <button onClick={() => ativarServico(servico.id)}>
                  Ativar
                </button>
                <button onClick={() => inativarServico(servico.id)}>
                  Inativar
                </button>
                <button onClick={() => deletarServico(servico.id)}>
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ServicosPainel;
