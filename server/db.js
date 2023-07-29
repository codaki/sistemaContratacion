import pkg from 'pg';
const { Pool } = pkg;

export const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'usuariologin',
    password: 'abril9903',
    port: 5432,
})
