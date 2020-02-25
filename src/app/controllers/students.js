const { date, grade } = require('../../lib/utils');

module.exports = {
    index(req,res) {
        return res.render("students/index");
    },

    create(req,res) {
        return res.render("students/create");
    },

    post(req,res) {
        //pegando as chaves da requisição
        const keys = Object.keys(req.body);
    
        //garantindo que nenhuma chave está vazia
        for(key of keys) {
            if(req.body[key] == "") {
                return res.send("Please, fill in all fields.");
            };
        };
    
        return;
    },

    show(req,res) {
        return res.render("students/show");
    },

    edit(req, res) {    
        return res.render("students/edit");
    },

    update(req, res) {
        //pegando as chaves da requisição
        const keys = Object.keys(req.body);
    
        //garantindo que nenhuma chave está vazia
        for(key of keys) {
            if(req.body[key] == "") {
                return res.send("Please, fill in all fields.");
            };
        };

        return;
    },

    delete(req, res) {
        return;
    }
};