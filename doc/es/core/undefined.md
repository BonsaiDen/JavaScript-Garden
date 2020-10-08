## `undefined` y `null`

JavaScript tiene dos valores distintos para `nothing`, el más útil de estos dos
es `undefined`.

### El valor `undefined`

`undefined` es un tipo de dato con exactamente el mismo valor: `undefined`.

El lenguaje también define una variable global que tiene el valor de `undefined`.
Esta variable es también llamada `undefined`. Sin embargo, esta variable **no** es una 
constante, ni es una palabra reservada del lenguaje. Esto significa que el *valor* 
puede ser sobreescrito fácilmente.

> **Nota ES5:** `undefined` en ECMAScript 5 **ya no es** *modificable* en modo estricto,
> pero su nombre todavía puede por ejemplo establecer una función con el nombre
> `undefined`.

Algunos ejemplos cuando el valor retorna `undefined`:

 - Acceso a la variable global (sin modificar) `undefined`.
 - Retorna implícitamente las funciones que no posean la sentencia `return`.
 - Sentencia `return` que no retorna nada de forma explícita.
 - Búsquedas de propiedades inexistentes.
 - Párametros de la función que no tienen ningún valor explicíto pasado.
 - Cualquier valor que se establece en `undefined`.

### Manejar los cambios en el valor deChanges `undefined`

Dado que la variable `undefined` sólo tiene una copia del *value* de  
`undefined`, asigna un nuevo valor que **no** cambie el valor del 
*tipo* `undefined`.


Aún con el fin de comparar con el valor de `undefined` es necesario
recuperar el valor de `undefined` primero.

Con el fin de proteger una posible sobreescritura en la variable `undefined`,
una técnica común es agregar un párametro adicional a un 
[wrapper anónimo](#function.scopes), que consiga ningún párametro que se le pase.


    var undefined = 123;
    (function(something, foo, undefined) {
        // undefined en el ámbito local
        // ahora hace referencia al valor

    })('Hello World', 42);

Otra forma de lograrlo un mismo efecto es declarar dentro un
wrapper.

    var undefined = 123;
    (function(something, foo) {
        var undefined;
        ...

    })('Hello World', 42);

La única diferencia, es que está versión es de 4 bytes más que utiliza, y en
caso se comprima y no hay otra declaración de 'var' dentro del
wrapper anónimo.


### Uso de `null`

Mientras que `undefined` en el contexto del lenguaje JavaScript es muy usado
en el sentido tradicional como *null*, el actual `null` (ambos literal y de un tipo)
es más o menos que otro tipo de datos.

Es utilizado en algunos detalles internos de JavaScript (como declarar al final de un
cadena de prototipo estableciendo `Foo.prototype = null`), pero en casi todos los
casos, puede ser reemplazado por `undefined`.

