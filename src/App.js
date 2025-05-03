import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './components/Auth/LoginAdmin.js'
import AdminPainel from './components/pages/Admin/Admin.jsx'
import Login from './components/Auth/LoginCliente.js'
import './App.css';
import Home from './components/pages/home.jsx';
import Agendamento from './components/pages/Agendamento/Agendamento.jsx';
import "./components/pages/style.css"
import PainelCliente from './components/pages/PainelCliente/PainelCliente.jsx';
import ConsultarAgenda from './components/pages/ConsultarAgendaCliente/ConsultarAgendaCliente.jsx';

function App() {


  return (
    <div class="app">
       <Router>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path='/agendamento' element={<Agendamento />} />
           <Route path="/admin" element={<Admin />} />
           <Route path="/admin-painel" element={<AdminPainel />} />
           <Route path="/painel-cliente" element={<PainelCliente />} />
           <Route path="/login" element={< Login/>} />
           <Route path="/consultar-agenda" element={< ConsultarAgenda/>} />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
