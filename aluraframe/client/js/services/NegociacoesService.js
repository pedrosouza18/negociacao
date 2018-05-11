class NegociacoesService {

    constructor() {
        this._http = new HttpService();
    }

    //Criei varios metodos que retornam uma promise
    obterNegociacoesDaSemana() {

        return new Promise((resolve, reject) => {

            this._http.get('negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
                })
                .catch(error => reject('Não foi possível importar as negociações!'));
        });
    }

    obterNegociacoesDaSemanaAnterior() {

        return new Promise((resolve, reject) => {

            this._http.get('negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
                })
                .catch(error => reject('Não foi possível importar as negociações da semana anterior!'));
        });
    }

    obterNegociacoesDaSemanaRetrasada() {

        return new Promise((resolve, reject) => {

            this._http.get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
                })
                .catch(error => reject('Não foi possível importar as negociações da semana retrasada!'));
        });
    }

    //Nesse metodo se obtem todas as promises
    obterNegociacoes() {
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ])
        .then(periodos => {
            return periodos.reduce((arrPrev, arr) => arrPrev.concat(arr), []);
        })
        .catch(error => {throw new Error(error)});
    }
}