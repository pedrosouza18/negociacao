class DateHelper {

    constructor() {
        throw new Error('DateHelper não pode ser instanciada');
    }

    static dateForText(data) {
        return `${data.getDate()}/${(data.getMonth() + 1)}/${data.getFullYear()}`;
    }

    static textForDate(text) {
        //Expressao regular para data, \d e que so aceita numeros
        if(!/^\d{4}-\d{2}-\d{2}$/.test(text)) throw new Error('A data deve estar no formato yyyy-MM-dd!');
        
        return new Date(...text.split('-').map((item, idx) => item - idx % 2));
    }
}