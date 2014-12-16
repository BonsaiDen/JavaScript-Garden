## Construtores 

Construtores em JavaScript ainda são diferentes de muitas outras linguagens.
Qualquer chamada a uma função que seja precedida pela palavra-chave `new` age como um cosntrutor.

Dentro do construtor - a função chamada - o valor de `this` se refere ao objeto recém criado.
O [prototype](#object.prototype) deste **novo** objeto é definido como o `prototype` do objeto da função que foi
invocada como construtor.

Se a função chamada não possui um `return` statement explícito, então implicitamente
retornará o valor de `this` - o novo objeto. 

    function Foo() {
        this.bla = 1;
    }

    Foo.prototype.test = function() {
        console.log(this.bla);
    };

    var test = new Foo();

O código acima chama `Foo` como construtor e define o `prototype` do objeto recém criado
como `Foo.prototype`.

No caso de um `return` statement explícito, a função retorna o valor
especificado pelo statement, mas **somente** se o valor de retorno for um `Object`.

    function Bar() {
        return 2;
    }
    new Bar(); // um novo objeto

    function Test() {
        this.value = 2;

        return {
            foo: 1
        };
    }
    new Test(); // o objeto retornado

Quando a palavra-chave `new` é omitida, a função **não** retornará o novo objeto.

    function Foo() {
        this.bla = 1; // esta definida no escopo global do objeto
    }
    Foo(); // undefined

Enquanto que o exemplo acima pareça funcionar em alguns casos,  devido 
a maneira como [`this`](#function.this) funciona em JavaScript, o *objeto global*
será usado como valor do `this`.

### Fábricas

A fim de omitir a palavra-chave `new`, o construtor da função deve retornar um valor explicitamente.

    function Bar() {
        var value = 1;
        return {
            method: function() {
                return value;
            }
        }
    }
    Bar.prototype = {
        foo: function() {}
    };

    new Bar();
    Bar();

Ambas as chamadas a `Bar` retornam a mesma coisa, um objeto recém criado
que tem a propriedade chamada `method`, que é uma [Closure](#function.closures).

Deve-se perceber que a chamada `new Bar()` **não** afeta o prototype do objeto retornado.
Enquanto o prototype é definido no objeto recém criado, `Bar` nunca retornará um novo objeto.

No exemplo acima, não existe diferença funcional entre o uso ou não de `new`.

### Criando novos objetos por fábricas

É recomendado **não** usar `new` pois eventual o esquecimento de seu uso
pode levar à defeitos.

A fim de criar um novo objeto, deve-se utilizar uma fábrica e construir o novo objeto dentro desta fábrica.

    function Foo() {
        var obj = {};
        obj.value = 'blub';

        var private = 2;
        obj.someMethod = function(value) {
            this.value = value;
        }

        obj.getPrivate = function() {
            return private;
        }
        return obj;
    }

Enquanto que o código acima previne defeitos decorrentes do esquecimnto da palavra-chave `new`
e certamente utiliza-se de [private variables](#function.closures) de forma mais fácil, este apresenta algumas desvantagens:

 1. Utiliza mais memória desde que os objetos criados **não** compartilham métodos em um prototype.
 2. A fim de implementar herença, a fábrica precisa copiar todos os métodos de um outro objeto ou colocar o outro objeto no prototype do novo objeto.
 3. Quebrar a cadeia prototype somente por causa de esquecer eventualmente o `new` vai contra o que é proposto pela linguagem.

### Conclusão

Enquanto que a omissão do `new` origine defeitos, **não** é certamente uma razão para
quebrar a estrura prototype como um todo. No final, a melhor solução é sempre a que se adequa às necessidades de cada projeto.
O importante é utilizar de forma **consistente** o modelo de criação de objetos escolhido.

