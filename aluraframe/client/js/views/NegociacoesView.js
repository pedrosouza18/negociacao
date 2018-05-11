class NegociacoesView extends View {

    //Crio o constructor chamando o super da classe pai
    constructor(ele) {
      super(ele);
    }

    //Essa e a funcao que criar o template dinamicamente
    template(lista) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th onclick="negociacaoController.ordena('data')">DATA</th>
                    <th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
                    <th onclick="negociacaoController.ordena('valor')">VALOR</th>
                    <th onclick="negociacaoController.ordena('volume')">VOLUME</th>
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
                <td>${lista.volumeTotal}</td>
            </tfoot>
        </table>`;
    }
}
