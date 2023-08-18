import { db } from "../db.js";

export const getPostulacion = (req, res) => {
  const q = "SELECT * FROM postulacion;";
  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data.rows);
  });
};

export const createPostulacion = (req, res) => {
  const { post_periodo } = req.body;
  const q = "INSERT INTO postulacion ( post_periodo) VALUES ($1);";
  const values = [post_periodo];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(201).send("Postulación creada exitosamente.");
  });
};

export const updatePostulacion = (req, res) => {
  const post_id = req.params.id;
  const { post_periodo } = req.body;
  const q = "UPDATE postulacion SET post_periodo = $1 WHERE post_id = $2;";
  const values = [post_periodo, post_id];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).send(err);
    if (data.rowCount === 0)
      return res.status(404).send("Postulación no encontrada.");
    return res.status(200).send("Postulación actualizada exitosamente.");
  });
};

export const deletePostulacion = (req, res) => {
  const post_id = req.params.id;
  const q = "DELETE FROM postulacion WHERE post_id = $1;";

  db.query(q, [post_id], (err, data) => {
    if (err) return res.status(500).send(err);
    if (data.rowCount === 0)
      return res.status(404).send("Postulación no encontrada.");
    return res.status(200).send("Postulación eliminada exitosamente.");
  });
};
