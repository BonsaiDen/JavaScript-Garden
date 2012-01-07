## `hasOwnProperty`

Con el fin de comprobar si un objeto posee una propiedad definida *en sí* mismo y **no**
en algún lugar de su [cadena de prototipo](#object.prototype), es necesario utilizar
el método `hasOwnProperty` ya que todos los objetos herendan de `Object.prototype`.

> **Nota:** **No** es suficiente con comprobar si una propiedad está `definida`.
> La propiedad bien podría existir, pero su valor sólo pasa a ser definido como 
> `undefined`.

`hasOwnProperty` es la única utilidad en JavaScript que se ocupa de las propiedades
y **no** las salta en la cadena de prototipo.

    // Envenenamiento en Object.prototype
    Object.prototype.bar = 1; 
    var foo = {goo: undefined};
    
    foo.bar; // 1
    'bar' in foo; // true

    foo.hasOwnProperty('bar'); // false
    foo.hasOwnProperty('goo'); // true

Sólo `hasOwnProperty` retornará el resultado correcto y esperado, esto es
ensencial cuando se repite una iteración en las propiedades de cualquier objeto. No hay
otra maner de excluir las propiedades que no están definidas en el mismo objeto, pero 
en alguna parte de su cadena de prototipo si.

### `hasOwnProperty` como propiedad

JavaScript **no** protege el nombre de la propiedad `hasOwnProperty`; de este modo, si existe
la posibilidad de que un objeto tenga una propiedad con el mismo nombre, es necesario utilizar
`hasOwnProperty` como propiedad *externa* con el fin de obtener resultados correctos.

    var foo = {
        hasOwnProperty: function() {
            return false;
        },
        bar: 'Here be dragons'
    };

    foo.hasOwnProperty('bar'); // siempre devolverá false

    // Utilice otro objeto con hasOwnProperty y llamelo con 'this' para asignarlo a foo
    ({}).hasOwnProperty.call(foo, 'bar'); // true

### En conclusión

Cuando se necesite comprobar la existencia de una propiedad en un objeto, `hasOwnProperty` es
el **único** método para hacerlo. También se recomienda el uso de `hasOwnProperty` como
parte de un [bucle `for in`](#object.forinloop), esto evitará errores desde
extenciones de [prototipos](#object.prototype) nativos.

