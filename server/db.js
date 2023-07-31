import pkg from 'pg';
const { Pool } = pkg;

export const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'SistemaPostulacion',
    //database: 'usuariologin',
    password: 'abril9903',
    port: 5432,
})
