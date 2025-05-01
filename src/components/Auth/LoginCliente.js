import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Auth.css";
import HeaderInicial from "../pages/header-home";

const LoginCliente = () => {
  const [nrTelefone, setNrTelefone] = useState('');
  const [nome, setNome] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting login with:', { nrTelefone, nome });

    try {
      const response = await axios.post('https://backendbarbaemdia.onrender.com/api/Clientes/Login', {
        nrTelefone,
        nome,
      });

      if (response.data && response.data.data && response.data.data.token) {
        const { token, id: userId, isAdministrator } = response.data.data;

        // Armazenar o token, userId e isAdmin no localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId); // Armazena o ID do usuário
        localStorage.setItem('isAdmin', isAdministrator); // Armazena o status de administrador

        console.log('Token, User ID, and Admin status stored:', {
          token: localStorage.getItem('token'),
          userId: localStorage.getItem('userId'),
          isAdmin: localStorage.getItem('isAdmin')
        });

        // Redireciona para a página de produtos
        navigate('/painel-cliente');
      } else {
        console.error('No token received:', response.data);
        alert('Login failed, please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed, please check your credentials and try again.');
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
                  type="password"
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
