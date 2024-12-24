const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Create a record
app.post('/api/records', async (req, res) => {
    try {
        const { field1, field2, field3, field4, field5 } = req.body;
        const newRecord = await pool.query(
            "INSERT INTO records (field1, field2, field3, field4, field5) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [field1, field2, field3, field4, field5]
        );
        res.json(newRecord.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get all records
app.get('/api/records', async (req, res) => {
    try {
        const allRecords = await pool.query("SELECT * FROM records ORDER BY id ASC");
        res.json(allRecords.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Delete a record
app.delete('/api/records/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM records WHERE id = $1", [id]);
        res.json("Record deleted successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
