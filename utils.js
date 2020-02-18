module.exports = {
    //método para calcular a idade
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

    //método para determinar a string de escolaridade baseado no valor recebido do HTML
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

    //método para retornar data em um formato para edição
    date: function date(timestamp) {
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);
    
        return `${year}-${month}-${day}`;
    },

    //método também para calcular data mas retornar em outro formato
    dateDesde: function date(timestamp) {
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);
    
        return `${day}/${month}/${year}`;
    },

    //esse método verifica se o dado recebido é um vetor ou não
    //se for ele aplica uma resolução se não for a resolão será outra
    //de qualquer forma, o método retorna o acting como um array e/ou garante que ele é um
    cutOrNot: function cutOrNot(teach) {
        let teachers = teach;

        if (teachers instanceof Array) {
            for (i = 0; i < teachers.length; i++){
                if (typeof(teachers[i].acting) === 'object') {
                    break;
                }
        
                teachers[i].acting = teachers[i].acting.split(",");
            }
        }
        else{
            if (typeof(teachers.acting) === 'object') {
                return teachers
            }
            else {
                teachers.acting.split(",");
            }
        }

        return teachers;
    }
};