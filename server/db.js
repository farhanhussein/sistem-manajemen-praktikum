import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: '8889'
})

export async function getLabs() {
  const[rows] = await pool.query("SELECT * FROM labs")
  return rows
}
const labs = await getLabs()
console.log(labs)

export async function getPraktikumByLabId(labId) {
  const [rows] = await pool.query("SELECT * FROM praktikum WHERE lab_id = ?", [labId]);
  return rows;
}

// Fungsi untuk mengambil data modul berdasarkan praktikum_id
export async function getModulesEldasByPraktikumId(praktikumId) {
  const [rows] = await pool.query('SELECT * FROM modul_eldas WHERE id_praktikum = ?', [praktikumId]);
  return rows;
}


// Contoh penggunaan:
const labRPL = await getPraktikumByLabId(1);
console.log("Lab RPL:", labRPL);

const labMulmed = await getPraktikumByLabId(2);
console.log("Lab Multimedia:", labMulmed);

const labJaringan = await getPraktikumByLabId(3);
console.log("Lab Jaringan:", labJaringan);

const labSistemTertanam = await getPraktikumByLabId(4);
console.log("Lab Sistem Tertanam:", labSistemTertanam);

const modulesForPrak1 = await getModulesEldasByPraktikumId(1);
console.log('Modules for Praktikum 1:', modulesForPrak1);
