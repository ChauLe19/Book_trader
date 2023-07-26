import 'dotenv/config'
import mysql from 'mysql2'

export const pool = mysql.createPool({
    host: process.env.DATABASE_URL,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    port: process.env.DB_PORT
}).promise()

export async function getQuery(query) {
    const [res, schema] = await pool.query(query)
    return res;A
}

export async function getQueryOneOrNull(query) {
    const res = await getQuery(query.concat(" LIMIT 1"));
    return res.length == 0 ? null : res[0];
}