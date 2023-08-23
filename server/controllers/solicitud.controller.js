import { db } from "../db.js";

export const getSolicitud = (req, res) => {
  const q = "SELECT * FROM solicitud;";
  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data.rows);
  });
};

export const createSolicitud = (req, res) => {
  const { cand_id, rh_id, sol_aprobacion,ofe_id, nota_final } = req.body;
  const q = `INSERT INTO public.solicitud (cand_id, rh_id, sol_aprobacion, ofe_id, nota_final)
  VALUES ($1,$2,$3,$4,$5) RETURNING *;`;
  const values = [cand_id, rh_id, sol_aprobacion,ofe_id, nota_final,];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(201).json(data.rows[0]);
  });
};

export const updateSolicitud = (req, res) => {
  const sol_id = req.params.id;
  const { cand_id, rh_id, sol_aprobacion } = req.body;
  const q = `UPDATE solicitud SET cand_id = $1, rh_id = $2, sol_aprobacion = $3 WHERE sol_id = $4 RETURNING *;`;
  const values = [cand_id, rh_id, sol_aprobacion, sol_id];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).send(err);
    if (data.rows.length === 0)
      return res.status(404).send("Solicitud no encontrada");
    return res.status(200).json(data.rows[0]);
  });
};

export const deleteSolicitud = (req, res) => {
  const sol_id = req.params.id; // Obtén el ID de solicitud de los parámetros de la URL
  const q = `DELETE FROM solicitud WHERE sol_id = $1 RETURNING *;`;

  db.query(q, [sol_id], (err, data) => {
    if (err) return res.status(500).send(err);
    if (data.rows.length === 0)
      return res.status(404).send("Solicitud no encontrada");
    return res.status(200).json(data.rows[0]);
  });
};
