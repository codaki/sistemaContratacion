const { register } = require('../../controllers/auth.controller.js');
const { db } = require('../../db'); // Si usas la base de datos

// Mockear la base de datos (db.query) para evitar interacción real con la base de datos
jest.mock("../../db");

describe("Auth Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpiar mocks antes de cada test
    });

    test("should register a new user successfully", async () => {
        // Mock de la consulta de la base de datos (para verificar que el usuario no exista)
        db.query.mockImplementationOnce((query, values, callback) => {
            callback(null, { rows: [] }); // Simula que no existe el usuario
        });

        // Mock de la inserción en la base de datos (cuando se registre el nuevo usuario)
        db.query.mockImplementationOnce((query, values, callback) => {
            callback(null, { rows: [{ cand_id: 1, cand_correo: "test@example.com" }] }); // Simula la creación exitosa
        });

        // Datos de prueba para el registro
        const req = {
            body: {
                tipoIden: "CC",
                identificacion: "123456789",
                sexo: "Masculino",
                titulo: "Ingeniero",
                fecha_nacimiento: "1990-01-01",
                email: "test@example.com",
                nombre1: "Juan",
                nombre2: "Carlos",
                apellido1: "Perez",
                apellido2: "Gomez",
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Ejecutar la función de registro
        await register(req, res);

        // Comprobaciones
        expect(db.query).toHaveBeenCalledTimes(2); // Debió llamar a db.query dos veces
        expect(res.status).toHaveBeenCalledWith(200); // Debió devolver el código de estado 200
        expect(res.json).toHaveBeenCalledWith("Se creó el usuario"); // Debió devolver este mensaje
    });

    test("should return an error if user already exists", async () => {
        // Simular que el usuario ya existe en la base de datos
        db.query.mockImplementationOnce((query, values, callback) => {
            callback(null, { rows: [{ cand_correo: "test@example.com" }] }); // Usuario ya existe
        });

        // Datos de prueba para el registro
        const req = {
            body: {
                tipoIden: "CC",
                identificacion: "123456789",
                sexo: "Masculino",
                titulo: "Ingeniero",
                fecha_nacimiento: "1990-01-01",
                email: "test@example.com",
                nombre1: "Juan",
                nombre2: "Carlos",
                apellido1: "Perez",
                apellido2: "Gomez",
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Ejecutar la función de registro
        await register(req, res);

        // Comprobaciones
        expect(db.query).toHaveBeenCalledTimes(1); // Debió llamar a db.query solo una vez
        expect(res.status).toHaveBeenCalledWith(409); // Usuario ya existe, debe devolver el código 409
        expect(res.json).toHaveBeenCalledWith(["Usuario ya existe!"]); // Debió devolver el mensaje de error
    });
});
