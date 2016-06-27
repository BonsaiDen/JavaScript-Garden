## O operador `typeof`

O operador `typeof`(em conjunto com
[`instanceof`](#types.instanceof) é provavelmente a maior falha de design do JavaScript,
por estar **complemente mal implementado**.

Embora `instanceof` ainda tenha seu uso limitado, `typeof` realmente só possui uma utilidade,
a qual **não** acaba por ser a de verificar o tipo de um objeto.

> **Nota:** Enquanto que `typeof` possa também ser invocado com uma sintaxe parecida com a de chamada de função, i.e.
> `typeof(obj)`, não se trata de uma chamada de função. Os parênteses se comportam normalmente
> e o valor retornado será usado como o operando do operador `typeof`.
> **Não** existe a função `typeof`.

### A tabela de tipos em JavaScript

    Value               Class      Type
    -------------------------------------
    "foo"               String     string
    new String("foo")   String     object
    1.2                 Number     number
    new Number(1.2)     Number     object
    true                Boolean    boolean
    new Boolean(true)   Boolean    object
    new Date()          Date       object
    new Error()         Error      object
    [1,2,3]             Array      object
    new Array(1, 2, 3)  Array      object
    new Function("")    Function   function
    /abc/g              RegExp     object (function in Nitro/V8)
    new RegExp("meow")  RegExp     object (function in Nitro/V8)
    {}                  Object     object
    new Object()        Object     object

Na tabela acima, *Type* se refere ao valor de retorno do operador `typeof`.
Como pode ser facilmente observado, este valor não é nada consistente.

O *Class* se refere ao valor interno da propriedade `[[Class]]` de um objeto.

> **Da especificação:** O valor de `[[Class]]` pode ser
> das seguintes strings. `Arguments`, `Array`, `Boolean`, `Date`, `Error`, 
> `Function`, `JSON`, `Math`, `Number`, `Object`, `RegExp`, `String`.

A fim de se obeter o valor de `[[Class]]`, deve-se utilizar o método 
`toString` de `Object.prototype`.

### A classe de um objeto

A especificação fornece exatamente uma maneira de acessar o valor de `[[Class]]`,
com o uso de `Object.prototype.toString`. 

    function is(type, obj) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas === type;
    }
    
    is('String', 'test'); // true
    is('String', new String('test')); // true

No exemplo acima, `Object.prototype.toString` é chamado enquanto que o valor de [this](#function.this)
é definido como o objeto o qual  o valor `[[Class]]` deva ser retornado.

> **Nota ES5:** Por conveniência o retorno do valor de `Object.prototype.toString` 
> para ambos `null` e `undefined` foi **modificado** de `Object` para `Null` e 
> `Undefined` no ECMAScript 5.

### Teste para variáveis não-definidas

    typeof foo !== 'undefined'

O exemplo acima irá verificar se `foo` foi declarado ou não; apenas
o fato de referênciá-lo poderia resultar em `ReferenceError`. Esta é a única utilidade
real de `typeof`.

### Conclusão

A fim de verificar o tipo de um objeto, é fortemente recomendade o uso de 
`Object.prototype.toString` pelo motivo de que esta é a única maneira confiável de ser feita.
Como demonstrado na tabela anterior, alguns valores retornados de `typeof` não estão definidos na
especificação; assim, eles podem variar entre implementações.
O uso de `typeof` deve ser evitado, a menos que não se esteja testando se uma variável está ou não definida.


