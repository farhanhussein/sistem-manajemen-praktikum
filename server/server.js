const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;

app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/praktikum', (req, res) => {
    res.json({
      message: 'Welcome to the Management Information System API',
      data: ['Lab RPL', 'Lab Mulmed', 'Lab jaringan'],
    });
  });

  app.get("/api/praktikum/lab-rpl", (req, res) => {
    res.json({
      message: "Lab RPL Data",
      data: [
        "Modul 1: Introduction to RPL",
        "Modul 2: System Analysis",
        "Modul 3: Software Design",
      ],
    });
  });
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });