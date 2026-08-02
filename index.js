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

app.post("/api/todos", (req, res) => {

    const { title } = req.body;

    db.run(
        "INSERT INTO todos(title) VALUES(?)",
        [title],
        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(201).json({
                id: this.lastID,
                title,
                completed: 0
            });

        }
    );

});

app.put("/api/todos/:id", (req, res) => {

    const { title, completed } = req.body;

    db.run(
        `UPDATE todos
         SET title=?, completed=?
         WHERE id=?`,
        [title, completed, req.params.id],
        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Todo not found"
                });
            }

            res.status(200).json({
                message: "Todo updated successfully"
            });

        }
    );

});

app.delete("/api/todos/:id", (req, res) => {

    db.run(
        "DELETE FROM todos WHERE id=?",
        [req.params.id],
        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Todo not found"
                });
            }

            res.status(200).json({
                message: "Todo deleted successfully"
            });

        }
    );

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
