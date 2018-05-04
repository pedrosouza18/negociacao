class NegociacoesView {

    //Nesse constructor e passado o elemento do dom onde sera inserida a tabela
    constructor(elemento) {
        this._elemento = elemento;
    }

    //Essa e a funcao que criar o template dinamicamente
    _template(lista) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>

            <tbody>
                ${
                    lista.negociacoes.map(item => {
                        return `
                            <tr>
                                <td>${DateHelper.dateForText(item.data)}</td>
                                <td>${item.quantidade}</td>
                                <td>${item.valor}</td>
                                <td>${item.volume}</td>
                            </tr>
                        `;
                    })
                }
            </tbody>

            <tfoot>
                <td colspan="3" style="text-align: right;">Total:</td>
                <td>${lista.negociacoes.reduce((prev, item) => {
                    return prev + item.volume;
                }, 0)}</td>
            </tfoot>
        </table>
        `;
    }

    //Funcao para reenderizar o template no html
    update(lista) {
        this._elemento.innerHTML = this._template(lista);
    }
}