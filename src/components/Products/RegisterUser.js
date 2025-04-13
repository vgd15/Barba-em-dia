import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterUser() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAdministrator, setIsAdministrator] = useState(false); // Novo estado para o campo isAdministrator
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Supondo que o token foi armazenado ao fazer login

      const response = await axios.post('https://pj2-biblioteca-univesp.onrender.com/api/User', {
        email,
        firstName,
        lastName,
        isAdministrator,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        alert('Usuário registrado com sucesso!');
        navigate('/login'); // Redireciona para a página de login após o registro
      } else {
        alert('Erro ao registrar o usuário');
      }
    } catch (error) {
      console.error('Erro ao registrar o usuário:', error);
      alert('Erro ao registrar o usuário');
    }
  };

  return (
    <div className="register-container">
      <div className='container'>
        <div className='register-form'>
      <h2>Registrar Usuário</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Primeiro Nome"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Sobrenome"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label>
          Administrador:
          <input
            type="checkbox"
            checked={isAdministrator}
            onChange={(e) => setIsAdministrator(e.target.checked)}
          />
        </label>
        <button type="submit">Registrar</button>
      </form>
      <a className="pb-2" href='/products'>Voltar para página inicial</a>
      </div>
      </div>
    </div>
  );
}

export default RegisterUser;
