const { graduation, date } = require('../../lib/utils');
const db = require("../../config/db");

module.exports = {
    index(req,res) {
        db.query(`SELECT * FROM teachers`, function(err, results) {
            if(err) return res.send("Database Error!");
            
            return res.render("teachers/index", {teachers: results.rows});
        });
    },

    create(req,res) {
        return res.render("teachers/create");
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
    
        const query = `
            INSERT INTO teachers (
                name,
                birthdate,
                educationlevel,
                classtype,
                subjectstaught
            ) VALUES ($1,$2,$3,$4,$5)
            RETURNING id
        `

        const values = [
            req.body.name,
            date(req.body.birth).iso,
            graduation(req.body.schooling),
            req.body.type_of_class,
            req.body.acting
        ]

        db.query(query, values, function(err, results) {
            if(err) return res.send("Database Error!");

            return res.redirect(`/teachers/${results.rows[0].id}`);
        });
    },

    show(req,res) {
        return res.render("teachers/show");
    },

    edit(req, res) {    
        return res.render("teachers/edit");
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