## O objeto `arguments`

Todo escopo de uma função em JavaScript tem acesso à variável especial `arguments`.
Esta variável armazena uma lista de todos os argumentos que foram passados para a função.

> **Nota:** No caso em que `arguments` tenha sido definido dentro do escopo da função por meio 
> de `var` statement ou que este seja o nome de um parâmetro formal, o objeto `arguments` não será criado.

O objeto `arguments` **não** é um `Array`. Enquanto que ele possui uma semântica
parecida com a de um array - a saber a propriedade `length` - ele não herda de `Array.prototype`
e é de fato um `Object`.

Devido a isto, **não** é possível usar os métodos padrões de array como `push`,
`pop` ou `slice` no `arguments`. Enquanto que a iteração com um simples `for` loop funciona bem,
é necessário convertê-lo para um `Array` a fim de usar os métodos padrões de `Array`.

### Convertendo em um Array

O código abaixo irá retornar um novo `Array` contendo todos os elementos do
objeto  `arguments`.

    Array.prototype.slice.call(arguments);

Por este tipo de conversão ser **lenta**, seu uso em porções de código que apresentam performance crítica **não é recomendado**.

### Passando argumentos

O código abaixo é a maneira recomendada de se passar argumentos de uma função para outra.

    function foo() {
        bar.apply(null, arguments);
    }
    function bar(a, b, c) {
        // do stuff here
    }

Outro truque é o de usar ambos `call` e `apply` juntos para criar wrappers.

    function Foo() {}

    Foo.prototype.method = function(a, b, c) {
        console.log(this, a, b, c);
    };

    // Create an unbound version of "method" 
    // It takes the parameters: this, arg1, arg2...argN
    Foo.method = function() {

        // Result: Foo.prototype.method.call(this, arg1, arg2... argN)
        Function.call.apply(Foo.prototype.method, arguments);
    };


### Parâmetros formais Formal Parameters and Arguments Indices

O objeto `arguments` cria funções *getter* e *setter* para suas propriedades,
bem como os parâmetros formais da função.

Como resultado, alterando o valor de um parâmetro formal também mudará o valor
da propriedade correspondente no objeto `arguments`, e vice versa.

    function foo(a, b, c) {
        arguments[0] = 2;
        a; // 2

        b = 4;
        arguments[1]; // 4

        var d = c;
        d = 9;
        c; // 3
    }
    foo(1, 2, 3);

### Mitos e verdades sobre performance

A única vez em que o objeto `arguments` não é criado é quando é declarado como um nome dentro de uma função 
ou declarado como um de seus parâmetros formais. Não importa se ele é usado ou não.

Ambos *getters* e *setters* são *sempre* criados; desta maneira, usá-los não causa impacto
de performance, especialmente não em código do mundo real, onde existe mais de um simples
acesso às  propriedades do objeto `arguments`.

> **Nota ES5:** Estes *getters* e *setters* não são criados no strict mode.

Entretando, existe um caso em que a performance é drasticamente reduzida
em engines modernas de JavaScript. Este caso é o uso de `arguments.callee`

    function foo() {
        arguments.callee; // Faça alguma coisa com os objeto deta função
        arguments.callee.caller; // e o calling do objeto da função
    }

    function bigLoop() {
        for(var i = 0; i < 100000; i++) {
            foo(); // Would normally be inlined...
        }
    }
 
Isto não somente acaba com possíveis ganhos de performance que resultariam de inlining,
mas também quebram o encapsulamento pois a função agora depende de uma chamada específica de contexto.

O uso de `arguments.callee` é **fortemente desencorajado**.

> **Nota ES5:** No strict mode, `arguments.callee` lança `TypeError` uma vez que 
> se tornou obsoleto.

[1]: http://en.wikipedia.org/wiki/Inlining


