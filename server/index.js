import app from "./app.js";
import { db } from "./db.js";
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
//Conexión a un puerto para el servidor
app.listen(8800);
console.log("Servidor en el puerto ", 8800);
