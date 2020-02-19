//para escrever dados em arquivos
const fs = require('fs');
//importando os dados
const data = require('../data.json');
//importando os métodos
const { age, graduation, date } = require('../utils');

//index
exports.index = function(req,res) {
    return res.render("teachers/index", {teachers: data.teachers});
};

//create
exports.create = function(req,res) {
    return res.render("teachers/create");
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

    //desestruturando para pegar somente o que interessa
    let { avatar_url, name, birth, schooling, type_of_class, acting } = req.body;

    //fazendo ajustes
    birth = Date.parse(birth);
    acting = acting.split(",");
    const created_at = Date.now();
    const id = Number(data.teachers.length + 1);

    //preenchendo os dados
    data.teachers.push({
        id,
        name,
        birth,
        avatar_url,
        schooling,
        acting,
        type_of_class,
        created_at
    });

    //escrevendo os dados no arquivo
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write files error.");

        return res.redirect("/teachers");
    });
};

//show
exports.show = function(req,res) {
    const { id } = req.params;

    //procurando professor a parti do id
    const foundTeacher = data.teachers.find(function(teacher) {
        return id == teacher.id;
    });

    //garantindo que ele foi encontrado
    if (!foundTeacher) return res.send("Teacher not found!");

    //Preste atenção no preenchimento, ótimo conceito além de estar ajustando cada dado
    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        schooling: graduation(foundTeacher.schooling),
        created_at: date(foundTeacher.created_at).since
    }

    //renderizano página com os dados
    return res.render("teachers/show", {teacher})
};

//edit
exports.edit = function(req, res) {
    const { id } = req.params;

    const foundTeacher = data.teachers.find(function(teacher) {
        return id == teacher.id;
    });

    if (!foundTeacher) return res.send("Teacher not found!");

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    return res.render("teachers/edit", {teacher});
};

//put
exports.update = function(req, res) {
    const { id } = req.body;
    let index = 0;

    const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
        if (id == teacher.id){
            index = foundIndex;
            return true;
        }
    });

    if (!foundTeacher) return res.send("Teacher not found!");

    //perceba a sacada, ao espalhar os dados eles automáticamente se atualizam
    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.teachers[index] = teacher;

    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err) {
        if (err) return res.send("write file error!");

        return res.redirect(`/teachers/${id}`);
    });
};

//delete
exports.delete = function(req, res) {
    const { id } = req.body;

    //vai colocar todos que tem id diferente do id recebido
    const filteredTeachers = data.teachers.filter(function(teacher) {
        return teacher.id != id;
    });

    data.teachers = filteredTeachers;

    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err) {
        if (err) return res.send("write file error!");
    
        return res.redirect("/teachers");
    });
}