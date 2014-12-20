## O laço `for in`

Assim como o operador `in`, o laço `for in` percorre a cadeia prototype quando interage sobre as propriedades de um objeto.

> **Nota:** O laço `for in` **não** interage sobre propriedades que 
> que tenham o atributo `enumerable` configurado como `false`; por exemplo, a propriedade `length` de um array. 
    
    // Poluindo o Object.prototype
    Object.prototype.bar = 1;

    var foo = {moo: 2};
    for(var i in foo) {
        console.log(i); // retorna ambos bar e moo
    }

Uma vez que não é possível alterar o comportamento do laço `for in` por si só, faz-se necessário filtrar as propriedades do objeto durante o ciclo de repetição do laço; isso é feito usando o método [`hasOwnProperty`](#object.hasownproperty) do `Object.prototype`.

> **Nota:** Uma vez que o `for in` percorre toda a cadeia prototype, 
> cada camada a mais na herança do objeto deixa a execução do laço mais lenta.

### Utilizando `hasOwnProperty` como filtro

    // o mesmo foo utilizado anteriormente
    for(var i in foo) {
        if (foo.hasOwnProperty(i)) {
            console.log(i);
        }
    }

Esta é única forma correta de usar. Devido ao uso de `hasOwnProperty`, o exemplo **só** irá retornar `moo`. Quando `hasOwnProperty` é deixado de lado, o código fica propenso a erros nos casos em que o prototype - por exemplo `Object.prototype`- tenha sido estendido.

Um framework largamente utilizado que estende o `Object.prototype` é [Prototype][1].
Quando este framework é utilizado, laços `for in` que não utilizam 
`hasOwnProperty` ficam protegidos contra erros.

### Conclusão

Recomenda-se utilizar `hasOwnProperty` **sempre**. Nunca faça pressuposições sobre o ambiente em que o código está sendo executado, ou se os prototypes nativos foram estendidos ou não.

[1]: http://www.prototypejs.org/

