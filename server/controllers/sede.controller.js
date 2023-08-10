import { db } from "../db.js";

export const getSede = (req, res) => {
  const q = "SELECT * FROM sede;";
  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data.rows);
  });
};

export const createSede = (req, res) => {
  const { sede_id, sede_nombre, sede_descripcion } = req.body;
  const q =
    "INSERT INTO sede (sede_id, sede_nombre, sede_descripcion) VALUES ($1, $2, $3);";
  const values = [sede_id, sede_nombre, sede_descripcion];

  db.query(q, values, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(201).json({ message: "Sede creada exitosamente." });
  });
};

export const updateSede = (req, res) => {
  const { sede_id } = req.params;
  const { sede_nombre, sede_descripcion } = req.body;
  const q =
    "UPDATE sede SET sede_nombre = $1, sede_descripcion = $2 WHERE sede_id = $3;";
  const values = [sede_nombre, sede_descripcion, sede_id];

  db.query(q, values, (err, result) => {
    if (err) return res.status(500).send(err);
    return res
      .status(200)
      .json({ message: `Sede con ID ${sede_id} actualizada exitosamente.` });
  });
};

export const deleteSede = (req, res) => {
  const { sede_id } = req.params;
  const q = "DELETE FROM sede WHERE sede_id = $1;";
  const values = [sede_id];

  db.query(q, values, (err, result) => {
    if (err) return res.status(500).send(err);
    return res
      .status(200)
      .json({ message: `Sede con ID ${sede_id} eliminada exitosamente.` });
  });
};
