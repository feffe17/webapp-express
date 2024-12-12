const express = require('express')
const server = express()
const host = "http://127.0.0.1"
const port = "3005"
const cors = require('cors');


server.listen(port, () => {
    console.log(`Server in ascolto ${host}:${port}`);
})