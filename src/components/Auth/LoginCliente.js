import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Auth.css";
import HeaderInicial from "../pages/header-home";

const LoginCliente = () => {
  const [nrTelefone, setNrTelefone] = useState('');
  const [nome, setNome] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Limpa sessão anterior ao entrar na tela de login
    console.log("Limpando sessão anterior...");
    localStorage.removeItem("token");
    localStorage.removeItem("clienteId");
    localStorage.removeItem("clienteNome");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Enviando dados para login:', { nrTelefone, nome });

    try {
      const response = await axios.post('https://backendbarbaemdia.onrender.com/api/Clientes/Login', {
        nrTelefone,
        nome,
      });

      if (response.data?.success && response.data?.data?.token && response.data?.data?.cliente) {
        const { token, cliente } = response.data.data;

        localStorage.setItem('token', token);
        localStorage.setItem('clienteId', cliente.id);
        localStorage.setItem('clienteNome', cliente.nome);

        console.log('Login realizado com sucesso:', {
          token,
          clienteId: cliente.id,
          clienteNome: cliente.nome
        });

        navigate('/painel-cliente');
      } else {
        console.warn('Resposta inválida do servidor:', response.data);
        alert('Credenciais inválidas. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      alert('Erro ao fazer login. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div>
      <HeaderInicial />
      <div className="page-login d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center flex-wrap">
            <div className="formulario">
              <form className="d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={nrTelefone}
                  onChange={(e) => setNrTelefone(e.target.value)}
                  placeholder="Telefone"
                  required
                />
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome"
                  required
                />
                <button className="login" type="submit">Logar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCliente;
