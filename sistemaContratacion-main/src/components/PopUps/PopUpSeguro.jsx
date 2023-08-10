import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function PopUpSeguro() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <FormControlLabel
        onClick={handleClickOpen}
        control={<Checkbox defaultChecked />}
        style={{ color: "#1976D2" }}
        label="Acepto los términos y condiciones"
      />

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          ¿Está seguro?
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Te informamos que nuestro sitio web respeta y cumple con la Ley
            Orgánica de Protección de Datos Personales y garantía de los
            derechos digitales. La privacidad y seguridad de tus datos
            personales son de suma importancia para nosotros.{" "}
          </Typography>
          <Typography gutterBottom>
            Al utilizar nuestro sitio web, es posible que recopilemos cierta
            información sobre ti. Esto incluye datos como tu nombre, dirección
            de correo electrónico, dirección IP y otros datos relevantes
            necesarios para brindarte nuestros servicios.{" "}
          </Typography>
          <Typography gutterBottom>
            Queremos asegurarte que toda la información que nos proporcionas se
            utilizará únicamente con el propósito específico para el cual fue
            recopilada. No compartiremos ni venderemos tus datos personales a
            terceros sin tu consentimiento expreso.{" "}
          </Typography>
          <Typography gutterBottom>
            Además, garantizamos que tus derechos digitales también serán
            respetados. Tienes derecho a acceder, modificar, corregir o eliminar
            tus datos personales de nuestra base de datos en cualquier momento.{" "}
          </Typography>
          <Typography gutterBottom>
            Al continuar utilizando nuestro sitio web, aceptas nuestra Política
            de Privacidad y el uso de cookies. Puedes obtener más información
            sobre cómo utilizamos los datos y las cookies en nuestra página de
            Política de Privacidad.{" "}
          </Typography>
          <Typography gutterBottom>
            Si tienes alguna pregunta o inquietud sobre cómo manejamos tus datos
            personales, no dudes en contactarnos a través de los canales de
            soporte proporcionados en el sitio web.{" "}
          </Typography>
          <Typography gutterBottom>
            Gracias por confiar en nosotros y por tu compromiso con la
            protección de tus datos personales y derechos digitales.{" "}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Confirmar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
