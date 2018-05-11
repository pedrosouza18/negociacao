class NegociacaoController {

    constructor() {
        //Guardando o contexto de document na variavel $
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        //Guardando o this dessa classe
        //let self = this;
        //Criando uma instancia de Bind que recebe uma proxy pelo constructor
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia');
       
        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
    }

    adicionaNegociacao(event) {
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        //Usando o metodo set para alterar a mensagem
        this._mensagem.texto = 'Negociação adicionada com sucesso!';
        this._limpaFormulario();
    }

    importarNegociacoes() {
        let service = new NegociacoesService();

        //Instancio o service e chamo a funcao passando noutra funcao como parametro de callback
        //Um e o erro e o outro a lista
        service.obterNegociacoesDaSemana((error, negociacoes) => {

            //Pelo principio de erro first, primeiro trata o erro e depois o sucesso
            if(error) {
                this._mensagem.texto = error;
                //return para não executar mais nada
                return;
            }

            //Percorro esse novo array e uso a funcao de adicionar
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações importadas com sucesso!';
        })
    }

    apagar() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso!';
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
