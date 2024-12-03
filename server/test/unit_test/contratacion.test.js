const { getContratacion, createContratacion, updateContratacion, cambiarEstadoContratacion, deleteContratacion } = require('../../controllers/contratacion.controller.js');
const { db } = require('../../db'); // Asegúrate de que la ruta sea correcta

describe('Contratacion Controller', () => {

    // Prueba de getContratacion
    it('should return all contrataciones', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, callback) => callback(null, { rows: [{ con_id: 1, con_nombre: 'Contratación A' }] }));

        await getContratacion(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ con_id: 1, con_nombre: 'Contratación A' }]);
    });

    // Prueba de createContratacion
    it('should create a new contratacion', async () => {
        const req = {
            body: {
                con_nombre: 'Contratación B',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        await createContratacion(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('Contratación creada');
    });

    // Prueba de updateContratacion
    it('should update a contratacion', async () => {
        const req = {
            params: { con_id: 1 },
            body: {
                con_nombre: 'Contratación C',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        await updateContratacion(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('Contatación actualizada');
    });

    // Prueba de cambiarEstadoContratacion
    it('should update the estado of contratacion', async () => {
        const req = {
            params: { con_id: 1 },
            body: { con_estado: 'activo' },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        await cambiarEstadoContratacion(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('Estado de la contratación actualizado');
    });

    // Prueba de deleteContratacion
    it('should delete a contratacion', async () => {
        const req = {
            params: { con_id: 1 },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        await deleteContratacion(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('Contratación eliminada');
    });
});
