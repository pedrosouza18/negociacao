class ListaNegociacoes {

    constructor() {
        this._listaNegociacoes = [];
    }

    adiciona(negociacao) {
        this._listaNegociacoes.push(negociacao);
    }

    get negociacoes() {
        //Nesse caso para blindar a minha lista, eu retorno um array vazio concatenando com a minha lista real
        return [].concat(this._listaNegociacoes);
    }

    esvazia() {
        this._listaNegociacoes = [];
    }

    get volumeTotal() {
        return this._listaNegociacoes.reduce((prev, item) => {
            return prev + item.volume;
        }, 0)
    }
}