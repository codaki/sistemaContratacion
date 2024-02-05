import bcrypt from "bcryptjs";
import Grid from "gridfs-stream";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { TOKEN_SECRET } from "../config.js";
import { db } from "../db.js";

let gfs;

const conn = mongoose.connection;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});
export const register = (req, res) => {
  const {
    tipoIden,
    identificacion,
    sexo,
    titulo,
    fecha_nacimiento,
    email,
    nombre1,
    nombre2,
    apellido1,
    apellido2,
  } = req.body;
  let genero;
  console.log(nombre1, nombre2);
  // verificación de usuario existente
  const selectQuery = "SELECT * FROM candidato WHERE cand_correo = $1";
  db.query(selectQuery, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.rows.length) {
      return res.status(409).json(["Usuario ya existe!"]);
    }
    // Encriptado de contraseña

    console.log("AQUIIIIIII");
    const [year, month, day] = fecha_nacimiento.split("-");
    const formattedDate = `${day}${month}${year.slice(-2)}`;
    // Encriptado de contraseña
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(formattedDate, salt);
    // Inserción de datos
    if (sexo === "Masculino") {
      genero = "M";
    } else {
      genero = "F";
    }
    const insertQuery =
      "INSERT INTO candidato(cand_tipo_identificacion,cand_num_identificacion,cand_sexo,cand_titulo,cand_fecha_nacimiento,cand_correo,cand_password,cand_nombre1,cand_nombre2,cand_apellido1,cand_apellido2) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)";
    const values = [
      tipoIden,
      identificacion,
      genero,
      titulo,
      fecha_nacimiento,
      email,
      hash,
      nombre1,
      nombre2,
      apellido1,
      apellido2,
    ];
    console.log(values);
    db.query(insertQuery, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Se creó el usuario");
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM candidato WHERE cand_correo = $1";

  db.query(q, [req.body.correo], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    if (data.length === 0)
      return res.status(404).json(["Usuario no registrado!"]);
    //Comparación de contraseña
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      //Nombre del atributo como está en la base
      data.rows[0].cand_password
    );
    //Comprobación de contraseña
    if (!isPasswordCorrect)
      return res.status(400).json(["Usuario o Contraseña incorrecta!"]);
    //Generación de Token
    const token = jwt.sign(
      { id: data.rows[0].cand_id, tipo: "candidato" },
      TOKEN_SECRET
    );
    //Copia toda la información menos el primer atributo establecido
    const { cand_password, ...other } = data.rows[0];
    //Token guardado en una cookie
    res.cookie("token", token).status(200).json(other);
  });
};

export const logout = (req, res) => {
  //Limpieza de las cookies
  res
    .clearCookie("token", {
      sameSite: "none",
      secure: true,
      expires: new Date(0),
    })
    .status(200)
    .json("User has been logged out.");
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json("Acceso denegado");

    try {
      const documentos = await documentosVerify(user);

      let postulacionActiva = false;
      const q = "SELECT * FROM candidato WHERE cand_id = $1";
      const qdoc = "SELECT * FROM solicitud WHERE cand_id =$1";

      db.query(qdoc, [user.id], (e, d) => {
        if (e) return res.status(500).json(e);
        if (d.rows.length) {
          postulacionActiva = true;
        }
      });

      db.query(q, [user.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.json({
          id: data.rows[0].cand_id,
          email: data.rows[0].cand_correo,
          name1: data.rows[0].cand_nombre1,
          lastname1: data.rows[0].cand_apellido1,
          tipoI: data.rows[0].cand_tipo_identificacion,
          identificacion: data.rows[0].cand_num_identificacion,
          titulo: data.rows[0].cand_titulo,
          fecha: data.rows[0].cand_fecha_nacimiento,
          role: data.rows[0].cand_correo.endsWith("espe.edu.ec")
            ? "admin"
            : "candidato",
          documentos: documentos, // Use the obtained value
          postulacion: postulacionActiva,
        });
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
};

// ...

export const documentosVerify = async (user) => {
  try {
    const files = await gfs.files
      .find({
        "metadata.idPostulation": user.id.toString(),
      })
      .toArray();

    return files.length > 0;
  } catch (mongoErr) {
    throw new Error(mongoErr.message);
  }
};

export const profile = (req, res) => {
  //Acceder al la página de perfil con Id
  const id = req.user.id;
  const q = "SELECT * FROM usu_usuario WHERE usu_codigo = ?";
  //Llamado a la base de datos
  db.query(q, id, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({
      //información que se recopila
      id: data.rows[0].usu_codigo,
      username: data.rows[0].usu_username,
      email: data.rows[0].usu_email,
    });
  });
};

export const obtenerUsuario = (req, res) => {
  const id = req.params.id;
  const q =
    "SELECT cand_nombre1, cand_apellido1, cand_titulo FROM public.candidato WHERE cand_id = ?;";
  //Llamado a la base de datos
  db.query(q, id, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({
      //información que se recopila
      nombre: data.rows[0].cand_nombre1,
      apellido: data.rows[0].cand_apellido1,
      titulo: data.rows[0].cand_titulo,
    });
  });
};
export const editarCandidato = async (req, res) => {
  try {
    console.log(req.body);

    const { password } = req.body;
    const id = req.params.id;
    console.log(id);
    console.log(password);
    // Verifica si se proporcionó una nueva contraseña
    if (!password) {
      return res
        .status(400)
        .json({ message: "Se requiere una nueva contraseña" });
    }

    // Construye la consulta SQL para actualizar la contraseña del candidato
    const q = `
      UPDATE candidato
      SET cand_password = $1
      WHERE cand_id = $2
      RETURNING *;
    `;

    // Ejecuta la consulta SQL
    const { rows } = await db.query(q, [password, id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Candidato no encontrado" });
    }

    const candidato = rows[0];
    return res.json({ candidato });
  } catch (error) {
    console.error("Error al editar candidato:", error);
    return res.status(500).json({ message: "Error al editar candidato" });
  }
};
export const getUsuario = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM candidato WHERE cand_id = $1;";
  //Llamado a la base de datos
  db.query(q, [id], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json({
      //información que se recopila
      password: data.rows[0].cand_password,
    });
  });
};
