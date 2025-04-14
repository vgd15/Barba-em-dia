import React from "react";
import "./Footer.css";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Paulinho Barbearia</h4>
          <p>📍  Av. Dois Córregos, 4013 <p> 📍Jd. Nova Iguaçu | Piracicaba - SP</p></p>
          <p>📞 (19) 99364-0353</p>
          <p>📧 contato@paulinhobarbearia.com</p>
        </div>

        <div className="footer-section">
          <h4>Horário de Funcionamento</h4>
          <p>Terça a Sexta: 8h às 19h</p>
          <p>Sabado: 8h aos 16h</p>
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
      </div>

      <p className="copyright">
        © 2025 Paulinho Barbearia. Todos os direitos reservados.
      </p>
    </footer>
  );
}
