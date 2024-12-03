const { getSolicitud, createSolicitud, updateSolicitud, deleteSolicitud, infoRecursos, updateEstadoSolicitud, updateNotaSolicitud, aprobacion } = require('../../controllers/solicitud.controller.js');
const { db } = require('../../db'); // Asegúrate de que la ruta sea correcta

describe('Solicitud Controller', () => {

    // Prueba de getSolicitud
    it('should return all solicitudes', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, callback) => callback(null, { rows: [{ sol_id: 1, cand_id: 1, sol_aprobacion: 'Aprobada', nota_final: 90 }] }));

        await getSolicitud(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ sol_id: 1, cand_id: 1, sol_aprobacion: 'Aprobada', nota_final: 90 }]);
    });

    // Prueba de createSolicitud
    it('should create a new solicitud', async () => {
        const req = {
            body: {
                cand_id: 1,
                rh_id: 1,
                sol_aprobacion: 'Pendiente',
                ofe_id: 1,
                nota_final: 85,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [{ sol_id: 1, ...req.body }] }));

        await createSolicitud(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ sol_id: 1, ...req.body });
    });

    // Prueba de updateSolicitud
    it('should update an existing solicitud', async () => {
        const req = {
            params: { id: 1 },
            body: {
                cand_id: 1,
                rh_id: 2,
                sol_aprobacion: 'Aprobada',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [{ sol_id: 1, ...req.body }] }));

        await updateSolicitud(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ sol_id: 1, ...req.body });
    });

    // Prueba de deleteSolicitud
    it('should delete an existing solicitud', async () => {
        const req = {
            params: { id: 1 },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [{ sol_id: 1 }] }));

        await deleteSolicitud(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ sol_id: 1 });
    });

    // Prueba de infoRecursos
    it('should return recursos information', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, callback) => callback(null, { rows: [{ sol_id: 1, cand_id: 1, cand_num_identificacion: '123456', sol_aprobacion: 'Aprobada', nota_final: 90, cand_nombre1: 'Juan', cand_apellido1: 'Pérez' }] }));

        await infoRecursos(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ sol_id: 1, cand_id: 1, cand_num_identificacion: '123456', sol_aprobacion: 'Aprobada', nota_final: 90, cand_nombre1: 'Juan', cand_apellido1: 'Pérez' }]);
    });

    // Prueba de updateEstadoSolicitud
    it('should update the state of solicitud', async () => {
        const req = {
            params: { id: 1 },
            body: {
                sol_aprobacion: 'Aprobada',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [{ sol_id: 1, sol_aprobacion: 'Aprobada' }] }));

        await updateEstadoSolicitud(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ sol_id: 1, sol_aprobacion: 'Aprobada' });
    });

    // Prueba de updateNotaSolicitud
    it('should update the note of solicitud', async () => {
        const req = {
            params: { id: 1, nota: 95 },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [{ sol_id: 1, nota_final: 95 }] }));

        await updateNotaSolicitud(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ sol_id: 1, nota_final: 95 });
    });

    // Prueba de aprobacion
    it('should return the approval status of solicitud', async () => {
        const req = {
            params: { id: 1 },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        // Simulamos una respuesta exitosa de la base de datos
        db.query = jest.fn((q, values, callback) => callback(null, { rows: [{ sol_aprobacion: 'Aprobada' }] }));

        await aprobacion(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ sol_aprobacion: 'Aprobada' });
    });

});
