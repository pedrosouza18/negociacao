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

    enviarNegociacao(negociacao) {
        return new Promise((resolve, reject) => {

            this._http.post('/negociacoes', negociacao)
                .then(negociacoes => {
                    resolve(negociacao);
                })
                .catch(error => reject('Não foi possível enviar a negociação!'));
        });
    }

    cadastra(negociacao) {
        // Crio uma conexão com o indexedDb
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() =>'Negociação adicionada com sucesso!')
            .catch(() => {
                 throw new Error('Negociação adicionada com sucesso!');
            });
    }

    lista() {
        return ConnectionFactory
            .getConnection()
            // Nesse then retorn um dao
            .then(connection => new NegociacaoDao(connection))
            // Nesse chama o listaTodos do dao
            .then(dao => dao.listaTodos())
            .catch(() => {
                throw new Error('Não foi possível obter negociações');
            });
    }

    apaga() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagarTodas())
            .then(() => 'Negociações apagadas com sucesso')
            .catch((error) => {
                throw new Error('Não foi possível apagar as negociações');
            });
    }

    importa(listaAtual) {
        return this.obterNegociacoes()
            .then(negociacoes => {
                // Tive que usar some pois o filter so aceita valores booleanos
                return negociacoes.filter(negociacao => {
                    // Metodo some recebe uma condição e retorna true ou false
                    // Ele percorre o array e ver se tal condição esta como true, se estiver ele para na hora
                    return !listaAtual.some(negociacaoExistente => {
                        // Se consegue comparar objetos os transformando em string, com o JSON.stringfy
                        return negociacao.isEquals(negociacaoExistente);
                    })
                })
            })
            .catch(error => {
                console.log(error);
                throw new Error('Não foi possível buscar negociações');
            });
            
    }
}