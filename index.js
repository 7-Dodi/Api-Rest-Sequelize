require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

const UserRouter = require('./routes/UserRouter');

app.use('/usuarios', UserRouter);

app.listen(process.env.API_PORT, ()=>{
    console.log(`Servidor rodando na porta ${process.env.API_PORT}`);
}); 