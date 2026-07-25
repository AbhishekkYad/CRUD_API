const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["GET /", "GET /health", "GET /tasks", "GET /tasks/:id", "POST /tasks", "PUT /tasks/:id", "DELETE /tasks/:id"],
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
