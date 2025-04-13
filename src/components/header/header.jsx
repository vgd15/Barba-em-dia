import React, { useState, useEffect } from "react";
import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../img/DevoluWeb.svg";

function Header() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggingOut(true); // Inicia o processo de logout e exibe a barra
    localStorage.removeItem('isAdmin'); // Remove o item 'isAdmin' do localStorage
  };

  useEffect(() => {
    if (isLoggingOut) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) {
            return prev + 10; 
          } else {
            clearInterval(interval);
            navigate('/'); 
            return 100;
          }
        });
      }, 100); // Ajuste o tempo do incremento da barra (100ms) conforme necessário
    }
  }, [isLoggingOut, navigate]);

  return (
    <header className="header-geral">
      <section className="wrapper-desktop d-flex justify-content-between align-items-center">
        <div className="d-flex flex-row gap-3 justify-content-center align-items-center">
          <img src={logo} alt="logo da empresa" />
        </div>
        <div className="links-button">
          <ul className="d-flex justify-content-between align-items-center gap-3">
            {isAdmin && (
              <>
                <li>
                  <Link to="/products/create-product">
                    <button>Adicionar novo produto</button>
                  </Link>
                </li>
                <li>
                  <Link to="/users">
                    <button>Usuários</button>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      alert("Usuário deslogado"); // Exibe o alerta
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {!isAdmin && (
              <>
                <li>
                  <Link to="/meus-dados">
                    <button>Meus Dados</button>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      alert("Usuário deslogado"); // Exibe o alerta
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </section>

      {isLoggingOut && (
        <div className="logout-progress">
          <p>Deslogando...</p>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
