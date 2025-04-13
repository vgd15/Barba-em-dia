import React, { useState } from 'react';
import axios from 'axios';

const DadosUser = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleUpdateUserInfo = async () => {
    try {
      await axios.put(`https://pj2-biblioteca-univesp.onrender.com/api/User/${userId}`, {
        email,
        firstName,
        lastName,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Informações do usuário atualizadas com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar informações do usuário:', error);
      alert('Erro ao atualizar as informações. Tente novamente.');
    }
  };

  const handleUpdatePassword = async () => {
    if (!userId || !token) {
      alert('Usuário não autenticado. Faça login novamente.');
      return;
    }

    try {
      await axios.put(
        `https://pj2-biblioteca-univesp.onrender.com/api/User/UpdatePassword/${userId}`,
        { 
          oldPassword, 
          newPassword 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Senha atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar a senha:', error);
      if (error.response) {
        console.error('Detalhes do erro:', error.response.data);
      }
      alert('Erro ao atualizar a senha. Verifique se os dados estão corretos e tente novamente.');
    }
  };

  return (
    <div className="dados-user">
      <h2>Editar Dados do Usuário</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Nome:</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div>
        <label>Sobrenome:</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>

      <button className="mt-2 mb-3" onClick={handleUpdateUserInfo}>
        Atualizar Informações
      </button>
      <br />

      {!isAdmin && (
        <>
          <h3>Alterar Senha</h3>
          <div>
            <label>Senha Antiga:</label>
            <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          </div>
          <div>
            <label>Nova Senha:</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <button onClick={handleUpdatePassword}>Atualizar Senha</button>
          <br />
          <br />
        </>
      )}

      <a className="pb-2" href="/products">
        Voltar para página inicial
      </a>
    </div>
  );
};

export default DadosUser;
