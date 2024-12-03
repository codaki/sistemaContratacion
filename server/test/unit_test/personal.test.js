const { getPersonalAcademico, createPersonalAcademico, updatePersonalAcademico, cambiarEstadoPersonalAcademico, deletePersonalAcademico } = require('../../controllers/personal_academico.controller.js');
const { db } = require('../../db'); // Asegúrate de que la ruta sea correcta

describe('Personal Academico Controller', () => {

    // Prueba de getPersonalAcademico
    it('should return all personal academico', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, callback) => callback(null, { rows: [{ pa_id: 1, pa_nombre: 'Profesor A' }] }));

        await getPersonalAcademico(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ pa_id: 1, pa_nombre: 'Profesor A' }]);
    });

    // Prueba de createPersonalAcademico
    it('should create a new personal academico', async () => {
        const req = {
            body: {
                pa_nombre: 'Profesor B',
                pa_descripcion: 'Descripción del profesor',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        await createPersonalAcademico(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith("Personal académico creado exitosamente.");
    });

    // Prueba de updatePersonalAcademico
    it('should update an existing personal academico', async () => {
        const req = {
            params: { id: 1 },
            body: {
                pa_nombre: 'Profesor C',
                pa_descripcion: 'Nueva descripción',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        await updatePersonalAcademico(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith("Personal académico actualizado exitosamente.");
    });

    // Prueba de cambiarEstadoPersonalAcademico
    it('should update the estado of personal academico', async () => {
        const req = {
            params: { id: 1 },
            body: {
                pa_estado: 'activo',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        await cambiarEstadoPersonalAcademico(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith("Estado del personal académico actualizado exitosamente.");
    });

    // Prueba de deletePersonalAcademico
    it('should delete a personal academico', async () => {
        const req = {
            params: { id: 1 },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        await deletePersonalAcademico(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith("Personal académico eliminado exitosamente.");
    });

});
