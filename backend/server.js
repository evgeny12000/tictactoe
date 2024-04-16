const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
const { makeStep } = require('./gameController');

app.use(cors());
app.use(express.json());

app.post('/makeStep', (req, res) => {
    const { board, step } = req.body;
    try {
        const result = makeStep(board, step);
        res.send(result);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
