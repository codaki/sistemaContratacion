import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { getCookie } from "./Utils";
import { AuthProvider } from "./context/AuthContext";
import { default as Login1, default as login } from "./pages/LoginPage";
import Perfil from "./pages/Perfil";
import RegisterPage from "./pages/RegisterPage";
import { logout } from "./reducers/auth.slice";
import Auth from "./scenes/auth";
import Dashboard from "./scenes/dashboard";
import FormulariOferta from "./scenes/formulario-oferta";
import FormularioPostulacion from "./scenes/formulario-postulacion";
import FormularioActividad from "./scenes/formulario-postulacion/ActividadForm";
import FormularioCaAmplio from "./scenes/formulario-postulacion/CampoAmplioForm";
import FormularioCaEspecifico from "./scenes/formulario-postulacion/CampoEspecificoForm";
import FormularioContratacion from "./scenes/formulario-postulacion/ContratacionForm";
import FormularioDept from "./scenes/formulario-postulacion/DepartamentoForm";
import FormularioPeriodo from "./scenes/formulario-postulacion/PeriodoPostlacionForm";
import FormularioPacad from "./scenes/formulario-postulacion/PersonalAcadForm";
import FormularioSede from "./scenes/formulario-postulacion/SedeForm";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Home from "./scenes/home/Home";
import Formulario from "./scenes/subir-postulacion";
import Candidatos from "./scenes/tabla-candidatos";
import { Calificaciones } from "./scenes/tablas-calificacion";
import { ColorModeContext, useMode } from "./theme";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let isAuth = false;
  const authValue = getCookie("auth");
  isAuth = authValue === "true" ? true : false;

  return (
    <AuthProvider>
      {/* {isAuth ? ( */}
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/home" element={<Home />} />

                <Route path="/autenticacion" element={<Auth />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login1 />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route
                    path="/seleccionar-postulacion"
                    element={<FormularioPostulacion />}
                  />
                  <Route path="/perfil" element={<Perfil />} />
                  <Route
                    path="/formulario-oferta"
                    element={<FormulariOferta />}
                  />

                  <Route
                    path="/formulario-periodo"
                    element={<FormularioPeriodo />}
                  />
                  <Route
                    path="/formulario-contratacion"
                    element={<FormularioContratacion />}
                  />
                  <Route
                    path="/formulario-cespecifico"
                    element={<FormularioCaEspecifico />}
                  />
                  <Route
                    path="/formulario-camplio"
                    element={<FormularioCaAmplio />}
                  />
                  <Route path="/formulario-sede" element={<FormularioSede />} />
                  <Route
                    path="/formulario-departamento"
                    element={<FormularioDept />}
                  />
                  <Route
                    path="/formulario-pacademico"
                    element={<FormularioPacad />}
                  />
                  <Route
                    path="/formulario-actividad"
                    element={<FormularioActividad />}
                  />

                  <Route path="/subir-informacion" element={<Formulario />} />
                  <Route path="/tabla-candidatos" element={<Candidatos />} />
                  <Route
                    path="/tablas-calificacion"
                    element={<Calificaciones />}
                  />
                </Route>
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
      {/* // ) : (
      //   <Auth />
      )} */}
    </AuthProvider>
  );
}
export default App;
