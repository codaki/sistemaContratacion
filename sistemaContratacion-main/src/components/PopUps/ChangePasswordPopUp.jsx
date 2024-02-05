import { Button } from "@nextui-org/react";
import bcrypt from "bcryptjs";
import React, { useEffect, useState } from "react";
import { editarCandidato } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import "./ChangePasswordPopup.css";

const ChangePasswordPopUp = ({ onClose }) => {
  const { user, getUsuario } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [enableNewPasswordInputs, setEnableNewPasswordInputs] = useState(false);
  const [passwordChangeMessage, setPasswordChangeMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [validacionChris, setValidacionChris] = useState(false);

  const compararContrasena = async () => {
    const usuario = await getUsuario(user.id);
    console.log(usuario.data.password);
    const isCorrect = bcrypt.compareSync(oldPassword, usuario.data.password);

    if (isCorrect) {
      setIsPasswordCorrect(true);
      setEnableNewPasswordInputs(true);
      setInfoMessage(
        "Contraseña Anterior Verificada. Por favor, ingrese una nueva contraseña y confírmela al repetirla."
      );
    } else {
      setIsPasswordCorrect(false);
      setEnableNewPasswordInputs(false);
      setInfoMessage("");
      setPasswordChangeMessage(
        "La contraseña antigua no es correcta. Por favor, intenta de nuevo."
      );
    }
  };

  const handleComprobarClick = () => {
    compararContrasena();
  };

  const handleEnviarClick = () => {
    if (newPassword === repeatNewPassword && newPassword.length > 5) {
      setPasswordChangeMessage("Contraseña cambiada correctamente");

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(newPassword, salt);

      editarCandidato(user.id, { password: hash });

      onClose();
    } else {
      setPasswordChangeMessage(
        "Las contraseñas no coinciden o la contraseña es menor a 6 caracteres. Por favor, intenta de nuevo."
      );
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Cambio de contraseña</h2>
        <form>
          <label>Contraseña antigua:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            disabled={isPasswordCorrect}
          />
          <Button className="password-button" onClick={handleComprobarClick}>
            Comprobar
          </Button>
          {infoMessage && (
            <div className="info-message">
              <p>{infoMessage}</p>
            </div>
          )}
          <label>Contraseña nueva:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={!enableNewPasswordInputs}
          />
          <label>Repetir nueva contraseña:</label>
          <input
            type="password"
            value={repeatNewPassword}
            onChange={(e) => setRepeatNewPassword(e.target.value)}
            disabled={!enableNewPasswordInputs}
          />
          {passwordChangeMessage && (
            <div
              className={
                passwordChangeMessage.includes("correctamente")
                  ? "success-message"
                  : "error-message"
              }
            >
              <p>{passwordChangeMessage}</p>
            </div>
          )}
          <div className="popup-buttons">
            <Button className="password-button" onClick={handleEnviarClick}>
              Enviar
            </Button>
            <button className="password-button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPopUp;
