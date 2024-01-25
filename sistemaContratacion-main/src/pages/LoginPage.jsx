import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Popup from "../components/PopupLeyDatos";
import { useAuth } from "../context/AuthContext";
import { Box, Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";

function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      setShowPopup(true);
    }
  }, [isAuthenticated]);
  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="authPage">
      <div className="grande">
        <div className="login1">
          {registerErrors.map((error, i) => (
            <div key={i} className="bg-red-500 p-2 text-white">
              {error}
            </div>
          ))}
          <h3>Formulario de Admisión para docentes</h3>
         
            <form onSubmit={onSubmit}>
              <TextField
                label="Correo Electrónico"
                fullWidth
                margin="normal"
                variant="standard"
                type="text"
                {...register("correo", { required: true })}
                name="correo"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              {errors.correo && (
                <h4 className="text-red-500">El correo es requerido</h4>
              )}

              <TextField
                label="Contraseña"
                fullWidth
                margin="normal"
                variant="standard"
                type="password"
                {...register("password", { required: true })}
                name="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {errors.password && (
                <h4 className="text-red-500">La contraseña es requerida</h4>
              )}

              {/* <h2>Correo</h2>
              <input
                type="text"
                {...register("correo", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md border m-3 "
              />
              {errors.email && (
                <h4 className="text-red-500">El correo es requerido</h4>
              )} */}
              {/* <h2>Contraseña</h2>
              <input
                type="password"
                {...register("password", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md border m-3"
              />
              {errors.password && (
                <h4 className="text-red-500">La contraseña es requerida</h4>
              )} */}
              {/* <button type="submit">Ingresar</button> */}
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: "#007B49",
                  color: "white",
                  width: "40%",
                  marginLeft: "1vw"
                }}
              >
                Ingresar
              </Button>
              <Button
                onClick={() => navigate("/register")}
                type="button"
                variant="contained"
                style={{ 
                  backgroundColor: "#007B49", 
                  color: "white",
                  width: "40%",
                  marginLeft: "1.5vw"
                }}
              >
                Registro
              </Button>
            </form>
          

          {/* <div className="register-container">
          <h3>¿No posees una cuenta?</h3>
          <p>
            <Link to="/register">Registrarse</Link> 
          </p>
        </div> */}
          {showPopup && (
            <Popup
              mensaje="Tu información será manipulada conforme a la necesidad de la institución sin lugar a reclamos, conforme a la ley de protección de datos, etc."
              ruta="/" // Aquí pasa la ruta que desees redireccionar desde el componente Login
              onClose={handleClosePopup}
            />
          )}
        </div>
        <div className="franja_roja"></div>
        <div className="container-logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/27/Logo_ESPE.png"
            alt="ESPE"
            className="logo"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
