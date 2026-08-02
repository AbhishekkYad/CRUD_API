const express = require("express");
const db = require("./database");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Todo API is running");
});

app.get("/api/todos", (req, res) => {

    db.all("SELECT * FROM todos", [], (err, rows) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.status(200).json(rows);

    });

});
