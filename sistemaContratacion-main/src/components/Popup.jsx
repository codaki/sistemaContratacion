import { Button } from "@nextui-org/react";
import React from "react";
import "./style.css";

const Popup = ({ titulo, mensaje, ruta, onClose }) => {
  const handleAceptar = () => {
    onClose();
    window.location.href = ruta;
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h1>{titulo}</h1>
        <p>{mensaje}</p>
        <Button onClick={handleAceptar}>Aceptar</Button>
      </div>
    </div>
  );
};

export default Popup;
