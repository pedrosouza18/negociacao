class Bind {

    //Uso o rest operator para pegar os parametros a partir de view
    constructor(model, view, ...props) {

        view.update(model);

        return ProxyFactory.create(model, props, (model) => {
            view.update(model);
        });
    }
}