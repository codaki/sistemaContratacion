import { db } from "../db.js";

export const getCampoEspecifico= (req, res) => {
    const q =  "SELECT * FROM campo_especifico;";
    db.query(q, (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).json(data.rows);
    });
};