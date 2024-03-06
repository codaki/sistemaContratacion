import { Router } from "express";
import {
  editarCandidato,
  getUsuario,
  getUsuarioCorreo,
  login,
  logout,
  obtenerUsuario,
  profile,
  register,
  verifyToken,
} from "../controllers/auth.controller.js";
//Uso de la fución que valida el acceso a ciertas páginas
import { db } from "../db.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
const router = Router();
//End point de autoización
router.post("/register", (req, res, next) => {
  validateSchema(registerSchema);
  register(req, res);
});
// router.get("/prueba",(req,res)=>{
//   const q = "SELECT * FROM usu_usuario";
//   db.query(q, (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.json(data.rows[0].usu_codigo);
//   })
// })
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.post("/obtenerUsuario/:id", obtenerUsuario);
//Ruta protegida con el authRequired
router.get("/profile", authRequired, profile);
//Verificacion de token
router.put("/usuarios/:id", editarCandidato);
router.get("/verify", verifyToken);
router.get("/getUsuario/:id", getUsuario);
router.get("/getUsuarioC/:id", getUsuarioCorreo);
export default router;
