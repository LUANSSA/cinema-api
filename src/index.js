const EXPRESS = require("express");
const MONGOOSE = require("mongoose");

const HANDLEBARS = require('express-handlebars');


// Variáveis de ambiente
require("dotenv").config();

const APP = EXPRESS();
// Porta
const PORT = 3000;


APP.engine("handlebars", HANDLEBARS.engine({
    extname: "handlebars",
    defaultLayout: false,
    layoutsDir: "views/layouts/"
}));

// APP.set("view engine", "handlebars");
// APP.set("views", __dirname + "/views");

// Permite com que a aplicação leia requisições com dados em json
APP.use(EXPRESS.json());

// Uuario e senha do banco de dados
const DB_USER = process.env.MONGODB_USER;
const DB_PASSWORD = process.env.MONGODB_PASS;


const FILME = MONGOOSE.model("filmes", {
    titulo:"String",
    descricao:"String",
    imagem_url:"String",
    video_url:"String",
    filme_ano:"Date"

});

// GET | Index
APP.get("/",(req,res) =>{
    res.render("index");
});


// GET | Filme | Listar todos
APP.get("/filme", async (req,res) =>{
    const FILMES = await FILME.find();
    res.send(FILMES);
});

// GET | Filme | Consulta por ID
APP.get("/filme/:id", async (req,res) =>{
    const FILME = await FILME.findById(req.params.id);
    res.send(FILME);
});

// POST | Filme Inserir
APP.post("/filme", async (req,res)=>{

    const NOVOFILME =  new FILME({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        imagem_url: req.body.imagem_url,
        video_url: req.body.video_url,
        filme_ano:req.body.filme_ano
    });

    await NOVOFILME.save();
    res.send(NOVOFILME);
});

// Servidor
APP.listen(PORT, ()=>{
    // Conexao com o banco de dados
    MONGOOSE.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@starwars-api.myaob3d.mongodb.net/?retryWrites=true&w=majority&appName=starwars-api`);

    console.log(`Servidor StarWars API iniciado com sucesso!`);
    console.log(`URL: http://localhost:${PORT}`);
});
