import { db } from "../db.js";

export const getPostulacion = (req, res) => {
    const q =  "SELECT * FROM postulacion;";
    db.query(q, (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).json(data.rows);
    });
};