import { db } from "../db.js";

export const getRequisito = (req, res) => {
  const q = "SELECT * FROM requisito;";
  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data.rows);
  });
};

export const createRequisito = (req, res) => {
  const { rq_id, it_id, rq_descripcion } = req.body;
  const q = `
        INSERT INTO requisito (rq_id, it_id, rq_descripcion)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
  const values = [rq_id, it_id, rq_descripcion];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(201).json(data.rows[0]);
  });
};

export const updateRequisito = (req, res) => {
  const rq_id = req.params.id;
  const { it_id, rq_descripcion } = req.body;
  const q = `
        UPDATE requisito
        SET it_id = $1, rq_descripcion = $2
        WHERE rq_id = $3
        RETURNING *;
    `;
  const values = [it_id, rq_descripcion, rq_id];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).send(err);
    if (data.rows.length === 0)
      return res.status(404).send("Requisito no encontrado");
    return res.status(200).json(data.rows[0]);
  });
};

export const deleteRequisito = (req, res) => {
  const rq_id = req.params.id;
  const q = `
        DELETE FROM requisito
        WHERE rq_id = $1
        RETURNING *;
    `;

  db.query(q, [rq_id], (err, data) => {
    if (err) return res.status(500).send(err);
    if (data.rows.length === 0)
      return res.status(404).send("Requisito no encontrado");
    return res
      .status(200)
      .json({ message: "Requisito eliminado correctamente" });
  });
};
