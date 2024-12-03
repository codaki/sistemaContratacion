const {
    getActividad,
    createActividad,
    updateActividad,
    cambiarEstadoActividad,
    deleteActividad
} = require('../../controllers/actividad.controller.js');

const { db } = require('../../db.js');
jest.mock('../../db.js'); // Mockear la base de datos


describe('Actividad Controller Tests', () => {
    let req, res;

    beforeEach(() => {
        req = { body: {}, params: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
        db.query.mockClear();
    });

    test('getActividad - debería obtener todas las actividades', async () => {
        const mockData = { rows: [{ id: 1, act_nombre: 'Actividad 1' }] };
        db.query.mockImplementation((q, callback) => callback(null, mockData));

        await getActividad(req, res);

        expect(db.query).toHaveBeenCalledWith('SELECT * FROM actividad;', expect.any(Function));
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockData.rows);
    });

    test('createActividad - debería crear una nueva actividad', async () => {
        req.body = { act_nombre: 'Nueva Actividad', act_descripcion: 'Descripción' };
        db.query.mockImplementation((q, values, callback) => callback(null, { rows: [] }));

        await createActividad(req, res);

        expect(db.query).toHaveBeenCalledWith(
            'INSERT INTO actividad (act_nombre, act_descripcion) VALUES ($1,$2)',
            ['Nueva Actividad', 'Descripción'],
            expect.any(Function)
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('Actividad creada');
    });

    test('updateActividad - debería actualizar una actividad existente', async () => {
        req.params.act_id = 1;
        req.body = { act_nombre: 'Actualizada', act_descripcion: 'Nueva descripción' };
        db.query.mockImplementation((q, values, callback) => callback(null, { rows: [] }));

        await updateActividad(req, res);

        expect(db.query).toHaveBeenCalledWith(
            'UPDATE actividad SET act_nombre=$1,act_descripcion=$2 WHERE act_id=$3',
            ['Actualizada', 'Nueva descripción', 1],
            expect.any(Function)
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('Actividad actualizada');
    });

    test('cambiarEstadoActividad - debería cambiar el estado de una actividad', async () => {
        req.params.act_id = 1;
        req.body = { act_estado: 'Inactivo' };
        db.query.mockImplementation((q, values, callback) => callback(null, { rows: [] }));

        await cambiarEstadoActividad(req, res);

        expect(db.query).toHaveBeenCalledWith(
            'UPDATE actividad SET act_estado=$1 WHERE act_id=$2',
            ['Inactivo', 1],
            expect.any(Function)
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('Estado de la actividad actualizado');
    });

    test('deleteActividad - debería eliminar una actividad', async () => {
        req.params.act_id = 1;
        db.query.mockImplementation((q, values, callback) => callback(null, { rows: [] }));

        await deleteActividad(req, res);

        expect(db.query).toHaveBeenCalledWith(
            'DELETE FROM actividad WHERE act_id=$1',
            [1],
            expect.any(Function)
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('Actividad eliminada');
    });
});
