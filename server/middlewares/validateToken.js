import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
export const authRequired = (req, res, next) => {
  //Acceso al token
  const token = req.cookies.access_token;
  //Validación de acceso
  if (!token) return res.status(401).json("Acceso denegado");
  try {
    //Pedido de Id con jwt
    const verified = jwt.verify(token, TOKEN_SECRET);
    req.user = verified;
    //Paso a la siguiente página
    next();
  } catch (err) {
    res.status(400).json("Token inválido");
  }
};
