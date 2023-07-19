require('dotenv').config()

const express = require('express')

const PORT = process.env.PORT || 8080

const app = express();
const db = require('./db.js')
db.authenticate().catch(err => console.log(err));

app.listen(PORT, () => console.log(`server started on port ${PORT}`))

app.get('/', (req, res) => {
    res.send('42');
})