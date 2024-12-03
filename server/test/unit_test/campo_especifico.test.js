const { getCampoEspecifico, createCampoEspecifico, updateCampoEspecifico, cambiarEstadoCampoEspecifico, deleteCampoEspecífico } = require('../../controllers/campo_especifico.controller.js');
const { db } = require('../../db'); // Asegúrate de que la ruta sea correcta

describe('CampoEspecifico Controller', () => {

    // Prueba de getCampoEspecifico
    it('should return all campo especificos', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, callback) => callback(null, { rows: [{ ce_id: 1, ce_nombre: 'Campo Específico A' }] }));

        await getCampoEspecifico(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ ce_id: 1, ce_nombre: 'Campo Específico A' }]);
    });

    // Prueba de createCampoEspecifico
    it('should create a new campo especifico', async () => {
        const req = {
            body: {
                ce_nombre: 'Campo Específico B',
                ce_descripcion: 'Descripción de campo específico B',
                ca_id: 1
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        await createCampoEspecifico(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('Campo específico creado');
    });

    // Prueba de updateCampoEspecifico
    it('should update a campo especifico', async () => {
        const req = {
            params: { ce_id: 1 },
            body: {
                ce_nombre: 'Campo Específico C',
                ce_descripcion: 'Descripción de campo específico C',
                ca_id: 1
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        await updateCampoEspecifico(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('Campo específico actualizado');
    });

    // Prueba de cambiarEstadoCampoEspecifico
    it('should update the estado of campo especifico', async () => {
        const req = {
            params: { ce_id: 1 },
            body: { ce_estado: 'activo' },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        await cambiarEstadoCampoEspecifico(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('Estado del campo específico actualizado');
    });

    // Prueba de deleteCampoEspecifico
    it('should delete a campo especifico', async () => {
        const req = {
            params: { ce_id: 1 },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        deleteCampoEspecífico(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('Campo específico eliminado');
    });
});
