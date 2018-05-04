class NegociacaoController {

    constructor() {
        //Guardando o contexto de document na variavel $
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacoes = new ListaNegociacoes();

        //Intancio a claase de view passando o elemento do dom onde ficara a tabela
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));

        //Chamo a funcao para reenderizar a tabela
        this._negociacoesView.update(this._listaNegociacoes);
    }

    adicionaNegociacao(event) {
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._negociacoesView.update(this._listaNegociacoes);
        this._limpaFormulario();

        console.log(this._listaNegociacoes.negociacoes);
    }

    //Metodos com undeline so podem ser acessiveis dentro da classe
    _criaNegociacao() {
        //Tive que transformar a data em um date pois ela vem como string
        //O objeto Date aceita um array de string e tranforma em data
        //Por baixo dos panos ele faz o seguinte ('2016', '11', '12'); ele junta tudo com o metodo join
        //Posso fazer assim new Date(this._inputData.value.split('-'))
        //Os ... são chamados de spread operator, eles desmembram um array
        return new Negociacao(
            DateHelper.textForDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}