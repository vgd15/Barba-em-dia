import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Auth.css";
import HeaderInicial from "../pages/header-home";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting login with:', { email, password });

    try {
      const response = await axios.post('https://pj2-biblioteca-univesp.onrender.com/api/User/Login', {
        email,
        password,
      });

      // Verifique se a resposta contém os dados esperados
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
        navigate('/products');
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user"
                  required
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
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

export default Login;
