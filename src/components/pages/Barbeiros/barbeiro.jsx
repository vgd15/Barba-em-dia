import React, { useState, useEffect } from "react";
import axios from "axios";
import "./barbeiro.css";

function CadastrarBarbeiro() {
  const [nomeBarbeiro, setNomeBarbeiro] = useState("");
  const [barbeiros, setBarbeiros] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState(null);
  const [todosServicos, setTodosServicos] = useState([]);
  const [servicosSelecionados, setServicosSelecionados] = useState([]);

  const API_URL = "https://backendbarbaemdia.onrender.com";

  useEffect(() => {
    buscarBarbeiros();
  }, []);

  const buscarBarbeiros = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get(`${API_URL}/api/Barbeiros`, { headers });
      if (response.data.success) {
        setBarbeiros(response.data.data);
      }
    } catch (error) {
      console.error("Erro ao buscar barbeiros:", error);
    }
  };

  const cadastrarBarbeiro = async () => {
    if (!nomeBarbeiro) {
      alert("Informe o nome do barbeiro.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.post(
        `${API_URL}/api/Barbeiros`,
        { nome: nomeBarbeiro },
        { headers }
      );
      if (response.data.success) {
        alert("Barbeiro cadastrado com sucesso!");
        setNomeBarbeiro("");
        buscarBarbeiros();
      } else {
        alert("Erro ao cadastrar: " + response.data.message);
      }
    } catch (error) {
      console.error("Erro ao cadastrar barbeiro:", error);
      alert("Erro ao cadastrar barbeiro.");
    }
  };

  const excluirBarbeiro = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este barbeiro?"))
      return;

    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.delete(`${API_URL}/api/Barbeiros/${id}`, { headers });
      alert("Barbeiro excluído com sucesso!");
      buscarBarbeiros();
    } catch (error) {
      console.error("Erro ao excluir barbeiro:", error);
      alert("Erro ao excluir barbeiro.");
    }
  };

  const abrirModalVinculo = async (idBarbeiro) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [barbeiroResp, servicosResp] = await Promise.all([
        axios.get(`${API_URL}/api/Barbeiros/${idBarbeiro}`, { headers }),
        axios.get(`${API_URL}/api/Servicos`, { headers }),
      ]);

      const barbeiro = barbeiroResp.data.data;
      const todosServicos = servicosResp.data.data;

      const servicosVinculados = barbeiro.barbeiroServicos.map((bs) => ({
        id: bs.servico.id,
        duracao: (bs.tempoPersonalizado ?? bs.servico.duracaoPadrao).substring(
          0,
          5
        ), // "00:30"
      }));

      setBarbeiroSelecionado(barbeiro);
      setTodosServicos(todosServicos);
      setServicosSelecionados(servicosVinculados);
      setModalAberto(true);
    } catch (error) {
      console.error("Erro ao abrir modal:", error);
      alert("Erro ao carregar dados do barbeiro.");
    }
  };

  const toggleServico = async (id) => {
    const jaSelecionado = servicosSelecionados.find((s) => s.id === id);

    if (jaSelecionado) {
      setServicosSelecionados(servicosSelecionados.filter((s) => s.id !== id));

      const jaVinculado = barbeiroSelecionado.barbeiroServicos.some(
        (bs) => bs.servico.id === id
      );

      if (jaVinculado) {
        try {
          const token = localStorage.getItem("token");
          const headers = { Authorization: `Bearer ${token}` };
          await axios.delete(
            `${API_URL}/api/BarbeiroServico?idBarbeiro=${barbeiroSelecionado.id}&idServico=${id}`,
            { headers }
          );
        } catch (error) {
          console.error("Erro ao remover vínculo:", error);
          alert("Erro ao remover vínculo.");
        }
      }
    } else {
      setServicosSelecionados([
        ...servicosSelecionados,
        { id, duracao: "00:30" },
      ]);
    }
  };

  const alterarDuracao = (id, novaDuracao) => {
    setServicosSelecionados((prev) =>
      prev.map((s) => (s.id === id ? { ...s, duracao: novaDuracao } : s))
    );
  };

  const salvarVinculo = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const idsAtuais = barbeiroSelecionado.barbeiroServicos.map(
        (bs) => bs.servico.id
      );

      const novosServicos = servicosSelecionados.filter(
        (s) => !idsAtuais.includes(s.id)
      );

      for (const servico of novosServicos) {
        await axios.post(
          `${API_URL}/api/BarbeiroServico`,
          {
            idBarbeiro: barbeiroSelecionado.id,
            idServico: servico.id,
            tempoPersonalizado: servico.duracao + ":00", // ex: "00:30:00"
          },
          { headers }
        );
      }

      alert("Vínculos salvos com sucesso!");
      setModalAberto(false);
      buscarBarbeiros();
    } catch (error) {
      console.error("Erro ao salvar vínculos:", error);
      alert("Erro ao salvar vínculos.");
    }
  };

  return (
    <div className="travar-agenda">
      <h2>Cadastrar Novo Barbeiro</h2>

      <div className="form-group">
        <label>Nome:</label>
        <input
          type="text"
          value={nomeBarbeiro}
          onChange={(e) => setNomeBarbeiro(e.target.value)}
          placeholder="Nome do barbeiro"
        />
        <button className="confirmar-travamento" onClick={cadastrarBarbeiro}>
          Cadastrar
        </button>
      </div>

      <h3>Barbeiros Cadastrados</h3>
      <ul className="lista-barbeiros">
        {barbeiros.map((barbeiro) => (
          <li key={barbeiro.id} className="barbeiro-item">
            <span>{barbeiro.nome}</span>
            <div className="acoes">
              <button onClick={() => abrirModalVinculo(barbeiro.id)}>
                Vincular serviços
              </button>
              <button
                className="btn-excluir"
                onClick={() => excluirBarbeiro(barbeiro.id)}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>

      {modalAberto && (
        <div className="modal">
          <div className="modal-content">
            <h3>Serviços de {barbeiroSelecionado.nome}</h3>
            <div className="lista-servicos">
              {todosServicos.map((servico) => {
                const selecionado = servicosSelecionados.find(
                  (s) => s.id === servico.id
                );
                return (
                  <div key={servico.id} className="servico-item">
                    <input
                      type="checkbox"
                      checked={!!selecionado}
                      onChange={() => toggleServico(servico.id)}
                    />
                    <label>{servico.descricao}</label>
                    {selecionado && (
                      <input
                        type="time"
                        value={selecionado.duracao}
                        onChange={(e) =>
                          alterarDuracao(servico.id, e.target.value)
                        }
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="botoes-modal">
              <button onClick={salvarVinculo}>Salvar</button>
              <button onClick={() => setModalAberto(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CadastrarBarbeiro;
