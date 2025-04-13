import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import UsersHeader from './UsersHeader';
import { useNavigate } from 'react-router-dom';
import "./products.css";


const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get('https://pj2-biblioteca-univesp.onrender.com/api/User', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      alert('Erro ao carregar a lista de usuários.');
    }
  }, [token]);

  const handleDeactivateUser = async (userId) => {
    try {
      const response = await axios.put(
        `https://pj2-biblioteca-univesp.onrender.com/api/User/DeactivateUser/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        alert('Usuário desativado com sucesso!');
        fetchUsers();
      }
    } catch (error) {
      console.error('Erro ao desativar usuário:', error);
      alert('Erro ao desativar o usuário. Tente novamente.');
    }
  };

  const handleEditUser = (userId) => {
    localStorage.setItem('userId', userId); // Salva o ID do usuário selecionado no localStorage
    navigate('/meus-dados'); // Navega para a rota de edição de dados
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div class="users">
      <UsersHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className='container'>
      <h2>Lista de Usuários</h2>
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <span>
              {user.firstName} {user.lastName} ({user.email})
            </span>
            {user.active ? (
             
               <div className='desativar-editar'>
                <button onClick={() => handleDeactivateUser(user.id)}>Desativar</button>
                <button onClick={() => handleEditUser(user.id)}>Editar dados</button>
                </div>
              
            ) : (
              <span>Desativado</span>
            )}
          </li>
        ))}
      </ul>
      <a className="pb-2" href='/products'>Voltar para página inicial</a>
      </div>
    </div>
  );
};

export default Users;
