## `hasOwnProperty`

Para verificar se uma propriedade está definida no **próprio** objeto e não em outro lugar 
da sua [cadeia prototype](#object.prototype), é necessário utilizar o método
`hasOwnProperty` o qual todos os objetos herdam de `Object.prototype`.

> **Nota:** **Não** é sufuciente verificar se uma propriedade é `undefined`.
> A propriedade pode muito bem existir, porém acontece de seu valor só ser
> `undefined`.

`hasOwnProperty` é a única coisa em JavaScript a qual lida com propriedades e **não** percorre a cadeia prototype.

    // Poluindo Object.prototype
    Object.prototype.bar = 1;
    var foo = {goo: undefined};

    foo.bar; // 1
    'bar' in foo; // true

    foo.hasOwnProperty('bar'); // false
    foo.hasOwnProperty('goo'); // true

Somente `hasOwnProperty` irá retornar o resultado correto e esperado; isto é
essencial quando se interage sobre propriedades de qualquer objeto. **Não** existe
outra maneira de verificar propriedades que não estejam definidas no próprio objeto, mas
em outro lugar na cadeia prototype.

### `hasOwnProperty` como propriedade

JavaScript não protege o nome do propriedade `hasOwnProperty`; assim, se
existe a possibilidade de algum objeto possuir uma propriedade com este mesmo nome,
torna-se necessário utilizar um `hasOwnProperty` **externo** a fim de obter resultados corretos.

    var foo = {
        hasOwnProperty: function() {
            return false;
        },
        bar: 'Here be dragons'
    };

    foo.hasOwnProperty('bar'); // sempre retorna false

    // Utiliza hasOwnProperty de outro objeto e o instancia com 'this' apontado para foo
    ({}).hasOwnProperty.call(foo, 'bar'); // true

    // Também é possível utilizar hasOwnProperty do Object
    // prototype para este fim
    Object.prototype.hasOwnProperty.call(foo, 'bar'); // true


### Conclusão

O método é a **única** maneira confiável `hasOwnProperty` para verificar a existência da propriedade em um objeto.
É recomendado que `hasOwnProperty` seja utilizado em **cada** interação de um [laço `for in`](#object.forinloop)
a fim de evitar erros de extensão do [prototype](#object.prototype).

