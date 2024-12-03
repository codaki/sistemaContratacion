const { getPostulacion, createPostulacion, updatePostulacion, updatePostulacionEstado, deletePostulacion } = require('../../controllers/postulacion.controller.js');
const { db } = require('../../db'); // Asegúrate de que la ruta sea correcta

describe('Postulacion Controller', () => {

    // Prueba de getPostulacion
    it('should return all postulaciones', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, callback) => callback(null, { rows: [{ post_id: 1, post_periodo: '2024-01' }] }));

        await getPostulacion(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ post_id: 1, post_periodo: '2024-01' }]);
    });

    // Prueba de createPostulacion
    it('should create a new postulacion', async () => {
        const req = {
            body: {
                post_periodo: '2024-02',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        await createPostulacion(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith("Postulación creada exitosamente.");
    });

    // Prueba de updatePostulacion
    it('should update an existing postulacion', async () => {
        const req = {
            params: { id: 1 },
            body: {
                post_periodo: '2024-03',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rowCount: 1 }));

        await updatePostulacion(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith("Postulación actualizada exitosamente.");
    });

    // Prueba de updatePostulacionEstado
    it('should update the estado of a postulacion', async () => {
        const req = {
            params: { id: 1 },
            body: {
                post_estado: 'aprobado',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rowCount: 1 }));

        await updatePostulacionEstado(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith("Postulación actualizada exitosamente.");
    });

    // Prueba de deletePostulacion
    it('should delete a postulacion', async () => {
        const req = {
            params: { id: 1 },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rowCount: 1 }));

        await deletePostulacion(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith("Postulación eliminada exitosamente.");
    });

});
