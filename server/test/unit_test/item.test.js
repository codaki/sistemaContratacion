const { getItem, createItem, updateItem, deleteItem } = require('../../controllers/item.controller.js');
const { db } = require('../../db'); // Asegúrate de que la ruta sea correcta

describe('Item Controller', () => {

    // Prueba de getItem
    it('should return all items', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, callback) => callback(null, { rows: [{ it_id: 1, it_nombre: 'Item A' }] }));

        await getItem(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ it_id: 1, it_nombre: 'Item A' }]);
    });

    // Prueba de createItem
    it('should create a new item', async () => {
        const req = {
            body: {
                pa_id: 1,
                it_nombre: 'Item B',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        await createItem(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('Item creado');
    });

    // Prueba de updateItem
    it('should update an item', async () => {
        const req = {
            params: { it_id: 1 },
            body: {
                it_nombre: 'Item C',
                pa_id: 2,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        await updateItem(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('Item actualizado');
    });

    // Prueba de deleteItem
    it('should delete an item', async () => {
        const req = {
            params: { it_id: 1 },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        await deleteItem(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('Item eliminado');
    });
});
