import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
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
            position: 'absolute',
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

export default function PopUpSeguridad() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Ley de Privacidad
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
          Estimado usuario,
          </Typography>
          <Typography gutterBottom>
          Gracias por postularse para docente en nuestra universidad. Para poder procesar su solicitud, necesitamos recopilar y almacenar algunos de sus datos personales, como su nombre, identificación y hoja de vida.
          </Typography>
          <Typography gutterBottom>
          Queremos asegurarle que sus datos personales serán tratados con la máxima confidencialidad y solo se utilizarán para los fines previstos. Además, cumplimos con todas las leyes y regulaciones aplicables en materia de protección de datos.
          </Typography>
          <Typography gutterBottom>
          Si tiene alguna pregunta o inquietud sobre cómo se manejarán sus datos personales, no dude en ponerse en contacto con nosotros.          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Aceptar
          </Button>
          <Button autoFocus onClick={handleClose}>
            Rechazar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
