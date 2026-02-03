const express = require('express');
const app = express();
const port = 3000;

const mysql = require('mysql2');

let con = mysql.createConnection({
    host: "db",
    user: "root",
    password: "pass",
    port: "3306",
    database: "app_db"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL!");
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});