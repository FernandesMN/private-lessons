const express = require('express');
const routes = express.Router();

//importando métodos para as rotas
const teachers = require('./teachers');

routes.get("/", function(req,res) {
    return res.redirect("/teachers");
});

routes.get("/teachers", teachers.index);

routes.get("/teachers/create", function(req,res) {
    return res.render("teachers/create");
});

routes.get("/teachers/:id/edit", teachers.edit);

routes.get("/teachers/:id", teachers.show);

routes.post("/teachers", teachers.post);

routes.put("/teachers", teachers.update);

routes.delete("/teachers", teachers.delete);

routes.get("/students", function(req,res) {
    return res.render("students/index");
});

module.exports = routes;