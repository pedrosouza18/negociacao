class HttpService {

    get(url) {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
    
            xhr.open('GET', url);
    
            //Em ajax toda requisicao passa por estados, esse e o metodo que fica escutando a mudança e executa algo
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        // Pego a resposta e tranformo para obj JS
                        resolve(JSON.parse(xhr.responseText));
                            //Faço um map criando um novo array de negociacoes
                    } else {
                        reject(xhr.responseText);
                        console.log(xhr.responseText);
                    }
                }
            }
            xhr.send();
        });
    }

    post(url, dado) {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.responseText));
                    } else {

                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send(JSON.stringify(dado)); // usando JSON.stringify para converter objeto em uma string no formato JSON.
        });

    }
}