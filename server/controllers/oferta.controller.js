import { db } from "../db.js";

export const getOferta = (req, res) => {
  const q = "SELECT * FROM oferta;";
  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data.rows);
  });
};
export const createOferta = (req, res) => {
  const {
    post_id,
    con_id,
    ce_id,
    ca_id,
    sede_id,
    dept_id,
    pa_id,
    act_id,
    ofe_vacantes,
    ofe_horas,
  } = req.body;
  const q = `
        INSERT INTO oferta (post_id, con_id, ce_id, ca_id, sede_id, dept_id, pa_id, act_id, ofe_vacantes, ofe_horas)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *;
    `;
  const values = [
    post_id,
    con_id,
    ce_id,
    ca_id,
    sede_id,
    dept_id,
    pa_id,
    act_id,
    ofe_vacantes,
    ofe_horas,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(201).json(data.rows[0]);
  });
};

export const updateOferta = (req, res) => {
  const ofe_id = req.params.id;
  const {
    post_id,
    con_id,
    ce_id,
    ca_id,
    sede_id,
    dept_id,
    pa_id,
    act_id,
    ofe_vacantes,
    ofe_horas,
  } = req.body;
  const q = `
        UPDATE oferta
        SET post_id = $1, con_id = $2, ce_id = $3, ca_id = $4, sede_id = $5, dept_id = $6, pa_id = $7, act_id = $8, ofe_vacantes = $9, ofe_horas = $10
        WHERE ofe_id = $11
        RETURNING *;
    `;
  const values = [
    post_id,
    con_id,
    ce_id,
    ca_id,
    sede_id,
    dept_id,
    pa_id,
    act_id,
    ofe_vacantes,
    ofe_horas,
    ofe_id,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data.rows[0]);
  });
};

export const deleteOferta = (req, res) => {
  const ofe_id = req.params.id;
  const q = `
        DELETE FROM oferta
        WHERE ofe_id = $1
        RETURNING *;
    `;

  db.query(q, [ofe_id], (err, data) => {
    if (err) return res.status(500).send(err);
    if (data.rows.length === 0)
      return res.status(404).send("Oferta no encontrada");
    return res.status(200).json(data.rows[0]);
  });
};


export const postulacionUnica = (req, res) => {
  const q = `SELECT DISTINCT o.post_id, p.post_periodo
  FROM public.oferta o
  INNER JOIN public.postulacion p ON o.post_id = p.post_id;`
  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data.rows);
  });
}

export const contratacionUnica = (req, res) => {
  const post_id = req.params.post_id;
  const q = `SELECT DISTINCT  o.con_id, c.con_nombre
  FROM public.contratacion c
  INNER JOIN public.oferta o ON c.con_id = o.con_id
  INNER JOIN public.postulacion p ON o.post_id = p.post_id
  WHERE p.post_id = $1;`
  db.query(q, [post_id], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data.rows);
  });
}

export const sedeUnica = (req, res) => {
  const con_id = req.params.con_id;
  const post_id = req.params.post_id
  const q = `SELECT DISTINCT s.sede_id, s.sede_nombre
  FROM public.oferta o
  INNER JOIN public.sede s ON o.sede_id = s.sede_id
  INNER JOIN public.postulacion p ON o.post_id = p.post_id
  INNER JOIN public.contratacion c ON o.con_id = c.con_id
  WHERE p.post_id = $1
    AND c.con_id = $2;`
  db.query(q, [post_id, con_id], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data.rows);
  });
}

export const departamentoUnico = (req, res) => {
  const con_id = req.params.con_id;
  const post_id = req.params.post_id
  const sede_id = req.params.sede_id
  const q = `SELECT DISTINCT d.dept_id, d.dept_nombre,d.dept_descripcion
  FROM public.oferta o
  INNER JOIN public.departamento d ON o.dept_id = d.dept_id
  INNER JOIN public.sede s ON o.sede_id = s.sede_id
  INNER JOIN public.postulacion p ON o.post_id = p.post_id
  INNER JOIN public.contratacion c ON o.con_id = c.con_id
  WHERE p.post_id = $1
    AND c.con_id = $2
    AND s.sede_id = $3;`
  db.query(q, [post_id, con_id, sede_id], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data.rows);
  });
}

export const campoAmplioUnico = (req, res) => {
  const con_id = req.params.con_id;
  const post_id = req.params.post_id
  const sede_id = req.params.sede_id
  const dept_id = req.params.dept_id
  const q = `SELECT Distinct ca.ca_id, ca.ca_nombre
  FROM public.oferta o
  INNER JOIN public.campo_amplio ca ON o.ca_id = ca.ca_id
  INNER JOIN public.departamento d ON o.dept_id = d.dept_id
  INNER JOIN public.sede s ON o.sede_id = s.sede_id
  INNER JOIN public.postulacion p ON o.post_id = p.post_id
  INNER JOIN public.contratacion c ON o.con_id = c.con_id
  WHERE p.post_id = $1
    AND c.con_id = $2
    AND s.sede_id = $3
    AND d.dept_id = $4;`
  db.query(q, [post_id, con_id, sede_id, dept_id], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data.rows);
  });
}
export const campoEspecificoUnico = (req, res) => {
  const con_id = req.params.con_id;
  const post_id = req.params.post_id
  const sede_id = req.params.sede_id
  const dept_id = req.params.dept_id
  const ca_id = req.params.ca_id
  const q = `SELECT Distinct ce.ce_id, ce.ce_nombre
  FROM public.oferta o
  INNER JOIN public.campo_especifico ce ON o.ce_id = ce.ce_id
  INNER JOIN public.campo_amplio ca ON o.ca_id = ca.ca_id
  INNER JOIN public.departamento d ON o.dept_id = d.dept_id
  INNER JOIN public.sede s ON o.sede_id = s.sede_id
  INNER JOIN public.postulacion p ON o.post_id = p.post_id
  INNER JOIN public.contratacion c ON o.con_id = c.con_id
  WHERE p.post_id = $1 
    AND c.con_id = $2
    AND s.sede_id = $3
    AND d.dept_id = $4
    AND ca.ca_id = $5;`
  db.query(q, [post_id, con_id, sede_id, dept_id, ca_id], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data.rows);
  });

}

export const personalUnico = (req, res) => {
  const con_id = req.params.con_id;
  const post_id = req.params.post_id
  const sede_id = req.params.sede_id
  const dept_id = req.params.dept_id
  const ca_id = req.params.ca_id
  const ce_id = req.params.ce_id
  const q = `SELECT Distinct pa.pa_id, pa.pa_nombre
  FROM public.oferta o
  INNER JOIN public.personal_academico pa ON o.pa_id = pa.pa_id
  INNER JOIN public.campo_especifico ce ON o.ce_id = ce.ce_id
  INNER JOIN public.campo_amplio ca ON o.ca_id = ca.ca_id
  INNER JOIN public.departamento d ON o.dept_id = d.dept_id
  INNER JOIN public.sede s ON o.sede_id = s.sede_id
  INNER JOIN public.postulacion p ON o.post_id = p.post_id
  INNER JOIN public.contratacion c ON o.con_id = c.con_id
  WHERE p.post_id = $1
    AND c.con_id = $2
    AND s.sede_id = $3
    AND d.dept_id = $4
    AND ca.ca_id = $5
    AND ce.ce_id = $6;`
  db.query(q, [post_id, con_id, sede_id, dept_id, ca_id, ce_id], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data.rows);
  });
}

export const actividadUnica = (req, res) => {
  const con_id = req.params.con_id;
  const post_id = req.params.post_id
  const sede_id = req.params.sede_id
  const dept_id = req.params.dept_id
  const ca_id = req.params.ca_id
  const ce_id = req.params.ce_id
  const pa_id = req.params.pa_id
  const q = `SELECT Distinct a.act_id, a.act_nombre, o.ofe_id
  FROM public.oferta o
  INNER JOIN public.actividad a ON o.act_id = a.act_id
  INNER JOIN public.personal_academico pa ON o.pa_id = pa.pa_id
  INNER JOIN public.campo_especifico ce ON o.ce_id = ce.ce_id
  INNER JOIN public.campo_amplio ca ON o.ca_id = ca.ca_id
  INNER JOIN public.departamento d ON o.dept_id = d.dept_id
  INNER JOIN public.sede s ON o.sede_id = s.sede_id
  INNER JOIN public.postulacion p ON o.post_id = p.post_id
  INNER JOIN public.contratacion c ON o.con_id = c.con_id
  WHERE p.post_id = $1
    AND c.con_id = $2
    AND s.sede_id = $3
    AND d.dept_id = $4
    AND ca.ca_id = $5
    AND ce.ce_id = $6
    AND pa.pa_id = $7;`
  db.query(q, [post_id, con_id, sede_id, dept_id, ca_id, ce_id, pa_id], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data.rows);
  });
}
export const obtenerOferta = (req, res) => {
  const con_id = req.params.con_id;
  const post_id = req.params.post_id
  const sede_id = req.params.sede_id
  const dept_id = req.params.dept_id
  const ca_id = req.params.ca_id
  const ce_id = req.params.ce_id
  const pa_id = req.params.pa_id
  const act_id = req.params.act_id
  const q = `SELECT o.ofe_id, o.ofe_vacantes, o.ofe_horas
  FROM public.oferta o
  INNER JOIN public.actividad a ON o.act_id = a.act_id
  INNER JOIN public.personal_academico pa ON o.pa_id = pa.pa_id
  INNER JOIN public.campo_especifico ce ON o.ce_id = ce.ce_id
  INNER JOIN public.campo_amplio ca ON o.ca_id = ca.ca_id
  INNER JOIN public.departamento d ON o.dept_id = d.dept_id
  INNER JOIN public.sede s ON o.sede_id = s.sede_id
  INNER JOIN public.postulacion p ON o.post_id = p.post_id
  INNER JOIN public.contratacion c ON o.con_id = c.con_id
  WHERE p.post_id = $1
    AND c.con_id = $2
    AND s.sede_id = $3
    AND d.dept_id = $4
    AND ca.ca_id = $5
    AND ce.ce_id = $6
    AND pa.pa_id = $7
    AND a.act_id = $8;`
  db.query(q, [post_id, con_id, sede_id, dept_id, ca_id, ce_id, pa_id, act_id], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data.rows[0]);
  });
};

