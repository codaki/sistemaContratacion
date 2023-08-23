import pkg from "pg";
const { Pool } = pkg;
import mongoose from "mongoose";
import { config } from "dotenv";

config();
export const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "SistemaPostulacion",
  //database: 'usuariologin',
  password: "admin",
  port: 5432,
});

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
