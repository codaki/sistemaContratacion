const { getCampoAmplio, createCampoAmplio, updateCampoAmplio, cambiarEstadoCampoAmplio, deleteCampoAmplio } = require('../../controllers/campo_amplio.controller.js');
const { db } = require('../../db.js'); // Asegúrate de que la ruta sea correcta

describe('CampoAmplio Controller', () => {

  // Prueba de getCampoAmplio
  it('should return all campo amplios', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // Simulamos una respuesta exitosa de la base de datos
    db.query = jest.fn((q, callback) => callback(null, { rows: [{ ca_id: 1, ca_nombre: 'Campo A' }] }));

    await getCampoAmplio(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ ca_id: 1, ca_nombre: 'Campo A' }]);
  });

  // Prueba de createCampoAmplio
  it('should create a new campo amplio', async () => {
    const req = {
      body: {
        ca_nombre: 'Campo B',
        ca_descripcion: 'Descripción de campo B',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // Simulamos una respuesta exitosa de la base de datos
    db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

    await createCampoAmplio(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith('Campo amplio creado');
  });

  // Prueba de updateCampoAmplio
  it('should update a campo amplio', async () => {
    const req = {
      params: { ca_id: 1 },
      body: {
        ca_nombre: 'Campo C',
        ca_descripcion: 'Descripción de campo C',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // Simulamos una respuesta exitosa de la base de datos
    db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

    await updateCampoAmplio(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith('Campo amplio actualizado');
  });

  // Prueba de cambiarEstadoCampoAmplio
  it('should update the estado of campo amplio', async () => {
    const req = {
      params: { ca_id: 1 },
      body: { ca_estado: 'activo' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // Simulamos una respuesta exitosa de la base de datos
    db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

    await cambiarEstadoCampoAmplio(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith('Estado del campo amplio actualizado');
  });

  // Prueba de deleteCampoAmplio
  it('should delete a campo amplio', async () => {
    const req = {
      params: { ca_id: 1 },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // Simulamos una respuesta exitosa de la base de datos
    db.query = jest.fn((q, values, callback) => callback(null, { rows: [] }));

    await deleteCampoAmplio(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith('Campo amplio eliminado');
  });
});
