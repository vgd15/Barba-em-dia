import React, { useEffect } from "react";  // Certifique-se de importar useEffect

import Hero from './Hero/Hero';
import Servicos from './Servicos/Servicos';
import SobreNos from './SobreNos/SobreNos';
import Contato from './Contato/Contato';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import "./style.css";
import axios from 'axios';

function Home() {

  useEffect(() => {  // useEffect recebe uma função
    const wakeuprender = async () => {
      // Seu código aqui
      try {
        const response = await axios.post('https://pj2-biblioteca-univesp.onrender.com/api/User/Login', {
          email: "minions",
          password: "minions"
        }) 
        console.log(response.data);
    } catch (err) {
        console.error(err); 
      };
    };

    wakeuprender();  // Chama a função
  }, []); // Array de dependências, neste caso vazio

  return (
    <>
    <Header />
    <Hero />
    <SobreNos />
    <Servicos />
    <Contato />
    <Footer />
  </>
);
}

export default Home;
