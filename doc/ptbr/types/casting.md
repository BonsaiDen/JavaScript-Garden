## Conversão de tipos

JavaScript é *fracamente tipado*, logo ele aplica a *coerção de tipos*
**sempre** que possível.

    // Estes retornam true
    new Number(10) == 10; // Number.toString() é convertido
                          // de volta a um número

    10 == '10';           // Strings são convertidas em Number
    10 == '+10 ';         // Mais loucuras com strings
    10 == '010';          // E mais 
    isNaN(null) == false; // null é convertido em 0
                          // que claro não é NaN
    
    // Estes retornam false
    10 == 010;
    10 == '-10';

> **Nota ES5:** Literais Number que começam com um `0` são interpretados como octais
> (Base 8). Suporte à octais para estes literais foi **removido** no modo estrito do ECMAScript.

A fim de evitar os problemas acima, o uso do [operador de igualdade estrito](#types.equality) 
é **fortemente** recomendado. Embora ele evite uma série de problemas comuns,
existem ainda muitas outras questões que surgem do fraco sistema de tipagem do JavaScript.

### Construtores de tipos nativos

Os construtores de tipos nativos como `Number` e `String` comportam-se
diferentemente quando utilizados com ou sem a palavra-chave `new`.

    new Number(10) === 10;     // False, Object e Number
    Number(10) === 10;         // True, Number e Number
    new Number(10) + 0 === 10; // True, devido à conversão implícita

Utilizar um tipo nativo como `Number` como construtor iré criar um novo objeto `Number`,
porém omitir a palavra-chave `new` fará com que a função `Number` se comporte como
um conversor.

Além, passando valores literais ou não-objetos irá resultar em mais coerções
de tipos.

A melhor opção é converter para um dos três possíveis tipos **de forma explícita**.

### Convertendo para String

    '' + 10 === '10'; // true

Prefixando uma string vazia, qualquer valor pode ser facilmente convertido em uma string.

### Convertendo para Number

    +'10' === 10; // true

Ao utilizar o operador de soma **unário**, é possível converter um valor para Number.

### Convertendo para Boolean

Ao utilizar duas vezes o operador **not**, é possível converter um valor para Boolean.

    !!'foo';   // true
    !!'';      // false
    !!'0';     // true
    !!'1';     // true
    !!'-1'     // true
    !!{};      // true
    !!true;    // true