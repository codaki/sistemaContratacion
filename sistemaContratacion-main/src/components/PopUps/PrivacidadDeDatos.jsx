import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

function PrivacidadDeDatos({ open, handleClose, handleAccept }) {
    return (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          PaperProps={{
            style: {
                maxWidth: "500px",
                maxHeight: "500px",
                overflowY: "auto",
                fontFamily: "Arial, Helvetica, sans-serif",
                background: "#dcdcdc",
            },
          }}
        >
          <DialogTitle style={{ fontSize: "18px", textAlign: "center" }}>
            Ley y Privacidad de Datos
          </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ textAlign: "justify", fontSize: "15px", lineHeight: "1.6" }}>
    
        Te informamos que nuestro sitio web respeta y cumple con la Ley Orgánica de Protección de Datos Personales y garantía de los derechos digitales. La privacidad y seguridad de tus datos personales son de suma importancia para nosotros.

Al utilizar nuestro sitio web, es posible que recopilemos cierta información sobre ti. Esto incluye datos como tu nombre, dirección de correo electrónico, dirección IP y otros datos relevantes necesarios para brindarte nuestros servicios.

Queremos asegurarte que toda la información que nos proporcionas se utilizará únicamente con el propósito específico para el cual fue recopilada. No compartiremos ni venderemos tus datos personales a terceros sin tu consentimiento expreso.

Además, garantizamos que tus derechos digitales también serán respetados. Tienes derecho a acceder, modificar, corregir o eliminar tus datos personales de nuestra base de datos en cualquier momento.

Al continuar utilizando nuestro sitio web, aceptas nuestra Política de Privacidad y el uso de cookies. Puedes obtener más información sobre cómo utilizamos los datos y las cookies en nuestra página de Política de Privacidad.

Si tienes alguna pregunta o inquietud sobre cómo manejamos tus datos personales, no dudes en contactarnos a través de los canales de soporte proporcionados en el sitio web.

Gracias por confiar en nosotros y por tu compromiso con la protección de tus datos personales y derechos digitales.
</DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center", padding: "16px" }}>
        <Button
          onClick={handleClose}
          color="primary"
          style={{
            backgroundColor: "#f1f1f1",
            color: "black",
            fontSize: "14px",
          }}
        >
          Rechazar
        </Button>
        <Button
          onClick={handleAccept}
          color="primary"
          autoFocus
          style={{
            backgroundColor: "#007B49",
            color: "white",
            fontSize: "14px",
          }}
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PrivacidadDeDatos;