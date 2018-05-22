class NegociacaoController {

    constructor() {
        //Guardando o contexto de document na variavel $
        let $ = document.querySelector.bind(document);

        this._ordemAtual = '';

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        //Guardando o this dessa classe
        //let self = this;
        //Criando uma instancia de Bind que recebe uma proxy pelo constructor
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');
       
        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
        
        this._service = new NegociacoesService();
        // Coloquei os metodos que não tem a ver com os atributor no init
        this._init();
    }
    
    _init() {

        this._service
            .lista()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            })
            .catch(error => this._mensagem.texto = error);
    
        setInterval(() => {
            this.importarNegociacoes();
        }, 3000);
    }

    adicionaNegociacao(event) {
        event.preventDefault();

        this._service
            .cadastra(this._criaNegociacao())
            .then(mensagem => {
                this._listaNegociacoes.adiciona(this._criaNegociacao());
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            })
            .catch(error => this._mensagem.texto = error);

        // let newNegociacao = this._criaNegociacao();
        // let negociacao = {
        //     data: newNegociacao._data,
        //     quantidade: newNegociacao._quantidade,
        //     valor: newNegociacao._valor
        // }

        // let service = new NegociacoesService();
        // service.enviarNegociacao(negociacao)
        //     .then(data => console.log('foi'))
    }


    importarNegociacoes() {
        this._service
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações importadas com sucesso!';
            })
            .catch(error => this._mensagem.texto = error);
    }

    apagar() {
        this._service
            .apaga()
            .then(mensagem => {
                this._listaNegociacoes.esvazia();
                this._mensagem.texto = mensagem;
            })
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
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

    //Metodo que recebe a coluna e ordena
    ordena(coluna) {
        //Se a coluna for igual a ordem atual, inverter a ordem
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        //Guardo a coluna selecionada
        this._ordemAtual = coluna;
    }
}
