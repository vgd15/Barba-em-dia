import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductForm from './components/Products/ProductForm.js';
import ProductList from './components/Products/ProductList.js';
import Login from './components/Auth/Login.js'
import './App.css';
import Home from './components/pages/home.jsx';
import DadosUser from './components/Products/DadosUser.js';
import RegisterUser from './components/Products/RegisterUser.js';
import Users from './components/Products/Users.js';
import Agendamento from './components/pages/Agendamento/Agendamento.jsx';

function App() {


  return (
    <div class="app">
       <Router>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path='/agendamento' element={<Agendamento />} />
          <Route path="/login" element={<Login />} />
           <Route path="/products" element={<ProductList />} />
           <Route path="/products/create-product" element={<ProductForm />} />
           <Route path="/products/update-product/:id" element={<ProductForm />} /> 
           <Route path="/meus-dados" element={<DadosUser />} />
           <Route path="/register" element={<RegisterUser/>} />
           <Route path="/users" element={<Users/>} />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
