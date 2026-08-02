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

app.get("/api/todos/:id", (req, res) => {

    db.get(
        "SELECT * FROM todos WHERE id=?",
        [req.params.id],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (!row) {
                return res.status(404).json({
                    message: "Todo not found"
                });
            }

            res.status(200).json(row);

        }
    );

});
