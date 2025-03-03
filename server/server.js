import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { getLabs, getModulesEldasByPraktikumId, getPraktikumByLabId, getSubModulesEldasByModulID, getVideosSubModulesEldasBySubModulID, getQuizEldasBySubModulID, checkAnswer, saveUserAnswer, pool} from "./db.js";

const app = express();
const PORT = 8080;


app.use(cors());
app.use(express.json());

const uploadDir = path.join(process.cwd(), "server/video_file");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/server/video_file", express.static(uploadDir));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    let title = req.body.title || "file"; // Ambil judul atau default ke "video"

    // Bersihkan karakter yang tidak boleh ada di nama file
    title = title.replace(/[^a-zA-Z0-9-_]/g, "_"); 

    cb(null, `${title}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    cb(null, true); // Mengizinkan semua jenis file
  }
});


// API untuk nampilin Home Page (data dari database)
app.get("/api/lab", async (req, res) => {
  try {
    const labs = await getLabs();
    res.json({
      message: "List of Labs from Database",
      data: labs.map((lab) => lab.name), // Pastikan tabel memiliki kolom 'name'
    });
  } catch (error) {
    console.error("Error fetching labs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/lab/lab-rpl/:labId", async (req, res) => {
  try {
    const { labId } = req.params;
    const praktikum = await getPraktikumByLabId(labId);
    
    res.json({
      message: `List of Praktikum for Lab ID ${labId}`,
      data: praktikum,
    });
  } catch (error) {
    console.error("Error fetching praktikum:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/lab/lab-sister/:labId", async (req, res) => {
  try {
    const { labId } = req.params;
    const praktikum = await getPraktikumByLabId(labId);

    res.json({
      message: `List of Praktikum for Lab ID ${labId}`,
      data: praktikum,
    });
  } catch (error) {
    console.error("Error fetching praktikum:", error);
    res.status(500).json({ message: "Internal Server Error"});
  }
});

app.get("/api/praktikum/modul/:prakId", async (req, res) => {
  try{
    const { prakId } = req.params;
    const module = await getModulesEldasByPraktikumId(prakId);

    res.json({
      message: `List of Module Praktikum Elektronika Dasar ${prakId}`,
      data: module,
    });
  } catch (error) {
    console.error("error fetching module:", error);
    res.status(500).json({ message: "Internal Server Error"});
  }
})

app.get("/api/praktikum/submodul/prak-eldas/:modulId", async (req, res) => {
  try{
    const { modulId } = req.params;
    const subModules = await getSubModulesEldasByModulID(modulId);

    res.json({
      message: `Sub Modules of Modul Prak Eldas ${modulId}`,
      data: subModules,
    });
  } catch (error) {
    console.error("error fetching modules:", error);
    res.status(500).json({ message: "Internal Server Error"});
  }
})


app.post("/api/submodul/upload-video/:submodulId", upload.single("file"), async (req, res) => {
  try {
    const { submodulId } = req.params;
    const videoUrl = `http://localhost:8080/server/video_file/${req.file.filename}`;

    // Debugging: Cek apakah submodulId benar
    console.log("Updating submodulId:", submodulId);
    console.log("New video URL:", videoUrl);

    const result = await pool.query("UPDATE submodul_eldas SET video_url = ? WHERE id_submodul = ?", [videoUrl, submodulId]);

    // Debugging: Pastikan update berhasil
    console.log("Database update result:", result);

    res.json({ message: "Video uploaded successfully", videoUrl });
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.get("/api/submodul/video/:submodulId", async (req, res) => {
  try{
    const { submodulId } = req.params;
    const videos = await getVideosSubModulesEldasBySubModulID(submodulId);

    res.json({
      message: `Sub Modules of Modul 1 Prak Eldas ${submodulId}`,
      data: videos,
    });
  } catch (error) {
    console.error("error fetching modules:", error);
    res.status(500).json({ message: "Internal Server Error"});
  }
})

app.get('/api/submodul/quiz/:submodulId', async (req, res) => {
  const { submodulId } = req.params;
  try {
    const quiz = await getQuizEldasBySubModulID(submodulId);
    res.json({ success: true, data: quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/submodul/quiz/check-answer', async (req, res) => {
  const { quizId, userAnswer } = req.body;

  try {
    const result = await checkAnswer(quizId, userAnswer);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/api/submodul/quiz/submit", async (req, res) => {
  try {
    console.log("Incoming data:", req.body); // Debug: Cek apakah data dari frontend sampai ke backend

    const { user_id, id_quiz, user_answer } = req.body;

    // Validasi input (mencegah data kosong)
    if (!user_id || !id_quiz || !user_answer) {
      console.error("Error: Data tidak lengkap", req.body);
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    // Coba eksekusi query ke database
    const [result] = await pool.query(
      `INSERT INTO user_answers (user_id, id_quiz, user_answer) VALUES (?, ?, ?)`,
      [user_id, id_quiz, user_answer]
    );

    console.log("Query success:", result); // Debug: Cek apakah query sukses
    res.json({ success: true, message: "Answer submitted successfully", result });
  } catch (error) {
    console.error("Error submitting answer:", error); // Debug: Lihat error detailnya
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
