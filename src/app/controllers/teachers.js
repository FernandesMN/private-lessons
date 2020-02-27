const Teacher = require('../models/Teacher');
const { graduation, date, age } = require('../../lib/utils');

module.exports = {
    index(req,res) {
        Teacher.all(function(teachers) {
            return res.render("teachers/index", {teachers});
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
    
        Teacher.create(req.body, function(teacher) {
            return res.redirect(`/teachers/${teacher.id}`);
        });
    },

    show(req,res) {
        Teacher.find(req.params.id, function(teacher) {
            if(!teacher) return res.send("Instructor not found");

            teacher.age = age(teacher.birth_date);
            teacher.schooling = graduation(teacher.education_level);
            teacher.acting = teacher.acting.split(",");
            teacher.created_at = date(teacher.created_at).format;
            teacher.type_of_class = teacher.classtype;
            
            return res.render("teachers/show", {teacher});
        });
    },

    edit(req, res) {
        Teacher.find(req.params.id, function(teacher) {
            if(!teacher) return res.send("Teacher not found!");

            teacher.birth = date(teacher.birth_date).iso;
            teacher.schooling = teacher.education_level;
            teacher.type_of_class = teacher.classtype;

            return res.render("teachers/edit", {teacher});
        });
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

        Teacher.update(req.body, function() {
            return res.redirect(`/teachers/${req.body.id}`);
        });
    },

    delete(req, res) {
        Teacher.delete(req.body.id, function() {
            return res.redirect("/teachers");
        })
    }
};