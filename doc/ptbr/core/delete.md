## O operador `delete`

Em resumo, é *impossível* remover variáveis globais, funções e outras coisas em JavaScript
que tenham o atributo `DontDelete` definido.

### Código global e código de função

Quando uma variável ou função é definida no escopo global ou em 
um [escopo de função](#function.scopes) ela passa a ser uma propriedade de ambos
objeto Activation e do objeto Global. Tais propriedades possuem um conjunto de atributos, um dos quais é o `DontDelete`.
Declarações de funções e variáveis em código global e em código de função
sempre criam propriedades com `DontDelete`, e portanto não podem ser removidas.

    // variável global:
    var a = 1; // DontDelete está definido
    delete a; // false
    a; // 1

    // função comum:
    function f() {} // DontDelete está definido
    delete f; // false
    typeof f; // "function"

    // mudar o valor do atributo não ajuda:
    f = 1;
    delete f; // false
    f; // 1

### Propriedades explícitas

Propriedades definidas explicitamente podem ser apagadas normalmente.

    // definição explícita de propriedade:
    var obj = {x: 1};
    obj.y = 2;
    delete obj.x; // true
    delete obj.y; // true
    obj.x; // undefined
    obj.y; // undefined

No exemplo acima, `obj.x` e `obj.y` podem ser removidos por que eles não possuem o
atributo `DontDelete`. Este é o motivo pelo qual o exemplo abaixo também funciona.

    // Desconsiderando o IE, isto funciona bem:
    var GLOBAL_OBJECT = this;
    GLOBAL_OBJECT.a = 1;
    a === GLOBAL_OBJECT.a; // true - apenas uma variável global
    delete GLOBAL_OBJECT.a; // true
    GLOBAL_OBJECT.a; // undefined

Aqui nós utilizamos um truque para remover `a`. Aqui o [`this`](#function.this)
faz referência ao objeto Global e declara explicitamente a variável `a` como
sua propriedade a qual nos permite removê-la.

O IE (pelo menos 6-8) possui defeitos, então o código acima não funciona.

### Argumentos de função e propriedades nativas

Argumentos de função, [objetos `arguments`](#function.arguments) e 
propriedades nativas tambêm possuem o `DontDelete` definido.

    // argumentos de funções e propriedades:
    (function (x) {
    
      delete arguments; // false
      typeof arguments; // "object"
      
      delete x; // false
      x; // 1
      
      function f(){}
      delete f.length; // false
      typeof f.length; // "number"
      
    })(1);

### Objetos hosts
    
O comportamento do operador `delete` pode ser imprevisível para objetos hosts.
Devido a especificação, objetos hosts têm permissão para implementar qualquer tipo de comportamento.

### Conclusão

O operador `delete` freqüentemente apresenta um comportamento inesperado e só
pode ser usado com segurança para remover propriedades definidas explicitamente em objetos normais.
