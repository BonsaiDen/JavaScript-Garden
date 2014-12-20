## Como funciona o `this`

JavaScript tem uma concepção diferente sobre a que a palavra reservada `this` se refere da maioria das outras linguagens de programação. Existem exatamente **cinco** diferentes maneiras as quais os valores de `this` podem ser referenciados na linguagem.

### O escopo Global

    this;

Quando usando `this` no escopo global, ele simplesmente estará apontando para o objeto *global*.


### Chamando uma função

    foo();

Aqui, `this` irá referenciar novamente o objeto *global*.

> **Nota ES5:** No strict mode, global **não existe**.
> neste caso, `this` receberá como valor `undefined`.

### Chamando um método

    test.foo(); 

Neste exemplo, `this` irá referenciar `test`.

### Chamando um construtor

    new foo(); 

Uma chamada de função que é precedida pela palavra chave `new` age como
um [construtor](#function.constructors). Dentro da função, `this` irá se referir
a um objeto *recém criado*.

### Referência explícita do `this`

    function foo(a, b, c) {}
                          
    var bar = {};
    foo.apply(bar, [1, 2, 3]); // array will expand to the below
    foo.call(bar, 1, 2, 3); // results in a = 1, b = 2, c = 3

Quando utiliza-se os métodos `call` ou `apply` de `Function.prototype`, o valor de
`this` dentro da função chamada irá referenciar **explicitamente** o primeiro argumento
correspondente na chamada da função.

Como resultado, no exemplo anterior o *escopo original do método* **não** é aplicado, e `this`
dentro de `foo` irá referenciar `bar`.

> **Nota:** `this` **não** pode ser utilizado para referenciar o objeto dentro de um `Object` lietral.
> Logo `var obj = {me: this}` **não** irá resultar em `me` apontando para 
> `obj`, uma vez que `this` só pode ser referenciado em dos cinco casos aqui apresentados.

### Erros comuns

Embora a maioria destes casos façam sentido,  o primeiro pode ser considerado
como um engano de concepção da linguagem, já que **nunca** se mostrou útil.

    Foo.method = function() {
        function test() {
            // this referencia o objeto global
        }
        test();
    }

Um erro comum é achar que `this` dentro de `test` referencia `Foo`; enquanto que, na realidade
 **não é isto que acontece**.

Com a finalidade de acessar `Foo` de dentro de `test`, é necessário instanciar
uma variável global dentro do método para se referir à `Foo`.

    Foo.method = function() {
        var that = this;
        function test() {
            // Utilize that no lugar de this aqui
        }
        test();
    }

`that` trata-se de uma variável normal, porém é normalmente utilizada para referências externas de `this`.
Quando combinadas com [closures](#function.closures), também podem ser utilizadas para repassar `this` como valor.

### Atribuindo métodos

Outra coisa que **não** funciona em JavaScript é function aliasing, ou seja, 
**atribuir** um método a uma variável.

    var test = someObject.methodTest;
    test();

Devido ao primeiro caso, `test` se comportará como uma chamada de função; como consequencia,
o `this` dentro do método não apontará para `someObject`.

Enquanto que realizar binding do `this` pareça uma idéia ruim, no fundo, é o que faz a
[herança prototypal](#object.prototype) funcionar.

    function Foo() {}
    Foo.prototype.method = function() {};

    function Bar() {}
    Bar.prototype = Foo.prototype;

    new Bar().method();

Quando os métodos da instância de `Bar` são chamados, o `this` faz referência
àquela mesma instância. 


