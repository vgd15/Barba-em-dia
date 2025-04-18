// components/WhatsAppButton.jsx
import React from "react";
import "./WhatsAppButton.css"; // Vamos criar esse CSS separado
import whatsappicon from "../../img/whatsappicon.png"; // Imagem importada

export default function WhatsAppButton() {
  const phoneNumber = "551993640353"; // Número com DDI + DDD
  const message = "Olá! Gostaria de agendar um horário.";
  const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a href={link} className="whatsapp-button" target="_blank" rel="noopener noreferrer">
      <img src={whatsappicon} alt="WhatsApp" />
      <span className="whatsapp-text">Agende seu horário!</span>
    </a>
  );
}
