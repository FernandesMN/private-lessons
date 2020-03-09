const db = require("../../config/db");
const { graduation, date } = require('../../lib/utils');

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM teachers ORDER BY name ASC`, function(err, results) {
            if(err) throw `Database Error: ${err}`;
           
            callback(results.rows);
        });
    },

    create(data, callback) {
        const query = `
            INSERT INTO teachers (
                avatar_url,
                name,
                birth_date,
                education_level,
                classtype,
                acting,
                created_at
            ) VALUES ($1,$2,$3,$4,$5,$6,$7)
            RETURNING id
        `
        
        let { avatar_url, name, birth, schooling, type_of_class, acting } = data;

        const values = [
            avatar_url,
            name,
            date(birth).iso,
            schooling,
            type_of_class,
            acting,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database Error: ${err}`;

            callback(results.rows[0]);
        });
    },

    find(id, callback) {
        db.query(`SELECT * FROM teachers WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database Error: ${err}`;

            callback(results.rows[0]);
        });
    },

    findBy(filter, callback) {
        db.query(`SELECT teachers.* FROM teachers
        WHERE teachers.name ILIKE '%${filter}%'
        OR teachers.acting ILIKE '%${filter}%'
        ORDER BY teachers.id`, function(err, results) {
            if (err) throw `Database Error: ${err}`;

            callback(results.rows);
        });

    },

    update(data, callback) {
        
        const query = `
                UPDATE teachers SET
                    avatar_url=($1),
                    name=($2),
                    birth_date=($3),
                    education_level=($4),
                    classtype=($5),
                    acting=($6)            
                WHERE id = $7
        `
        
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.schooling,
            data.type_of_class,
            data.acting,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database Error: ${err}`;

            callback();
        });
    },

    delete(id, callback) {
        db.query(`DELETE FROM teachers WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database Error: ${err}`;

            callback();
        });
    },

    paginate(params) {
        const { filter, limit, offset, callback } = params;

        let query = "",
            filterQuery = "",
            totalQuery = `(SELECT count(*) FROM teachers) AS total`;

        if ( filter) {
            filterQuery = `
                WHERE teachers.name ILIKE '%${filter}%'
                OR teachers.acting ILIKE '%${filter}%'
            `

            totalQuery = `(SELECT count(*) FROM teachers ${filterQuery}) AS total`;
        }

        query = `
            SELECT teachers.*, ${totalQuery}, count(students) AS total_students
            FROM teachers
            LEFT JOIN students ON (teachers.id = students.teacher_id)
            ${filterQuery}
            GROUP BY teachers.id LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function(err, results) {
            if (err) throw `Database: ${err}`;

            callback(results.rows);
        });
    }
}