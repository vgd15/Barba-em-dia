import React from "react";
import "./Footer.css";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Paulinho Barbearia</h4>
          <p>📍 Av. Dois Córregos, 4013</p>
          <p>📍 Jd. Nova Iguaçu | Piracicaba - SP</p>
          <p>📞 (19) 99364-0353</p>
          <p>📧 contato@paulinhobarbearia.com</p>
        </div>

        <div className="footer-section">
          <h4>Nosso Horário</h4>
          <p>Terça a Sexta: 8h às 19h</p>
          <p>Sábado: 8h às 16h</p>
        </div>

        <div className="footer-section">
          <h4>Redes Sociais</h4>
          <div className="social-icons">
            <a href="https://www.instagram.com/paulinhobarbeariapiracicaba/" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/barbershoppaulinho" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" aria-label="TikTok">
              <FaTiktok />
            </a>
          </div>

        </div>

          <div className="footer-section mapa">
                <h4>Como Chegar</h4>
                <iframe
                  title="Localização da Paulinho Barbearia"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4527.687899298826!2d-47.5931126!3d-22.741441199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c62fddbc2bc985%3A0x432b0e1b3a33369e!2sPaulinho%20Barbearia%20-%20Corte%20Adulto%20e%20Infantil%20Feminino%20e%20Masculino!5e1!3m2!1spt-BR!2sbr!4v1744594239998!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="180"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
        
      </div>

      <p className="copyright">
        © 2025 Paulinho Barbearia. Todos os direitos reservados.
      </p>
    </footer>
  );
}
