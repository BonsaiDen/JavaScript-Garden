## `undefined` y `null`

JavaScript tiene dos valores distintos para `nothing`, el más útil de estos dos
es `undefined`.

### El valor `undefined`

`undefined` es un tipo de dato con exactamente el mismo valor: `undefined`.

El lenguaje también define una variable global que tiene el valor de `undefined`,
Esta variable es también llamada `undefined`. Sin embargo, esta variable **no** es una 
constante, ni es una palabra reservada del lenguaje. Esto significa que el *valor* 
puede ser sobreescrito fácilmente.

> **Nota ES5:** `undefined` en ECMAScript 5 **ya no es** *modificable* en modo esstricto,
> pero su nombre todavía puede por ejemplo establecer una función con el nombre
> `undefined`.

Algunos ejemplos de cuando el valor retorna `undefined`:

 - Acceso a la variable global (sin modificar) `undefined`.
 - Retorna implícitamente las funciones que no posean la sentencia `return`.
 - `return` statements which do not explicitly return anything.
 - Lookups of non-existent properties.
 - Function parameters which do not had any explicit value passed.
 - Anything that has been set to the value of `undefined`.

### Handling Changes to the Value of `undefined`

Since the global variable `undefined` only holds a copy of the actual *value* of 
`undefined`, assigning a new value to it does **not** change the value of the 
*type* `undefined`.

Still, in order to compare something against the value of `undefined` it is
necessary to retrieve the value of `undefined` first.

In order to protect code against a possible overwritten `undefined` variable, a 
common technique used is to add an additional parameter to an
[anonymous wrapper](#function.scopes), that gets no argument passed to it.

    var undefined = 123;
    (function(something, foo, undefined) {
        // undefined in the local scope does 
        // now again refer to the value

    })('Hello World', 42);

Another way to achieve the same effect would be to use a declaration inside the 
wrapper.

    var undefined = 123;
    (function(something, foo) {
        var undefined;
        ...

    })('Hello World', 42);

The only difference being here, that this version results in 4 more bytes being
used in case it is minified and there is no other `var` statement inside the
anonymous wrapper.

### Uses of `null`

While `undefined` in the context of the JavaScript language is mostly used in
the sense of a traditional *null*, the actual `null` (both a literal and a type)
is more or less just another data type.

It is used in some JavaScript internals (like declaring the end of the
prototype chain by setting `Foo.prototype = null`), but in almost all cases it
can be replaced by `undefined`.


