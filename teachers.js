const fs = require('fs');
const data = require('./data.json');
const { age, graduation, dateDesde, date } = require('./utils');

//post
exports.post = function(req,res) {
    const keys = Object.keys(req.body);

    for(key of keys) {
        if(req.body[key] == "") {
            return res.send("Please, fill in all fields.");
        };
    };

    let { avatar_url, name, birth, schooling, type_of_class, acting } = req.body;

    birth = Date.parse(birth)
    const created_at = Date.now();
    const id = Number(data.teachers.length + 1);

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

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write files error.");

        return res.redirect("/teachers");
    });
};

//show
exports.show = function(req,res) {
    const { id } = req.params;

    const foundTeacher = data.teachers.find(function(teacher) {
        return id == teacher.id;
    });

    if (!foundTeacher) return res.send("Teacher not found!");

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        schooling: graduation(foundTeacher.schooling),
        acting: foundTeacher.acting.split(","),
        created_at: dateDesde(foundTeacher.created_at)
    }

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
exports.put = function(req, res) {
    const { id } = req.body;
    let index = 0;

    const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
        if (id == teacher.id){
            index = foundIndex;
            return true;
        }
    });

    if (!foundTeacher) return res.send("Teacher not found!");

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