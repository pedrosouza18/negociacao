class MensagemView extends View {

  //Crio o constructor chamando o super da classe pai
  constructor(ele) {
    super(ele);
  }

  //Metodo para criar o template passando o meu modelo de mensagem
  template(model) {
    return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : `<p></p>`;
  }
}
