//importando dependências e rotas
const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const mehotOverride = require('method-override');

//rondando servidor
const server = express();

server.set("view engine", "njk");

//configurando servidor
//método embutido no express para reconhecer o objeto de solicitação recebido como cadeias ou matrizes
server.use(express.urlencoded({extended: true}));
//para usar arquivos de estilização estáticos
server.use(express.static('public'));
//para mudar as rotas quando necessário
server.use(mehotOverride('_method'));
server.use(routes);

//configurando nunjcuks
nunjucks.configure("views", {
    express: server,
    //para que comandos dentro das tags html funcionem
    autoescape: false,
})

//ouvindo a porta
server.listen(5000);