const express = require('express');
const routes = express.Router();
//importando métodos para as rotas
const teachers = require('../src/app/controllers/teachers');
const students = require('../src/app/controllers/students');

routes.get("/", function(req,res) {
    return res.redirect("/teachers");
});

//teachers
routes.get("/teachers", teachers.index);
routes.get("/teachers/create", teachers.create);
routes.get("/teachers/:id/edit", teachers.edit);
routes.get("/teachers/:id", teachers.show);
routes.post("/teachers", teachers.post);
routes.put("/teachers", teachers.update);
routes.delete("/teachers", teachers.delete);

//members
routes.get("/students", students.index);
routes.get("/students/create", students.create);
routes.get("/students/:id/edit", students.edit);
routes.get("/students/:id", students.show);
routes.post("/students", students.post);
routes.put("/students", students.update);
routes.delete("/students", students.delete);

module.exports = routes;