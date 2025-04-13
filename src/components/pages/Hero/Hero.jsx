import React from 'react';
import Slider from 'react-slick';
import './Hero.css';

// Importe suas imagens
import img from "../../img/img.jpeg";
import img1 from "../../img/img1.jpeg";
import img2 from "../../img/img2.jpeg";
import img3 from "../../img/img3.jpeg";
import img4 from "../../img/img4.jpeg";

export default function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,  // A imagem muda a cada 3 segundos
  };

  return (
    <section id="home" className="hero">
      <h1>Paulinho Barbearia</h1>
      <p>Estilo, tradição e cuidado em cada detalhe</p>
      <div className="slider-container">
        <Slider {...settings}>
          <div>
            <img src={img} alt="Imagem 1" className="slider-image" />
          </div>
          <div>
            <img src={img1} alt="Imagem 2" className="slider-image" />
          </div>
          <div>
            <img src={img2} alt="Imagem 3" className="slider-image" />
          </div>
          <div>
            <img src={img3} alt="Imagem 3" className="slider-image" />
          </div>
          <div>
            <img src={img4} alt="Imagem 4" className="slider-image" />
          </div>
        </Slider>
      </div>
    </section>
  );
}
