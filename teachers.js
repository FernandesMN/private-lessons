const fs = require('fs');
const data = require('./data.json');

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