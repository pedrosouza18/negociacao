// Envolvendo a minha classe e minhas variaveis em uma IIEF para esconder o codigo, fazendo uma clousure
// Atribuindo essa unção a uma variavel e chamado de module parttern
var ConnectionFactory = (() => {
    const stores = ['negociacoes'];
    const version = 11;
    const dbName = 'aluraframe';
    
    var connection = null;

    //Criando essa variavel para guardar uma função
    var close = null;
    
    //Retornando a classe pois eu preciso acessar os metodos dentro dela e passo ela para uma variavel que virou um modulo
    return class ConnectionFactory {
    
        constructor() {
            throw new Error('Não é possível criar instancias de ConnectionFactory');
        }
    
        static getConnection() {
            return new Promise((resolve, reject) => {
                let openRequest = window.indexedDB.open(dbName, version);
    
                openRequest.onupgradeneeded = (e) => {
                    // Crio uma store chamando o metodo
                    ConnectionFactory._createStores(e.target.result);
                }
                
                openRequest.onsuccess = (e) => {
                    //Passando a conexao
                    if(!connection) {
                        connection = e.target.result;
                        //Guardando a função com o contexto de connection em close
                        close = connection.close.bind(connection);
                        // Nesse caso eu estou alterando a função close, isso se cham monkey patch
                        connection.close = function() {
                            throw new Error('Você não pode fechar diretamente a conexão');
                        }
                    }
                    resolve(connection);
                }
                
                openRequest.onerror = (e) => {
                    console.log(e.target.error);
                    reject(e.target.error.name);
                }
            });
        }
        
        static _createStores(connection) {
            //Percorro o meu array de stores
            stores.forEach(store => {
    
                if(connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
                
                connection.createObjectStore(store, { autoIncrement: true });
            });
        }

        static _closeConnection() {
            if(connection) {
                close();
                connection = null;
            }
        }
    }
})();
