import React, { useEffect } from "react";  // Certifique-se de importar useEffect

import Hero from './Hero/Hero';
import Servicos from './Servicos/Servicos';
import SobreNos from './SobreNos/SobreNos';
import Contato from './Contato/Contato';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import WhatsAppButton from './WhatsAppButton/WhatsAppButton';
import "./style.css";
import axios from 'axios';

function Home() {
  
  return (
    <>
    <Header />
    <Hero />
    <SobreNos />
    <Servicos />
    <Contato />
    <Footer />
    <WhatsAppButton />
  </>
);
}

export default Home;
