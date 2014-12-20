## O operador `instanceof`

O operador `instanceof` compara os construtores de seus dois operandos.
Ele é útil somente quando estamos comparando objetos personalizados. Quando utilizado em tipos nativos,
ele é tão inútil quanto [o operador typeof](#types.typeof).

### Comparando objetos personalizados

    function Foo() {}
    function Bar() {}
    Bar.prototype = new Foo();

    new Bar() instanceof Bar; // true
    new Bar() instanceof Foo; // true

    // Isto somente define Bar.prototype ao objeto de função Foo,
    // mas não à instância atual de Foo
    Bar.prototype = Foo;
    new Bar() instanceof Foo; // false

### Utilizando `instanceof` com tipos nativos

    new String('foo') instanceof String; // true
    new String('foo') instanceof Object; // true

    'foo' instanceof String; // false
    'foo' instanceof Object; // false

Uma coisa importante para perceber aqui é que `instanceof` não funciona em objetos
originados de diferentes contextos de JavaScript (isto é, de diferentes documentos em um
navegador web), uma vez que seus construtores não irão representar exatamente o mesmo objeto.

### Conclusão

O operador `instanceof` deve **somente** ser utilizado quando estive lidando
com objetos customizados originados de um mesmo contexto JavaScript. Bem como o operador
[`typeof`](#types.typeof), qualquer outro uso de `instanceof` deve ser **evitado**.

