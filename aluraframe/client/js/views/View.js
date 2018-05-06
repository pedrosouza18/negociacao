class View {

  //Nesse constructor e passado o elemento do dom onde sera inserida o elemento
  constructor(ele) {
    this._elemento = ele;
  }

  template() {
    throw new Error('O método template precisa sercriado!');
  }

  //Metodo para atualizar o dom
  update(model) {
    this._elemento.innerHTML = this.template(model);
  }
}
