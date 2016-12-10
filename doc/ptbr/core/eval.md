## Por que não utilizar `eval`

A função `eval` executará uma string de código JavaScript no escopo local.

    var foo = 1;
    function test() {
        var foo = 2;
        eval('foo = 3');
        return foo;
    }
    test(); // 3
    foo; // 1

Entretanto, `eval` somente é executado no escopo local quando é chamado diretamente
*e* quando o nome da função chamada é `eval`. 

    var foo = 1;
    function test() {
        var foo = 2;
        var bar = eval;
        bar('foo = 3');
        return foo;
    }
    test(); // 2
    foo; // 1

O uso de `eval` deve ser evitado. 99.9% de seu "uso" pode ser alcançado **sem** ele.
    
### `eval` dissimulado

As [funções timeout](#other.timeouts) `setTimeout` e `setInterval` podem ambas receberem uma string
como primeiro argumento. Tais strings **sempre** serão executadas no escopo global uma vez que 
`eval` não é chamado diretamente, naquele caso.

### Problemas de segurança

`eval` também é considerado um problema de segurança, por que executa **qualquer** código dado.
Ele **nunca** deve ser utilizado com strings de origens duvidosas ou desconhecidas.

### Conclusão

`eval` nunca deve ser utilizado. Qualquer código que faça uso de `eval` seve ser questionado
em sua utilidade, performance e segurança. Se algo necessita de `eval` para funcionar, então **não** deve ser utilizado.
Um *design melhor* deve ser utilizado, um que não faça uso de `eval`.

