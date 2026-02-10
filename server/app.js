const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/projects', require('./routes/projects'));
app.use('/expenses', require('./routes/expenses'));

app.listen(process.env.PORT, () => {
    console.log(`server at running at port ${process.env.PORT}`);
})