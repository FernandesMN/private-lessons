const fs = require('fs');
const data = require('./data.json');
const { age, graduation, dateDesde } = require('./utils');

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