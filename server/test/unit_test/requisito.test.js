const { getRequisito, createRequisito, updateRequisito, deleteRequisito } = require('../../controllers/requisito.controller.js');
const { db } = require('../../db'); // Asegúrate de que la ruta sea correcta

describe('Requisito Controller', () => {

    // Prueba de getRequisito
    it('should return all requisitos', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, callback) => callback(null, { rows: [{ rq_id: 1, it_id: 1, rq_descripcion: 'Requisito 1' }] }));

        await getRequisito(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ rq_id: 1, it_id: 1, rq_descripcion: 'Requisito 1' }]);
    });

    // Prueba de createRequisito
    it('should create a new requisito', async () => {
        const req = {
            body: {
                rq_id: 1,
                it_id: 1,
                rq_descripcion: 'Requisito 1',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [{ rq_id: 1, it_id: 1, rq_descripcion: 'Requisito 1' }] }));

        await createRequisito(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ rq_id: 1, it_id: 1, rq_descripcion: 'Requisito 1' });
    });

    // Prueba de updateRequisito
    it('should update an existing requisito', async () => {
        const req = {
            params: { id: 1 },
            body: {
                it_id: 2,
                rq_descripcion: 'Requisito actualizado',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [{ rq_id: 1, it_id: 2, rq_descripcion: 'Requisito actualizado' }] }));

        await updateRequisito(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ rq_id: 1, it_id: 2, rq_descripcion: 'Requisito actualizado' });
    });

    // Prueba de deleteRequisito
    it('should delete an existing requisito', async () => {
        const req = {
            params: { id: 1 },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [{ rq_id: 1, it_id: 1, rq_descripcion: 'Requisito 1' }] }));

        await deleteRequisito(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Requisito eliminado correctamente" });
    });

});
