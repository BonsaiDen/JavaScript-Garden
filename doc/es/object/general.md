## Uso de objetos y propiedades

Todo en JavaScript actúa como un objeto, con las dos únicas excepciones de
[`null`](#core.undefined) y [`undefined`](#core.undefined).

    false.toString(); // 'false'
    [1, 2, 3].toString(); // '1,2,3'

    function Foo(){}
    Foo.bar = 1;
    Foo.bar; // 1

Un error muy común es el uso de literales númericos como objetos.
Esto se debe a un error en el parser de JavaScript que intenta analizar la
*notación de puntos* como un literal de punto flotante.

    2.toString(); // lanza SyntaxError

Existe un par de soluciones que pueden utilizarse para hacer que los
literales númericos actúen como objetos.

    2..toString(); // el segundo punto es reconocido correctamente
    2 .toString(); // observe el espacio a la izquierda del punto
    (2).toString(); // el número 2 se evalúa primero

### Objetos como un tipo de datos

Los objetos en JavaScript también pueden ser utilizados como una Tabla Hash o conocido como [*Hashmap*][1] en inglés, consisten
principalmente en nombres de propiedades, y asignándoles valores a éstas.

El uso de un objeto literal - con notación `{}` - puede crear un
objeto plano. Este nuevo objeto [heredado](#object.prototype) desde `Object.prototype`
no posee [propiedades propias](#object.hasownproperty) definidas.

    var foo = {}; // un nuevo objeto vacío

    // un nuevo objeto con la propiedad llamada 'test' con el valor 12
    var bar = {test: 12};

### Acceso a las propiedades

Se puede acceder a las propiedades de un objeto de dos maneras, ya sea a través de la
notación de punto o desde la notación de corchetes.

    var foo = {name: 'kitten'}
    foo.name; // kitten
    foo['name']; // kitten

    var get = 'name';
    foo[get]; // kitten

    foo.1234; // SyntaxError
    foo['1234']; // ¡funciona!

Ambas notaciones son idénticas en su funcionamiento, la única diferencia es la
notación de corchetes permite el ajuste dinámico de las propiedades, así como
el uso de propiedades que de otro modo daría lugar a error de sintaxis.

### Eliminando propiedades

La única manera de eliminar una propiedad desde un objeto es usando el
operador `delete`; establecer la propiedad a `undefined` o `null` solamente
elimina el *valor* asociado a la propiedad, pero no la *key* (valor clave).

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

Los resultados de la salida son `bar undefined` y `foo null` - sólo `baz` ha
sido removido y por lo tanto no aparece en la salida.

### Notación de Keys

    var test = {
        'case': 'Soy una palabra clave y debo ser anotado como string',
        delete: 'Soy una palabra clave también' // lanza SyntaxError
    };

Las propiedades de los objetos puede ser simbolizados como caracteres planos y como *strings*. Debido
a otro mal diseño del parser de JavaScript, lo anterior es una excepción
de `SyntaxError` antes de ECMAScript 5.

Este error se produce porque `delete` es una *keyword*; por lo tanto, debe ser
anotado como un *string literal* para asegurarse que será interpretado correctamente
por diversos motores de JavaScript.

[1]: http://en.wikipedia.org/wiki/Hashmap

