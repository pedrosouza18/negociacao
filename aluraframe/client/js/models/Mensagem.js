class Mensagem {

  constructor(msg = '') {
    this._texto = msg;
  }

  get texto() {
    return this._texto;
  }

  set texto(texto) {
    this._texto = texto;
  }
}
