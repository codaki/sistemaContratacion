import { db } from "../db.js";

export const getTituloExp = (req, res) => {
  const q = "SELECT * FROM titulo_exp;";
  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data.rows);
  });
};

export const createTituloExp = (req, res) => {
  const {
    tx_id,
    rq_id,
    tx_descripcion,
    tx_detalle,
    tx_puntaje_min,
    tx_puntaje_max,
    tx_puntaje_asignado,
    tx_observacion,
  } = req.body;
  const q = `
        INSERT INTO titulo_exp (tx_id, rq_id, tx_descripcion, tx_detalle, tx_puntaje_min, tx_puntaje_max, tx_puntaje_asignado, tx_observacion)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `;
  const values = [
    tx_id,
    rq_id,
    tx_descripcion,
    tx_detalle,
    tx_puntaje_min,
    tx_puntaje_max,
    tx_puntaje_asignado,
    tx_observacion,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(201).json(data.rows[0]);
  });
};

export const updateTituloExp = (req, res) => {
  const { tx_id } = req.params;
  const {
    rq_id,
    tx_descripcion,
    tx_detalle,
    tx_puntaje_min,
    tx_puntaje_max,
    tx_puntaje_asignado,
    tx_observacion,
  } = req.body;
  const q = `
        UPDATE titulo_exp
        SET rq_id = $1, tx_descripcion = $2, tx_detalle = $3, tx_puntaje_min = $4, tx_puntaje_max = $5, tx_puntaje_asignado = $6, tx_observacion = $7
        WHERE tx_id = $8
        RETURNING *;
    `;
  const values = [
    rq_id,
    tx_descripcion,
    tx_detalle,
    tx_puntaje_min,
    tx_puntaje_max,
    tx_puntaje_asignado,
    tx_observacion,
    tx_id,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).send(err);
    if (data.rows.length === 0)
      return res.status(404).send("Título de experiencia no encontrado.");
    return res.status(200).json(data.rows[0]);
  });
};

export const deleteTituloExp = (req, res) => {
  const { tx_id } = req.params;
  const q = `
        DELETE FROM titulo_exp
        WHERE tx_id = $1
        RETURNING *;
    `;
  const values = [tx_id];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).send(err);
    if (data.rows.length === 0)
      return res.status(404).send("Título de experiencia no encontrado.");
    return res.status(200).json(data.rows[0]);
  });
};
