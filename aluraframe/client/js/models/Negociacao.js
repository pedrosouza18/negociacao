class Negociacao {

  constructor(data, quantidade, valor){
    //undeline e uma convensao dizendo que a propriedade e privada
    this._data = new Date(data.getTime());
    this._quantidade = quantidade;
    this._valor = valor;

    //Estou congelando esse objeto para ele se tornar imutavel
    //Quando eu passo o this ele congela a instancia
    //O metodo freeze, so congela o objeto principal, se ele tem variaveis que sao outros objetos ele não congela
    Object.freeze(this);
  }

  //Usando o metodo get, por baixo dos panos ele criar um metodo
  get volume() {
    return this.quantidade * this.valor;
  }

  get data() {
    //Estou retornando uma nova data passando a referencia da data que foi passada
    //Neste caso a pessoa não consegue usar os metodos da data.
    //No caso eu estou criando uma copia da data
    return new Date(this._data.getTime());
  }

  get quantidade() {
    return this._quantidade;
  }

  get valor() {
    return this._valor;
  }

  isEquals(outraNegociacao) {
    return JSON.stringify(this) == JSON.stringify(outraNegociacao);
  }
}
