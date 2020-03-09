const Student = require('../models/Student');
const { date, grade } = require('../../lib/utils');

module.exports = {
    index(req,res) {
        Student.all(function(students) {

            for (student of students) {
                student.school_year = grade(student.school_year);
            };

            return res.render("students/index", {students});
        });
    },

    create(req,res) {
        Student.teachersSelectOptions(function(options) {
            return res.render("students/create", {teacherOptions: options});
        });
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
    
        Student.create(req.body, function(student) {
            return res.redirect(`/students/${student.id}`);
        });
    },

    show(req,res) {
        Student.find(req.params.id, function(student) {
            if(!student) return res.send("Student not found");

            student.birth = date(student.birth_date).birthDay;
            student.created_at = date(student.created_at).format;
            student.school_year = grade(student.school_year);
            
            return res.render("students/show", {student});
        });
    },

    edit(req, res) {
        Student.find(req.params.id, function(student) {
            if(!student) return res.send("Student not found!");

            student.birth = date(student.birth_date).iso;

            Student.teachersSelectOptions(function(options) {
                return res.render("students/edit", {student, teacherOptions: options});
            });
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

        Student.update(req.body, function() {
            return res.redirect(`/students/${req.body.id}`);
        });
    },

    delete(req, res) {
        Student.delete(req.body.id, function() {
            return res.redirect("/students");
        })
    }
};