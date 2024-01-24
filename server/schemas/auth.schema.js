import { z } from "zod";

export const registerSchema = z.object({
  tipoIden: z.string({
    required_error: "El tipo de identificación es requerido",
  }),
  identificacion: z
    .string({
      required_error: "La Identificación es requerida",
    })
    .max(10, {
      message: "La identificación debe tener exactamente 10 caracteres",
    })
    .min(10, {
      message: "La identificación debe tener exactamente 10 caracteres",
    }),
  email: z
    .string({
      required_error: "El correo es requerido",
    })
    .email({
      message: "Correo inválido",
    }),
  sexo: z.string({
    required_error: "El sexo es requerido",
  }),
  titulo: z.string({
    required_error: "El título es requerido",
  }),
  fecha_nacimiento: z.string({
    required_error: "La fecha de nacimiento es requerida",
  }),
  nombre1: z
    .string({
      required_error: "El primer nombre es requerido",
    })
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres",
    }),
  nombre2: z
    .string({
      required_error: "El segundo nombre es requerido",
    })
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres",
    }),
  apellido1: z
    .string({
      required_error: "El primer apellido es requerido",
    })
    .min(3, {
      message: "El apellido debe tener al menos 3 caracteres",
    }),
  apellido2: z
    .string({
      required_error: "El segundo apellido es requerido",
    })
    .min(3, {
      message: "El apellido debe tener al menos 3 caracteres",
    }),
});

export const loginSchema = z.object({
  correo: z
    .string({
      required_error: "El correo es requerido",
    })
    .email({
      message: "Correo inválido",
    }),
  password: z.string({
    required_error: "La contraseña es requerida",
  }),
});
