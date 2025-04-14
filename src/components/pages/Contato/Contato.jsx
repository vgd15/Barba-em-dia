import './Contato.css'
import { FaWhatsapp } from "react-icons/fa";

export default function Contato() {
    return (
      <section id="contato" className="contato">
        <h2>Contato</h2>
        <p>Agende seu horário pelo WhatsApp</p>
        <a href="https://wa.me/551993640353" target="_blank" rel="noreferrer">
          <FaWhatsapp />  Whatsapp
        </a>
      </section>
    );
  }
  