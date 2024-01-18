import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
  verifyToken,
  obtenerUsuario,
} from "../controllers/auth.controller.js";
//Uso de la fución que valida el acceso a ciertas páginas
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema} from "../middlewares/validator.middleware.js"
import { registerSchema,loginSchema } from "../schemas/auth.schema.js";
import { db } from "../db.js";
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
router.post("/login",validateSchema(loginSchema), login);
router.post("/logout", logout);
router.post("/obtenerUsuario/:id",obtenerUsuario)
//Ruta protegida con el authRequired
router.get("/profile", authRequired, profile);
//Verificacion de token
router.get("/verify",verifyToken)
export default router;
