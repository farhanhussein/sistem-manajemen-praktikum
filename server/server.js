// const express = require("express");
// const app = express();
// const cors = require("cors");
// const PORT = 8080;

// app.use(cors());
// app.use(express.json());

// // API Routes
// // API untuk nampilin Home Page (difetch dari page.tsx globak)
// app.get('/api/lab', (req, res) => {
//     res.json({
//       message: 'Welcome to the Management Information System API',
//       data: ['Lab RPL', 'Lab Mulmed', 'Lab jaringan', 'Lab Sister'],
//     });
//   });

// // API untuk nampilin data lab rpl (difetch dari page.tsx folder lab-rpl)
//   app.get("/api/lab/lab-rpl", (req, res) => {
//     res.json({
//       message: "Lab RPL Data",
//       data: [
//         "Praktikum Pemrograman Dasar",
//         "Praktikum Rekayasa Perangkat Lunak",
//         "Praktikum Pemrograman Perangkat Bergerak",
//         "Praktikum RPLBK",
//         "Praktikum Sistem Basis Data",
//       ],
//     });
//   });

//   app.get("/api/lab/lab-mulmed", (req, res) => {
//     res.json({
//       message: "Lab Multimedia Data",
//       data: [
//         "Praktikum Multimedia",
//       ],
//     });
//   });

//   app.get("/api/lab/lab-jaringan", (req, res) => {
//     res.json({
//       message: "Lab Jaringan Data",
//       data: [
//         "Praktikum Pengenalan Jaringan Komputer",
//         "Praktikum Switching Routing Wireless Essentials",
//       ],
//     });
//   });

//   app.get("/api/lab/lab-sister", (req, res) => {
//     res.json({
//       message: "Lab Sistem Tertanam",
//       data: [
//         "Praktikum Elektronika Dasar",
//         "Praktikum Sistem DIgital",
//         "Praktikum Teknik Mikroprosessor dan Antarmuka",
//         "Praktikum Sistem Digital Lanjur",
//         "Praktikum Teknik Kendali dan Otomasi",
//       ],
//     });
//   });

//   app.get('/api/praktikum/lab-rpl', (req, res) => {
//     res.json({
//       message: 'Welcome to the Management Information System API',
//       data: ['Praktikum DKP', 'Praktikum RPL', 'Praktikum PPB'],
//     });
//   });

//   app.get("/api/praktikum/prak-dkp", (req, res) => {
//     res.json({
//       message: "Praktikum DKP",
//       data: [
//         "Modul 1 : Python",
//         "Modul 2 : Java",
//       ],
//     });
//   });

//   app.get("/api/praktikum/prak-rpl", (req, res) => {
//     res.json({
//       message: "Praktikum RPL",
//       data: [
//         "Modul 1 : Agile",
//         "Modul 2 : Waterfall",
//       ],
//     });
//   });

//   app.get("/api/praktikum/prak-ppb", (req, res) => {
//     res.json({
//       message: "Praktikum PPB", 
//       data: [
//         "Modul 1 : Android",
//         "Modul 2 : Native",
//       ],
//     });
//   });
  
//   // Start the server
//   app.listen(PORT, () => {
//     console.log(`Server started on http://localhost:${PORT}`);
//   });



// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const labRoutes = require('./routes/labRoutes');
// const praktikumRoutes = require('./routes/praktikumRoutes');

// const app = express();
// const PORT = process.env.PORT || 8080;

// app.use(cors());
// app.use(express.json());
// app.use(morgan('dev'));

// // Gunakan routes
// app.use('/api', labRoutes);
// app.use('/api', praktikumRoutes);

// // Error handling
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server started on http://localhost:${PORT}`);
// });

import express from "express";
import cors from "cors";
import { getLabs, getModulesEldasByPraktikumId, getPraktikumByLabId, } from "./db.js";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

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

app.get("/api/praktikum/prak-eldas/:prakId", async (req, res) => {
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
