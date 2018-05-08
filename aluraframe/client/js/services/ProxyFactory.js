class ProxyFactory {

    //Nessa funcao eu crio um servico que cria uma proxy
    //Passo o objeto que e o target, as props que sao as propriedades que eu quero usar e a acao que eu vou fazer depois
    static create(objeto, props, acao) {
        return new Proxy(objeto, {
            get(target, prop, receiver) {
                if(props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
                    return function() {
                        console.log(`a propriedade "${prop}" foi interceptada`);
                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);
                    }
                }
                
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {
                //Verifico se essa propriedade contem nas propriedades passadas na criação do proxy
                if(props.includes(prop)) {
                    //Aqui preciso alterar o valor da propriedade mensagem
                    target[prop] = value;
                    acao(target);
                }

                return Reflect.set(target, prop, value, receiver);
            }
        });
    }

    // Verifico se e uma função
    static _isFunction(func) {
        return typeof(func) == typeof(Function);
    }
}