import express from 'express';
import morgan from 'morgan';
import authRoutes from "./routes/auth.routes.js"
import cookieParser from 'cookie-parser';
import cors from  'cors';


const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', // Replace this with your frontend domain
    credentials: true, // Allow sending credentials (cookies)
  };
  
  // Use the CORS middleware with the defined options
  app.use(cors(corsOptions));
//Midleware
app.use(morgan('dev'));
//Lectura formatos json
app.use(express.json());
//Lectura de cookies
app.use(cookieParser());
//Rutas
app.use("/api",authRoutes);

export default app;