class DateHelper {

    constructor() {
        throw new Error('DateHelper não pode ser instanciada');
    }

    static dateForText(data) {
        return `${data.getDate()}/${(data.getMonth() + 1)}/${data.getFullYear()}`;
    }

    static textForDate(text) {
        //Expressao regular para data, \d e que so aceita numeros
        if(!/\d{2}\/\d{2}\/\d{4}/.test(text)) throw new Error('Deve estar no formato dd/mm/aaaa');
        
        //Usando o rever porque ele espera ano, mes e dia e não dia, mes e ano
        return new Date(...text.split('/').reverse().map((item, idx) => item - idx % 2));
    }
}