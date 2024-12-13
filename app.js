const express = require('express')
const server = express()
const host = "http://127.0.0.1"
const port = "3005"
const cors = require('cors');
const router = require('./routes/movieRoutes')

server.use(cors())

server.get('/', (req, res) => {
    res.send(`Server is up and running!`);
})

server.use('/movies', router)


server.listen(port, () => {
    console.log(`Server in ascolto ${host}:${port}`);
})