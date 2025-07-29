const express = require('express');

const app = express();

require('./database');

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
    console.log({message: "Servidor rodando com sucesso" });
})