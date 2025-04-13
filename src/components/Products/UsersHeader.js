import React from 'react';
import { useNavigate } from 'react-router-dom';

const UsersHeader = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div style={styles.header}>
      <input
        type="text"
        placeholder="Encontrar usuários"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de pesquisa
        style={styles.searchBar}
      />
      <button onClick={handleRegisterClick} style={styles.registerButton}>
        Cadastrar usuários
      </button>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#f9f9f9',
    borderBottom: '1px solid #e0e0e0',
  },
  searchBar: {
    padding: '8px',
    fontSize: '16px',
    width: '60%',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  registerButton: {
    padding: '8px 16px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default UsersHeader;
