import React, { useState, useEffect } from "react";
import axios from "axios";
import "./barbeiro.css";

function CadastrarBarbeiro() {
  const [nomeBarbeiro, setNomeBarbeiro] = useState("");
  const [barbeiros, setBarbeiros] = useState([]);

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

  const vincularServicos = (idBarbeiro) => {
    // Redirecionar para outra página ou abrir um modal (exemplo de redirect)
    window.location.href = `/vincular-servicos/${idBarbeiro}`;
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
              <button onClick={() => vincularServicos(barbeiro.id)}>
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
    </div>
  );
}

export default CadastrarBarbeiro;
