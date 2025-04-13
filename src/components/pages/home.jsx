import React, { useEffect } from "react";  // Certifique-se de importar useEffect
import HeaderInicial from "./header-home";
import imgBoxLivros from "../img/boxLivros.svg";
import devolvaButton from "../img/devolvaButton.svg";
import imgLivros from "../img/Ellipse 2.svg";
import imgLivros2 from "../img/Ellipse 3.svg";
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
    <div>
      <HeaderInicial />
      <main className="home">
        <div className="container">
          <div className="content-wrapper d-flex justify-content-center align-items-center">
            <div className="image-container1">
              <img src={imgBoxLivros} alt="imagem box de livros" />
            </div>
            <div className="image-container2">
              <a href="/login">
                <img src={devolvaButton} alt="Botão devolva com facilidade" />
              </a>
            </div>
          </div>
          <div className="box d-flex flex-wrap text-center justify-content-center">
            <h1>TESTANNDOOOO MUDANÇASSSSSSSS</h1>
            <div>
              <img src={imgLivros} alt="É possível devolver seus livros em segundos!" />
            </div>
            <div>
              <img src={imgLivros2} alt="Fale conosco em caso de dúvidas!" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
