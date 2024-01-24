import AccountCircle from "@mui/icons-material/AccountCircle";
import BadgeIcon from "@mui/icons-material/Badge";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import { Box, Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Components from "../../components/Components";
import PopUpRegistro from "../../components/PopUps/PopUpRegistro";
import PopUpSeguro from "../../components/PopUps/PopUpSeguro";
import PrivacidadDeDatos from "../../components/PopUps/PrivacidadDeDatos";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../reducers/auth.slice";
import "./Auth.css";
import { setCookie } from "./Utils";
import isValidCI from "./validateCI";

function Auth() {
  const [signIn, setSignIn] = React.useState(true);
  const [identificationNumber, setIdentificationNumber] = React.useState("");
  const [senescytTitle, setSenescytTitle] = React.useState("");
  const [primerNombre, setPrimerNombre] = React.useState("");
  const [segundoNombre, setSegundoNombre] = React.useState("");
  const [primerApellido, setPrimerApellido] = React.useState("");
  const [segundoApellido, setSegundoApellido] = React.useState("");
  const [formErrors, setFormErrors] = React.useState([]);
  const [valoresRegistro, setValoresRegistro] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [sexo, setSexo] = React.useState("");
  const [recaptchaVerified, setRecaptchaVerified] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const recaptchaRef = React.createRef();
  const [fechaNacimiento, setFechaNacimiento] = React.useState("");

  const buttonStyles = {
    width: "150px", // Puedes ajustar el ancho como prefieras
  };

  const [showPrivacyPopup, setShowPrivacyPopup] = React.useState(false);

  // Function to open the privacy popup
  const handleOpenPrivacyPopup = () => {
    setShowPrivacyPopup(true);
  };

  // Function to close the privacy popup
  const handleClosePrivacyPopup = () => {
    setShowPrivacyPopup(false);
    // Solo llamamos a handleRejectPrivacy si el popup se cierra por rechazo
    if (!recaptchaVerified) {
      handleRejectPrivacy();
    }
  };

  // Función para manejar la aceptación de la privacidad de datos
  const handleAcceptPrivacy = () => {
    handleClosePrivacyPopup();
    submitSignin(); // Realizar el inicio de sesión después de aceptar la privacidad de datos
  };

  const handleRejectPrivacy = () => {
    console.log("El usuario ha rechazado la privacidad de datos");
    setCurrentPage("signin");
    setSignIn(true);
    setEmail(""); // Limpiar email si es necesario
    setPassword(""); // Limpiar contraseña si es necesario
    setShowPrivacyPopup(false); // Cerrar el popup de privacidad de datos
  };

  const handleRecaptchaVerify = () => {
    setRecaptchaVerified(true);
  };

  const identificationInput = React.useRef(null);
  const { signin, signup } = useAuth();
  const signinForm = {
    email: React.useRef(null),
    password: React.useRef(null),
  };

  useEffect(() => {
    setCurrentPage("signin");
  }, []);

  const navigate = useNavigate();

  const submitSignin = () => {
    // if (signinForm.email.current.value.trim().length === 0) {
    //   return signinForm.email.current.focus();
    // }

    // if (signinForm.password.current.value.trim().length === 0) {
    //   return signinForm.password.current.focus();
    // }

    console.log(formSignIn);
    setEmail(formSignIn.email);
    setPassword(formSignIn.password);
    signin({ correo: formSignIn.email, password: formSignIn.password });

    setCookie("auth", true, 30);

    dispatch(login());
    navigate("/");
  };

  const submitRegister = () => {
    setFormErrors([]);

    setCurrentPage("signin");
    setSignIn(true);
  };

  const registerButtonClicked = () => {
    setCurrentPage("signup");
    setSignIn(true);
  };
  const getMinDate = () => {
    const currentDate = new Date();
    const minDate = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    return minDate.toISOString().split("T")[0];
  };

  const registerNextClick = () => {
    if (identificationNumber.trim().length === 0) {
      return identificationInput.current.focus();
    }

    const isValidCedula = isValidCI(identificationNumber);
    if (!isValidCedula) {
      return setFormErrors(["Identificación inválida"]);
    }

    if (!recaptchaVerified) {
      return setFormErrors(["Por favor, verifique el Recaptcha"]);
    }

    setFormErrors([]);
    //set("Cédula");
    setSignIn(false);
  };

  const handleBackClick = () => {
    signup({
      tipoid: tipoIdentificacion,
      numid: identificationNumber,
      sexo: sexo,
      titulo: senescytTitle,
      fecha: fechaNacimiento,
      correo: email,
      password: password,
      nombre1: primerNombre,
      nombre2: segundoNombre,
      apellido1: primerApellido,
      apellido2: segundoApellido,
    });
    setCurrentPage("signin");

    setSignIn(true);
  };
  const sendEmail = (email) => {
    localStorage.setItem("email", email);
  };

  const [formSignIn, setFormSignIn] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      sendEmail(value); // Llamar a la función sendEmail() si el nombre es 'email'
      console.log(value);
    }
    if (name === "password") {
      localStorage.setItem("password", value); // Llamar a la función sendEmail() si el nombre es 'email'
      console.log(value);
    }
    setFormSignIn((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const [tipoIdentificacion, setTipoIdentificacion] = useState("");

  const handleTipoIdentificacionChange = (event, newValue) => {
    setTipoIdentificacion(newValue); // Actualiza el estado con la selección del usuario
  };

  return (
    <div className="authPage">
      <Components.Container
        style={{
          background: "linear-gradient(180deg, #007B49 0%, #00A650 100%)",
        }}
      >
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form id="createAccount">
            <Components.Title>
              FORMULARIO DE ADMISIÓN PARA DOCENTES
            </Components.Title>
            <div className="authForm">
              {/* Campos para los nombres */}
              <div className="table">
                <div className="row">
                  <div className="cell">
                    <label htmlFor="primerNombre">Primer Nombre</label>
                    <input
                      type="text"
                      id="primerNombre"
                      placeholder="Ingresa tu primer nombre"
                      value={primerNombre}
                      onChange={(e) => {
                        setPrimerNombre(e.target.value);
                        localStorage.setItem("nombre", e.target.value);
                      }}
                    />
                  </div>
                  <div className="cell">
                    <label htmlFor="segundoNombre">Segundo Nombre</label>
                    <input
                      type="text"
                      id="segundoNombre"
                      placeholder="Ingresa tu segundo nombre"
                      value={segundoNombre}
                      onChange={(e) => {
                        setSegundoNombre(e.target.value);
                        localStorage.setItem("nombre2", e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="cell">
                    <label htmlFor="primerApellido">Primer Apellido</label>
                    <input
                      type="text"
                      id="primerApellido"
                      placeholder="Ingresa tu primer apellido"
                      value={primerApellido}
                      onChange={(e) => {
                        setPrimerApellido(e.target.value);
                        localStorage.setItem("apellido", e.target.value);
                      }}
                    />
                  </div>
                  <div className="cell">
                    <label htmlFor="segundoApellido">Segundo Apellido</label>
                    <input
                      type="text"
                      id="segundoApellido"
                      placeholder="Ingresa tu segundo apellido"
                      value={segundoApellido}
                      onChange={(e) => {
                        setSegundoApellido(e.target.value);
                        localStorage.setItem("apellido2", e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="cell">
                    <label>Tipo de identificación</label>
                    <span>{tipoIdentificacion}</span>
                  </div>
                  <div className="cell">
                    <label>Número de identificación</label>
                    <span>{identificationNumber}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="cell">
                    <label htmlFor="sexo">Sexo</label>
                    <select
                      id="sexo"
                      value={sexo}
                      onChange={(e) => {
                        setSexo(e.target.value);
                        localStorage.setItem("sexo", e.target.value);
                      }}
                      className="inputField"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Masculino">Masculino</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="cell">
                  <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    id="fechaNacimiento"
                    value={fechaNacimiento}
                    min={{ getMinDate }}
                    onChange={(e) => {
                      setFechaNacimiento(e.target.value);
                      localStorage.setItem("fecha_nacimiento", e.target.value);
                    }}
                  />
                    
                </div>
              </div>

              {/* Título Senescyt */}
              <div className="row">
                <label htmlFor="senescytTitle">
                  Selecciona tu titulo Senescyt
                </label>
                <Components.TitleSelect
                  value={senescytTitle}
                  onChange={(e) => {
                    setSenescytTitle(e.target.value);
                    localStorage.setItem("titulo", e.target.value);
                  }}
                >
                  <option value="">Selecciona tu título Senescyt</option>
                  <option value="Magíster">Magíster</option>
                  <option value="Doctor/a">Doctor/a</option>
                  <option value="Licenciado/a">Licenciado/a</option>
                  <option value="Ingeniero/a">Ingeniero/a</option>
                  <option value="Arquitecto/a">Arquitecto/a</option>
                  <option value="Médico/a">Médico/a</option>
                </Components.TitleSelect>
              </div>
              {/* Email */}
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                variant="standard"
                type="email"
                name="email"
                value={formSignIn.email}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Contraseña"
                fullWidth
                margin="normal"
                variant="standard"
                type="password"
                name="password"
                value={formSignIn.password}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <PopUpSeguro />
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop="10px"
              >
                <Button
                  onClick={handleBackClick}
                  type="button"
                  variant="outlined"
                  style={{
                    width: "150px", // Puedes ajustar el ancho como prefieras
                    borderColor: "white",
                    marginRight: "10px",
                    borderRadius: 7,
                  }}
                >
                  Volver
                </Button>

                <PopUpRegistro
                  onClick={submitRegister}
                  type="button"
                  variant="contained"
                  style={{
                    width: "150px", // Puedes ajustar el ancho como prefieras
                    backgroundColor: "#007b49",
                  }}
                />
              </Box>
            </div>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          {currentPage === "signin" ? (
            <Components.Form>
              <Components.Title>
                Formulario de Admisión para docentes
              </Components.Title>
              <Components.Subtitle></Components.Subtitle>

              <div className="authForm">
                <div
                  style={{
                    width: "80%",
                    margin: "30px auto",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    label="Correo Electrónico"
                    fullWidth
                    margin="normal"
                    name="email"
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                    value={formSignIn.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div
                  style={{
                    width: "80%",
                    margin: "30px auto",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    label="Contraseña"
                    fullWidth
                    margin="normal"
                    variant="standard"
                    type="password"
                    name="password"
                    value={formSignIn.password}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                {/* Use anchor attribute to navigate to the "createAccount" section */}
                <div>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Button
                      onClick={handleOpenPrivacyPopup}
                      type="button"
                      variant="contained"
                      style={{
                        backgroundColor: "#007B49",
                        color: "white",
                      }}
                    >
                      Ingresar
                    </Button>
                    <Button
                      onClick={registerButtonClicked}
                      type="button"
                      variant="contained"
                      style={{ backgroundColor: "#007B49", color: "white" }}
                    >
                      Registro
                    </Button>
                  </Box>
                </div>
                {/* Agregamos el componente PrivacidadDeDatos */}
                <PrivacidadDeDatos
                  open={showPrivacyPopup}
                  handleClose={handleRejectPrivacy}
                  handleAccept={handleAcceptPrivacy}
                />
              </div>
            </Components.Form>
          ) : currentPage === "signup" ? (
            <Components.Form>
              <Components.Title>Registro</Components.Title>
              <Components.Subtitle>
                Ingrese su cédula o pasaporte
              </Components.Subtitle>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={["Cédula", "Pasaporte"]}
                  value={tipoIdentificacion} // Establece el valor seleccionado
                  onChange={handleTipoIdentificacionChange} // Maneja el cambio de selección
                  sx={{ width: 220, fontSize: 8 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tipo de identificación"
                      style={{ fontSize: 8 }}
                    />
                  )}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    marginBottom: 2,
                  }}
                >
                  <BadgeIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    id="input-with-sx"
                    label={`Número de ${
                      tipoIdentificacion || "identificación"
                    }`}
                    variant="standard"
                    onChange={(e) => {
                      setIdentificationNumber(e.target.value);
                      localStorage.setItem("cedula", e.target.value);
                    }}
                  />
                </Box>
              </div>
              {formErrors.length !== 0 ? (
                <div className="formErrors">
                  <ul>
                    {formErrors.map((error, index) => (
                      <li>{error}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Ldicg4TAAAAAMXRFd5wWjZa5ihYFlmb95106bPR"
                size="normal"
                onChange={handleRecaptchaVerify}
              />

              {/* '6Ldicg4TAAAAAEIi-Tlg7YgHxcPCNVHvac92lrdX' */}
              <div style={{ width: "50px", height: "25px" }}></div>
              {/* Use anchor attribute to navigate to the "createAccount" section */}
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={2}
              >
                <Button
                  onClick={handleBackClick}
                  type="button"
                  variant="outlined"
                  style={{
                    borderColor: "white",
                    color: "green",
                  }}
                >
                  Volver
                </Button>
                <Button
                  onClick={registerNextClick}
                  type="button"
                  variant="contained"
                  style={{ backgroundColor: "#007B49", color: "white" }}
                >
                  Siguiente
                </Button>
              </Box>
            </Components.Form>
          ) : null}
        </Components.SignInContainer>

        <Components.OverlayContainer
          signinIn={signIn}
          style={{
            background: "linear-gradient(180deg, #007B49 0%, #00A650 100%)",
          }}
        >
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel
              signinIn={signIn}
              style={{
                background: "linear-gradient(180deg, #007B49 0%, #00A650 100%)",
                color: "white",
                marginLeft: "-44px", // Puedes ajustar el valor de marginLeft según tus necesidades
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/27/Logo_ESPE.png"
                alt="ESPE"
                style={{
                  maxWidth: "300px",
                  filter: "drop-shadow(20px 10px 5px rgba(0, 0, 0, 0.6))",
                }}
              />
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel
              signinIn={signIn}
              style={{
                background: "linear-gradient(180deg, #007B49 0%, #00A650 100%)",
                color: "white",
                marginRight: "-44px", // Puedes ajustar el valor de marginRight según tus necesidades
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/27/Logo_ESPE.png"
                alt="ESPE"
                style={{
                  maxWidth: "350px",
                  filter: "drop-shadow(-20px 10px 5px rgba(0, 0, 0, 0.6))",
                }}
              />
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
}

export default Auth;
