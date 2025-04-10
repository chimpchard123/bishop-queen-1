const express = require('express');
const cors = require('cors');
const database = require('better-sqlite3');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

//våran databas
// const db = new Database('./db/database.db');
const db = new database('./db/database.js');

// vad som visas på backend om den startar correct
app.get('/', (req, res) => {
    res.send('Välkommen till Filmvisarna API!');
});

// Starta servern
app.listen(port, () => {
    console.log(`Servern körs på http://localhost:${port}`);
});