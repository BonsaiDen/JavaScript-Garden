## Az `undefined` és a `null`

A JavaScript két értéket is tartogat a semmi kifejezésére, ezek a `null` és az
`undefined` és ezek közül az utóbbi a hasznosabb.

### Az `undefined`

Ha az előbbi bevezetőtől nem zavarodtál volna össze; az 
`undefined` egy típus amelynek pontosan egy értéke van, az `undefined`.

A nyelvben szintén van egy `undefined` nevű globális változó amelynek az értékét
hogy-hogy nem `undefined`-nek hívják. Viszont ez a változó **nem** konstans vagy
kulcsszó a nyelvben. Ez azt jeletni hogy az *értéke* könnyedén felülírható.

> **ES5 Megjegyzés:** Az `undefined` ECMAScript 5-ben **többé** *nem felülírható* 
> strict módban, bár a neve továbbra is eltakarható, például egy saját függvénnyel
> aminek a neve éppen `undefined`.

Itt van pár példa, hogy mikor is találkozhatunk az `undefined` értékkel:
 
 - Az `undefined` globális változó elérésekor
 - Egy deklarált, de nem inicializált változó elérésekor.
 - Egy függvény hívásakor ez a visszatérési érték, `return` utasítás híján.
 - Egy olyan `return` utasítás lefutásakor, amely nem térít vissza értéket.
 - Nem létező mezők lekérésekor.
 - Olyan függvény paraméterek elérésekor amelyeknek a hívó oldalon nem kaptak értéket.
 - Bármikor amikor az `undefined` érték van valaminek beállítva.
 - Bármelyik `void(kifejezés)` utasítás futtatásakor.

### Handling Changes to the Value of `undefined`

Since the global variable `undefined` only holds a copy of the actual *value* of 
`undefined`, assigning a new value to it does **not** change the value of the 
*type* `undefined`.

Still, in order to compare something against the value of `undefined`, it is
necessary to retrieve the value of `undefined` first.

To protect code against a possible overwritten `undefined` variable, a common
technique used is to add an additional parameter to an [anonymous
wrapper](#function.scopes) that gets no argument passed to it.

    var undefined = 123;
    (function(something, foo, undefined) {
        // undefined in the local scope does 
        // now again refer to the value `undefined`

    })('Hello World', 42);

Another way to achieve the same effect would be to use a declaration inside the 
wrapper.

    var undefined = 123;
    (function(something, foo) {
        var undefined;
        ...

    })('Hello World', 42);

The only difference here is that this version results in 4 more bytes being
used in case it is minified, and there is no other `var` statement inside the
anonymous wrapper.

### Uses of `null`

While `undefined` in the context of the JavaScript language is mostly used in
the sense of a traditional *null*, the actual `null` (both a literal and a type)
is more or less just another data type.

It is used in some JavaScript internals (like declaring the end of the
prototype chain by setting `Foo.prototype = null`), but in almost all cases, it
can be replaced by `undefined`.


