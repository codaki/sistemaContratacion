import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import "./ChangePasswordPopup.css";

const Popup = ({ onClose }) => {
  const handleEnviarClick = () => {
    onClose();
    window.location.href = "/";
  };

  return (
    <div className="popup-overlay">
      <center>
        <div className="popup">
          <h2>Oferta creada Exitosamente</h2>
          <div className="form">
            <Button className="password-button" onClick={handleEnviarClick}>
              Aceptar
            </Button>
          </div>
        </div>
      </center>
    </div>
  );
};

export default Popup;
