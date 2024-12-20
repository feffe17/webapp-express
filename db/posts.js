const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect((err) => {
    if (err) {
        console.log('Error', err);
        return
    }

    console.log('Database connected');
})

module.exports = connection