module.exports = {
    age: function age(timestamp) {
        const today = new Date();
        const birthDay = new Date(timestamp);

        let age = today.getFullYear() - birthDay.getFullYear();
        let month = today.getMonth() - birthDay.getMonth();

        if (month < 0 || month == 0 && today.getDate() <= birthDay.getDate()) {
            age = age - 1;
        }

        return age;
    },

    graduation: function graduation(schooling) {
        let graduation = schooling;

        switch(graduation) {
            case "emc":
                return "Complete high school";
            case "esc":
                return "Complete higher education";
            default:
                return "Masters and/or Doctorate";
        }
    },

    date: function date(timestamp) {
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);
    
        return `${year}-${month}-${day}`;
    },

    dateDesde: function date(timestamp) {
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);
    
        return `${day}/${month}/${year}`;
    }
};