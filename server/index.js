import bodyParser from "body-parser";
import cors from "cors";
import app from "./app.js";
import { connectDB, db } from "./db.js";
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
  const { email, otp, nombre, apellido, titulo, cedula } = req.body;
  // Verificar si el correo es válido
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Correo inválido" });
  }

  // Configurar el correo electrónico a enviar
  const mailOptions = {
    from: "Recursos humanos <gicalapaqui@espe.edu.ec>",
    to: email,
    subject: "Sistema de postulación Universidad de las Fuerzas Armadas ESPE",
    html: `<head>
    <title>Bienvenido al Sistema de Postulación para Docentes</title>
  </head>
  <body>
    <h1>Bienvenido/a <span style="color: black;">${titulo} ${nombre} ${apellido}</span></h1>
    <p>Es un placer darle la bienvenida al Sistema de Postulación para Docentes de la Universidad de las Fuerzas Armadas ESPE.</p>
    <p>Le agradecemos su interés en formar parte de nuestro equipo académico y contribuir con la excelencia educativa que nos caracteriza.</p>
    <p>A continuación, le enviaremos un código de verificación para comprobar que este es su correo electrónico registrado en nuestro sistema.</p>
    <br>
    <h2>Detalles de su postulación:</h2>
    <ul>
      <li><strong>Nombre:</strong> ${nombre} ${apellido}</li>
      <li><strong>Título:</strong> ${titulo}</li>
      <li><strong>Cédula:</strong> ${cedula}</li>
      <li><strong>Correo electrónico:</strong> ${email}</li>
    </ul>
    <br>
    <h2>Verificación de correo electrónico:</h2>
    <p>Ingrese este código en la plataforma para verificar su correo electrónico:</p>
    <h3 style="background-color: green; color: #ffffff; padding: 10px;margin-left:100px; display: inline-block;">${otp}</h3>
    <p>Este código es personal e intransferible, por favor, manténgalo en privado.</p>
    <p>Si no ha realizado esta solicitud, por favor ignore este mensaje.</p>
    <br>
    <p>Gracias por su interés en unirse a nuestra institución. Esperamos que tenga éxito en el proceso de postulación.</p>
    <br>
    <p>Atentamente,</p>
    <p>Recursos Humanos</p>
    <p>Universidad de las Fuerzas Armadas ESPE</p>
  </body>`,
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
