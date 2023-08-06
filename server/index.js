import app from "./app.js";
import { db, connectDB } from "./db.js";
import cors from "cors";
import bodyParser from "body-parser";
import transporter from "./transporter.js";
//const app = express()
//Comprobación de conexión de la base de datos
db.connect((err) => {
  if (err) {
    console.error(
      "Error en la conexión a la base de datos, error numero:",
      err
    );
    return;
  }
  console.log("Conexión exitosa a la base de datos!");
});

//Connect to Mongo Database
connectDB();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { email, otp } = req.body;

  // Verificar si el correo y el OTP son válidos
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Correo o código de verificación inválido" });
  }

  // Configurar el correo electrónico a enviar
  const mailOptions = {
    from: 'Recursos humanos <gicalapaqui@espe.edu.ec>',
    to: email,
    subject: "Código de verificación",
    html: `<h1>Ingrese este código para verificar su correo electrónico</h1><br><h2>El código es:</h2>${otp}`,
  };

  try {
    // Enviar el correo electrónico usando el transporter
    await transporter.sendMail(mailOptions);
    res.json({ message: "Código enviado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email" });
  }
});

// Función para validar el formato de correo electrónico
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//Conexión a un puerto para el servidor
app.listen(8800);
console.log("Servidor en el puerto ", 8800);
