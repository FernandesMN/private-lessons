module.exports = {
    //método para calcular a idade
    age(timestamp) {
        const today = new Date();
        const birthDay = new Date(timestamp);

        let age = today.getFullYear() - birthDay.getFullYear();
        let month = today.getMonth() - birthDay.getMonth();

        if (month < 0 || month == 0 && today.getDate() <= birthDay.getDate()) {
            age = age - 1;
        }

        return age;
    },

    //método para determinar a string de escolaridade baseado no valor recebido do HTML
    graduation(schooling) {
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

    //método para retornar data em um formato para edição
    date(timestamp) {
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);
    
        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            since: `${day}/${month}/${year}`,
            birthDay: `${day}/${month}`
        };
    },

    grade(year) {
        switch(year) {
            case "5ef":
                return "5º year of elementary school"
            case "6ef":
                return "6º year of elementary school"
            case "7ef":
                return "7º year of elementary school"
            case "8ef":
                return "8º year of elementary school"
            case "9ef":
                return "9º year of elementary school"
            case "1em":
                return "1º high school year"
            case "2em":
                return "2º high school year"
            default:
                return "3º high school year"  
        }
    }
};