import { db } from "../db.js";

export const getTituloExp = (req, res) => {
    const q =  "SELECT * FROM titulo_exp;";
    db.query(q, (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).json(data.rows);
    });
};