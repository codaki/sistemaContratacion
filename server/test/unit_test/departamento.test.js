const { getDepartamento, createDepartamento, updateDepartamento, cambiarEstadoDepartamento, deleteDepartamento } = require('../../controllers/departamento.controller.js');
const { db } = require('../../db'); // Asegúrate de que la ruta sea correcta

describe('Departamento Controller', () => {

    // Prueba de getDepartamento
    it('should return all departamentos', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, callback) => callback(null, { rows: [{ dept_id: 1, dept_nombre: 'Departamento A' }] }));

        await getDepartamento(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ dept_id: 1, dept_nombre: 'Departamento A' }]);
    });

    // Prueba de createDepartamento
    it('should create a new departamento', async () => {
        const req = {
            body: {
                dept_nombre: 'Departamento B',
                dept_descripcion: 'Descripción del departamento B',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        await createDepartamento(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('Departamento creado');
    });

    // Prueba de updateDepartamento
    it('should update a departamento', async () => {
        const req = {
            params: { dept_id: 1 },
            body: {
                dept_nombre: 'Departamento C',
                dept_descripcion: 'Descripción del departamento C',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        await updateDepartamento(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('Departamento actualizado');
    });

    // Prueba de cambiarEstadoDepartamento
    it('should update the estado of departamento', async () => {
        const req = {
            params: { dept_id: 1 },
            body: { dept_estado: 'activo' },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        await cambiarEstadoDepartamento(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('Estado del departamento actualizado');
    });

    // Prueba de deleteDepartamento
    it('should delete a departamento', async () => {
        const req = {
            params: { dept_id: 1 },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

        await deleteDepartamento(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('Departamento eliminado');
    });
});
