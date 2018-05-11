class NegociacoesService {

    //cb e uma funcao de callback
    obterNegociacoesDaSemana(cb) {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'negociacoes/semana');

        //Em ajax toda requisicao passa por estados, esse e o metodo que fica escutando a mudança e executa algo
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    // Pego a resposta e tranformo para obj JS
                    //Chamo a funcao passando o primeiro parametro que e a mensagem como null caso tenha sucesso e passo a lista
                    cb(null, JSON.parse(xhr.responseText)
                        //Faço um map criando um novo array de negociacoes
                        .map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
                } else {
                    //Caso de erro eu chamo a funcao passando a mensagem
                    cb('Não foi possível importar as negociações!');
                    console.log(xhr.responseText);
                }
            }
        }

        xhr.send();
    }
}