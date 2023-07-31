import { z } from "zod";

export const registerSchema = z.object({
  tipoid: z.string({
    required_error: "El tipo de identificación es requerida",
  }),
  numid: z.string({
    required_error: "El tipo de identificación es requerida",
  }),
  sexo: z.string({
    required_error: "El sexo es requerido",
  }),
  titulo: z.string({
    required_error: "El titulo es requerido",
  }),
  fecha: z.string({
    required_error: "La fecha es requerida",
  }),
  correo: z.string({
    required_error: "El correo es requerido",
  }).email({
    message: "Correo inválido",
  }),
  password: z.string({
    required_error: "La contraseña es requerida",
  }),
  nombre1: z.string({
    required_error: "El primer nombre es requerido",
  }),
  nombre2: z.string({
    required_error: "El segundo nombre es requerido",
  }),
  apellido1: z.string({
    required_error: "El primer apellido es requerido",
  }),
  apellido2: z.string({
    required_error: "El segundo apellido es requerido",
  }),
});

export const loginSchema = z.object({
  correo: z.string({
    required_error: "El correo es requerido",
  }).email({
    message: "Correo inválido",
  }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    }),
});
