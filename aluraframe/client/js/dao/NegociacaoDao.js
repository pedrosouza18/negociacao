class NegociacaoDao {

    constructor(connection) {
        // A claase guarda a conexão que vai receber no construtor
        this._connection = connection;

        // O atributo store guarda tambem a tabela de negociacoes
        this._store = 'negociacoes';
    }

    //Nesse metodo ele retorna uma promise criando uma transação e recebe uma negociacao
    adiciona(negociacao) {
        return new Promise((resolve, reject) => {

            //Criando uma transação
            let request = this._connection
                .transaction([this._store],'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = (e) => {
                resolve();
            };

            request.onerror = (e) => {
                console.log(e.target.error);
                resolve('Não foi possível gravar a negociação!');
            };
        });
    }

    listaTodos() {
        return new Promise((resolve, reject) => {

            //Eu preciso obter um cursor para os meus registros
            let cursor = this._connection
                .transaction([this._store],'readwrite')
                .objectStore(this._store)
                .openCursor()

            let negociacoes = [];

            cursor.onsuccess = (e) => {

                //Recebe um ponteiro para a negociacao
                let atual = e.target.result;

                //Verifica se existe negociacao
                if(atual) {
                    //Guarda o valor dela
                    let dado = atual.value;

                    //Passo para o array uma negociacao, pois no banco ela e um JSON
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));

                    //Passa para a próxima negociacao
                    atual.continue();
                } else {    
                    //Se atual for nulo, mostra a lista
                    resolve(negociacoes);
                }
            }

            cursor.onerror = (e) => {
                console.log(e.target.error);
                reject('Não foi possível listar as negociações');
            }
        });
    }

    apagarTodas() {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store],'readwrite')
                .objectStore(this._store)
                .clear()

            request.onsuccess = (e) => {
                resolve('Negociações apagadas com sucesso!');
            };

            request.onerror = (e) => {
                console.log(e.target.error);
                reject('Não foipossível remover as negociações!');
            }
        });
    }
}