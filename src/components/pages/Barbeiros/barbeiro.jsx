import React, { useState, useEffect } from "react";
import axios from "axios";
import "./barbeiro.css"; // seu css aqui

function CadastrarBarbeiro() {
  const [nomeBarbeiro, setNomeBarbeiro] = useState("");
  const [tempoPadrao, setTempoPadrao] = useState("");
  const [servicos, setServicos] = useState([]);
  const [servicosSelecionados, setServicosSelecionados] = useState([]);

  const API_URL = "https://backendbarbaemdia.onrender.com";

  useEffect(() => {
    buscarServicos();
  }, []);

  const buscarServicos = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get(`${API_URL}/api/Servicos`, { headers });
      if (response.data.success) {
        setServicos(response.data.data);
      }
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    }
  };

  const handleCheckboxChange = (idServico) => {
    if (servicosSelecionados.includes(idServico)) {
      setServicosSelecionados(servicosSelecionados.filter(id => id !== idServico));
    } else {
      setServicosSelecionados([...servicosSelecionados, idServico]);
    }
  };

  const cadastrarBarbeiro = async () => {
    if (!nomeBarbeiro) {
      alert("Preencha o nome do barbeiro.");
      return;
    }
    if (servicosSelecionados.length === 0) {
      alert("Selecione pelo menos um serviço.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}`, Accept: "application/json" };

      // 1. Cadastrar o barbeiro
      const response = await axios.post(`${API_URL}/api/Barbeiros`, { nome: nomeBarbeiro }, { headers });

      if (response.data.success) {
        const idBarbeiro = response.data.data.id;

        // 2. Vincular serviços
        for (let idServico of servicosSelecionados) {
          await axios.post(`${API_URL}/api/BarbeiroServico`, {
            idBarbeiro,
            idServico,
            tempoPersonalizado: tempoPadrao
          }, { headers });
        }

        alert("Barbeiro cadastrado com sucesso!");
        limparFormulario();
      } else {
        alert("Erro ao cadastrar barbeiro: " + response.data.message);
      }
    } catch (error) {
      console.error("Erro ao cadastrar barbeiro:", error);
      alert("Erro ao cadastrar barbeiro.");
    }
  };

  const limparFormulario = () => {
    setNomeBarbeiro("");
    setTempoPadrao("");
    setServicosSelecionados([]);
  };

  return (
    <div className="travar-agenda">
      <h2>Cadastrar Barbeiro</h2>

      <div className="form-group">
        <label>Nome do barbeiro:</label>
        <input
          type="text"
          value={nomeBarbeiro}
          onChange={(e) => setNomeBarbeiro(e.target.value)}
          placeholder="Digite o nome do barbeiro"
        />
      </div>

      <div className="form-group">
        <label>Serviços prestados:</label>
        <div className="servicos-lista">
          {servicos.map((servico) => (
            <div key={servico.id} className="checkbox-servico">
              <input
                type="checkbox"
                id={`servico-${servico.id}`}
                checked={servicosSelecionados.includes(servico.id)}
                onChange={() => handleCheckboxChange(servico.id)}
              />
              <label htmlFor={`servico-${servico.id}`}>{servico.descricao}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Tempo padrão:</label>
        <input
          type="text"
          placeholder="Ex: 00:30"
          value={tempoPadrao}
          onChange={(e) => setTempoPadrao(e.target.value)}
        />
      </div>

      <button className="confirmar-travamento" onClick={cadastrarBarbeiro}>
        Cadastrar Barbeiro
      </button>
    </div>
  );
}

export default CadastrarBarbeiro;
