import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import { checkPrime } from 'crypto'

dotenv.config()

export const pool = mysql.createPool({
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
  const [rows] = await pool.query('SELECT * FROM modul WHERE id_praktikum = ?', [praktikumId]);
  return rows;
}

export async function getSubModulesEldasByModulID(modulId) {
  const [rows] = await pool.query('SELECT * FROM submodul_eldas WHERE id_modul = ?', [modulId]); 
  return rows;
}

export async function getVideosSubModulesEldasBySubModulID(submodulId) {
  const [rows] = await pool.query('SELECT video_url FROM submodul_eldas WHERE id_modul = ?', [submodulId]); 
  return rows;
}

export async function getQuizEldasBySubModulID(submodulId) {
  const [rows] = await pool.query(`
    SELECT id_quiz, pertanyaan, pilihan_a, pilihan_b, pilihan_c, pilihan_d, jawaban_benar
    FROM quiz_eldas 
    WHERE id_submodul IN (?)`,[submodulId]);
 return rows;
}

export async function checkAnswer(quizId, userAnswer) {
  const [rows] = await pool.query(
    `SELECT jawaban_benar FROM quiz_eldas WHERE id_quiz = ?`, 
    [quizId]
  );

  if (rows.length === 0) return { success: false, message: "Quiz tidak ditemukan" };

  const isCorrect = rows[0].jawaban_benar === userAnswer;
  return { success: true, correct: isCorrect };
}


export async function saveUserAnswer(userId, quizId, userAnswer) {
  
  const [result] = await pool.query(
    `INSERT INTO user_answers (user_id, id_quiz, user_answer) VALUES (?, ?, ?)`, 
    [userId, quizId, userAnswer] // Perbaikan: userId diletakkan lebih dulu
  );
  return result;
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

const submodulesForModules = await getSubModulesEldasByModulID(3);
console.log('Sub Modules for Module eldas:', submodulesForModules);

const videosSubmodules = await getVideosSubModulesEldasBySubModulID(1);
console.log('video for subModules eldas:', videosSubmodules);

const quizEldas = await getQuizEldasBySubModulID([3, 6]);
console.log('quiz for eldas:', quizEldas);

const checkJawaban = await checkAnswer();
console.log('Jawaban:', checkJawaban);
