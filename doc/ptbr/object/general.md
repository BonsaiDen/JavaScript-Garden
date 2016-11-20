## Propriedades e manipulação de objetos

Tudo em JavaScript se comporta como um objeto, com apenas duas exceções que são 
[`null`](#core.undefined) e [`undefined`](#core.undefined).

    false.toString(); // 'false'
    [1, 2, 3].toString(); // '1,2,3'
    
    function Foo(){}
    Foo.bar = 1;
    Foo.bar; // 1

Um equívoco muito comum é a idéia de que números não podem ser manipulados como objetos. O parser do JavaScript analisa a *notação de ponto* como ponto flutuante de um número.

    2.toString(); // raises SyntaxError

Existem três soluções para contornar este problema e permtir que números se comportem como objetos.

    2..toString(); // o segundo ponto é reconhecido corretamente
    2 .toString(); // perceba o espaço deixado à esquerda do ponto
    (2).toString(); // 2 é interpretado primeiro

### Objetos como tipo de dados

Em JavaScript, Objetos podem também ser utilizados como [*Hashmaps*][1]; eles consistem principalmente de propriedades nomeadas, que apontam para valores.

Usando um objeto literal  - notação do tipo `{}`- é possível criar um objeto simples. Este novo objeto [herda](#object.prototype) de `Object.prototype` e não possui [propriedades próprias](#object.hasownproperty) definidas.

    var foo = {}; // um novo objeto vazio

    // um novo objeto com uma propriedade 'test' populada com o valor 12
    var bar = {test: 12}; 

### Acessando propriedades

As propriedades de um objeto podem ser acessadas de duas maneiras, através da notação de ponto ou da notação de colchete.
    
    var foo = {name: 'kitten'}
    foo.name; // kitten
    foo['name']; // kitten
    
    var get = 'name';
    foo[get]; // kitten
    
    foo.1234; // Erro de sintaxe
    foo['1234']; // funciona

Ambas as notações trabalham de forma quase idêntica, com a única diferença de que o colchete permite configuração dinâmica de propriedades e uso de propriedades nomeadas que de outra maneira levaria à erros de sintaxe.

### Removendo propriedades

A única maneira de remover uma propriedade de um objeto é através do operador `delete`; definir uma propriedade como `undefined` ou `null` somente apaga o valor associado com tal propriedade, mas não remove a *key*.

    var obj = {
        bar: 1,
        foo: 2,
        baz: 3
    };
    obj.bar = undefined;
    obj.foo = null;
    delete obj.baz;

    for(var i in obj) {
        if (obj.hasOwnProperty(i)) {
            console.log(i, '' + obj[i]);
        }
    }

O código acima retorna tanto `bar undefined` quanto`foo null` - somente `baz` foi removido e, portanto, não saiu no output.

### Notações de Keys

    var test = {
        'case': 'I am a keyword, so I must be notated as a string',
        delete: 'I am a keyword, so me too' // dispara SyntaxError
    };

Propriedades de objetos podem ser tanto representadas como caracteres simples bem como strings. Devido a outro engano do parser do JavaScript, o exemplo acima irá retornar `SyntaxError` remetendo ao ECMAScript 5.

Este erro decorre do fato de que 'apagar' é uma *palavra reservada*; por consequencia, deve ser representada como uma *string literal* a fim de garantir a interpretação correta pelas antigas engines de JavaScript.

[1]: http://en.wikipedia.org/wiki/Hashmap

