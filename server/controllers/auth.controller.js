import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = (req, res) => {
  const { email, password, username } = req.body;
  // verificación de usuario existente
  const q = "SELECT * FROM usu_usuario WHERE usu_email = $1 OR usu_username = $2";

  db.query(q, [email, username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.rows.length) return res.status(409).json(["Usuario ya existe!"]);
    //Encriptado de contraseña
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    //Insersion de datos
    const q =
      "INSERT INTO usu_usuario(usu_username,usu_password,usu_email) VALUES ($1,$2,$3)";
    const values = [username,hash,email];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Se creo el usuario");
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM usu_usuario WHERE usu_username = $1";

  db.query(q, [req.body.username], (err, data) => {
    if (err) { 
      console.log(err)
      return res.status(500).json(err);}
    if (data.length === 0)
      return res.status(404).json(["Usuario no registrado!"]);
    //Comparación de contraseña
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      //Nombre del atributo como está en la base
      data.rows[0].usu_password
    );
    //Comprobación de contraseña
    if (!isPasswordCorrect)
      return res.status(400).json(["Usuario o Contraseña incorrecta!"]);
    //Generación de Token
    const token = jwt.sign({ id: data.rows[0].usu_codigo }, TOKEN_SECRET);
    //Copia toda la información menos el primer atributo establecido
    const { usu_password, ...other } = data.rows[0];
    //Token guardado en una cookie
    res
      .cookie("token", token)
      .status(200)
      .json(other);
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

export const verifyToken = async(req,res)=>{
  const{token} = req.cookies;
  if (!token) return res.send(false);
  jwt.verify(token,TOKEN_SECRET,(err,user)=>{
    if(err) return res.status(401).json("Acceso denegado")
    const q = "SELECT * FROM usu_usuario WHERE usu_codigo = $1";
    db.query(q, [user.id], (err, data) => {
      if (err) return res.status(500).json(err);
      console.log(res)
      return res.json({
        //información que se recopila
        id: data.rows[0].usu_codigo,
        username: data.rows[0].usu_username,
        email: data.rows[0].usu_email,
      });
    });
  })
}

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
