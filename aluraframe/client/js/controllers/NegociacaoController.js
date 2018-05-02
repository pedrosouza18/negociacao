class NegociacaoController {

    constructor() {
        //Guardando o contexto de document na variavel $
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
    }

    adicionaNegociacao(event) {
        event.preventDefault();
        
        //Tive que transformar a data em um date pois ela vem como string
        //O objeto Date aceita um array de string e tranforma em data
        //Por baixo dos panos ele faz o seguinte ('2016', '11', '12'); ele junta tudo com o metodo join
        //Posso fazer assim new Date(this._inputData.value.split('-'))
        //Os ... são chamados de spread operator, eles desmembram um array
        let negociacao = new Negociacao(
            new Date(...this._inputData.value
                .split('-')
                .map((item, idx) => item - idx % 2)
            ),
            this._inputQuantidade.value,
            this._inputValor.value
        );

        console.log(negociacao);
        
    }
}