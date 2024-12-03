const { getSede, createSede, updateSede, cambiarEstadoSede, deleteSede } = require('../../controllers/sede.controller.js');
const { db } = require('../../db'); // Asegúrate de que la ruta sea correcta

describe('Sede Controller', () => {

    // Prueba de getSede
    it('should return all sedes', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, callback) => callback(null, { rows: [{ sede_id: 1, sede_nombre: 'Sede 1', sede_descripcion: 'Descripción 1' }] }));

        await getSede(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ sede_id: 1, sede_nombre: 'Sede 1', sede_descripcion: 'Descripción 1' }]);
    });

    // Prueba de createSede
    it('should create a new sede', async () => {
        const req = {
            body: {
                sede_nombre: 'Sede nueva',
                sede_descripcion: 'Descripción de sede nueva',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        await createSede(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: "Sede creada exitosamente." });
    });

    // Prueba de updateSede
    it('should update an existing sede', async () => {
        const req = {
            params: { sede_id: 1 },
            body: {
                sede_nombre: 'Sede actualizada',
                sede_descripcion: 'Descripción actualizada',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        await updateSede(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Sede con ID 1 actualizada exitosamente.' });
    });

    // Prueba de cambiarEstadoSede
    it('should change the state of a sede', async () => {
        const req = {
            params: { sede_id: 1 },
            body: {
                sede_estado: 'activo',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        await cambiarEstadoSede(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Estado de la sede con ID 1 actualizado exitosamente.' });
    });

    // Prueba de deleteSede
    it('should delete an existing sede', async () => {
        const req = {
            params: { sede_id: 1 },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        await deleteSede(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Sede con ID 1 eliminada exitosamente.' });
    });

});
