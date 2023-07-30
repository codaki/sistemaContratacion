import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { logout } from './reducers/auth.slice'
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Formulario from "./scenes/subir-postulacion";

import Auth from './scenes/auth';


import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Home from "./scenes/home/Home";
import FormularioPostulacion from "./scenes/formulario-postulacion";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // para desloguearse usar la funcion: dispatch(logout())


  

  return (
    auth.isLogged ? (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
            <Route path="/home" element={<Home/>} />
              <Route path="/autenticacion" element={<Auth/>} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/seleccionar-postulacion" element={<FormularioPostulacion/>} />
              <Route path="/subir-informacion" element={<Formulario/>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>) : (<Home />)
  );
}



export default App;
