const express = require("express");
const db = require("./db");
const cors = require("cors"); // Añade esto

// Define express app
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Habilita CORS
app.use(express.json());

// Routes
app.get("/api/ping", (req, res) => res.json({ message: "pong" }));

app.get("/api/students", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM students");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});

app.get("/api/greet", (req, res) => {
  const name = req.query.name || "Invitado";
  res.json({ 
    message: `¡Hola, ${name}! Bienvenido al sistema de estudiantes.`,
    timestamp: new Date().toISOString() 
  });
});

// Start the server
app.listen(port, () => console.log(`App running on port ${port}`));