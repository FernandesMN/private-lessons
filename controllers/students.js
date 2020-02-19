//para escrever dados em arquivos
const fs = require('fs');
//importando os dados
const data = require('../data.json');
//importando os métodos
const { date, grade } = require('../utils');

//index
exports.index = function(req,res) {
    const students = data.students

    for (i = 0; i < students.length; i++) {
        students[i].school_year = grade(students[i].school_year);
    };

    return res.render("students/index", {students});
};

//create
exports.create = function(req,res) {
    return res.render("students/create");
};

//post
exports.post = function(req,res) {
    //pegando as chaves da requisição
    const keys = Object.keys(req.body);

    //garantindo que nenhuma chave está vazia
    for(key of keys) {
        if(req.body[key] == "") {
            return res.send("Please, fill in all fields.");
        };
    };

    //fazendo ajustes
    birth = Date.parse(req.body.birth)
    let id = 1;
    const lastStudent = data.students[data.students.length - 1];

    if (lastStudent) {
        id = lastStudent.id + 1;
    };
    
    //preenchendo os dados
    data.students.push({
        id,
        ...req.body,
        birth,
    });

    //escrevendo os dados no arquivo
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write files error.");

        return res.redirect("/students");
    });
};

//show
exports.show = function(req,res) {
    const { id } = req.params;

    //procurando professor a parti do id
    const foundStudent = data.students.find(function(student) {
        return id == student.id;
    });

    //garantindo que ele foi encontrado
    if (!foundStudent) return res.send("student not found!");

    //Preste atenção no preenchimento, ótimo conceito além de estar ajustando cada dado
    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).birthDay,
        school_year: grade(foundStudent.school_year)
    }

    //renderizano página com os dados
    return res.render("students/show", {student})
};

//edit
exports.edit = function(req, res) {
    const { id } = req.params;

    const foundStudent = data.students.find(function(student) {
        return id == student.id;
    });

    if (!foundStudent) return res.send("student not found!");

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }

    return res.render("students/edit", {student});
};

//put
exports.update = function(req, res) {
    const { id } = req.body;
    let index = 0;

    const foundStudent = data.students.find(function(student, foundIndex) {
        if (id == student.id){
            index = foundIndex;
            return true;
        }
    });

    if (!foundStudent) return res.send("student not found!");

    //perceba a sacada, ao espalhar os dados eles automáticamente se atualizam
    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.students[index] = student;

    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err) {
        if (err) return res.send("write file error!");

        return res.redirect(`/students/${id}`);
    });
};

//delete
exports.delete = function(req, res) {
    const { id } = req.body;

    //vai colocar todos que tem id diferente do id recebido
    const filteredStudents = data.students.filter(function(student) {
        return student.id != id;
    });

    data.students = filteredStudents;

    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err) {
        if (err) return res.send("write file error!");
    
        return res.redirect("/students");
    });
}