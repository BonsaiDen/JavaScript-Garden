## `undefined` e `null`

JavaScript tem duas formas distintas para representar o nada, `null` e `undefined`, com
o último sendo o mais útil.

### O valor `undefined`

`undefined` é um tipo com um valor exato : `undefined`.

A linguagem também define uma variável global que tem como valor `undefined`;
esta variável também é chamada `undefined`. Entretanto tal variável *não é nem* uma constante
*muito menos* uma palavra-chave da linguagem. Isto significa que seu *valor* pode ser facilmente
sobrescrito.

> **Nota ES5:** `undefined` em ECMAScript 5 **não dispõe** mais de permissão para escrita no modo estrito, porém
> sua denominação ainda pode ser confundida com, por exemplo, uma função com o nome `undefined`.

Aqui estão alguns exemplos de quando o valor `undefined` é retornado:

 - Acessando uma variável global (não-modificada) `undefined`.
 - Acessando uma variável declarada *mas não* ainda inicializada.
 - Retornos implícitos de funções devido ao esquecimento do `return` statement.
 - `return` statements  que explicimente retornam o nada.
 - Busca por propriedades não-existentes.
 - Parâmetros de funções que não têm um valor explícito definido.
 - Qualquer coisa que tenha sido definida como `undefined`.
 - Qualquer expressão no formato `void(expressão)`

### Manipulando mudanças no valor de `undefined`

Uma que a variável global `undefined` apenas mantém uma cópia do valor *atual* de `undefined`, atribuir-lhe
um novo valor **não** muda o valor do tipo `undefined`.

Ainda, a fim de comparar alguma coisa com o valor de `undefined`, é ncessário que
primeiro se retorne o `undefined`.

A fim de proteger o código contra uma possível sobrescrtia da variável `undefined`, uma
técnica comum utilizada é a de adicionar um parâmetro adicional em um [wrapper anônimo](#function.scopes)
 que não recebe argumentos.

    var undefined = 123;
    (function(something, foo, undefined) {
        // undefined no escopo local agora 
        // refer-se ao valor `undefined`

    })('Hello World', 42);

Outra maneira de atingir o mesmo efeito seria utilizar uma declaração dentro do wrapper.

    var undefined = 123;
    (function(something, foo) {
        var undefined;
        ...

    })('Hello World', 42);

A única diferença aqui é a que a última versão resulta na redução de 4 bytes, e nã existe
outro `var` statement dentro do wrapper anônimo.

### Usos do `null`

Enquanto que `undefined` no contexto da linguagem JavaScript é normalmente utilizado
como um *null*, o atual `null` (ambos o tipo e o literal)  é mais ou menos um outro tipo de dado.

Ele é utilizado internamente pelo JavaScript (como na declaração no fim da cadeia prototype
ao definir `Foo.prototype = null`), porém na maioria dos casos, pode ser substituido por `undefined`.


