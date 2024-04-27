const EXPRESS = require("express");
const MONGOOSE = require("mongoose");

// Variáveis de ambiente
require("dotenv").config();

const APP = EXPRESS();
// Porta
const PORT = 3000;

// Uuario e senha do banco de dados
const DB_USER = process.env.MONGODB_USER;
const DB_PASSWORD = process.env.MONGODB_PASS;

// Conexao com o banco de dados
MONGOOSE.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@starwars-api.myaob3d.mongodb.net/?retryWrites=true&w=majority&appName=starwars-api`);

const FILME = MONGOOSE.model("filmes", {
    titulo:"String",
    descricao:"String",
    imagem_url:"String",
    video_url:"String",
    filme_ano:"Date"

});

// GET
APP.get("/", (req,res) =>{
    res.send("<h1>Hello Word!</h1>");
});

// POST
APP.post("/", (req,res)=>{
    const NOVOFILME =  new FILME({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        imagem_url: req.body.imagem_url,
        video_url: req.body.video_url,
        filme_ano:req.body.filme_ano
    });
});

APP.listen(PORT, ()=>{
    console.log(`Servidor StarWars API iniciado com sucesso!`);
    console.log(`URL: http://localhost:${PORT}`);
});
