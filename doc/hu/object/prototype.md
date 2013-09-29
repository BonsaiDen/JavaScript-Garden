## A Prototípus

A JavaScript nem a klasszikus öröklődést használja, hanem egy ún. *prototípus*
származtatást használ.

Míg ezt gyakran a JavaScript legnagyobb hibái között tartják számon, valójában
ez a származtatási modell jóval erősebb mint klasszikus barátja.
Ezt jelzi, hogy például sokkal könnyebb megépíteni a klasszikus modellt, alapul véve
a prototípusos modellt, míg a fordított irány kivitelezése igencsak nehézkes lenne.

A JavaScript az egyetlen széles körben elterjedt nyelv, amely ezt a származtatást
használja, így mindenképp időt kell szánni a két modell közti különbség megértésére.

Az első legszembetűnőbb különbség, hogy ez a fajta származtatás *prototípus láncokat* 
használ.

> **Megj.:** Egyszerűen a `Bar.prototype = Foo.prototype` utasítás használva, mind a 
> két objektum **ugyanazon** a prototípuson fog osztozni. Így aztán ha bárki közülük
> megváltoztatja ezt a prototípust, az a változás a másik objektumot is befolyásolja,
> ami általában nem egyezik meg a kívánt működéssel.

    function Foo() {
        this.value = 42;
    }
    Foo.prototype = {
        method: function() {}
    };

    function Bar() {}

    // Beállítjuk a Bar prototípusát a Foo egy új példányára
    Bar.prototype = new Foo();
    Bar.prototype.foo = 'Hello World';

    // Beállítjuk a Bar konstruktorát
    Bar.prototype.constructor = Bar;

    var test = new Bar(); // új Bar példány létrehozása

    // A kapott prototípus lánc
    test [instance of Bar]
        Bar.prototype [instance of Foo]
            { foo: 'Hello World' }
            Foo.prototype
                { method: ... }
                Object.prototype
                    { toString: ... /* stb. */ }

A fenti kódban a `test` objektum mind a `Bar.prototype` és `Foo.prototype`
prototípusokból származik, így lesz hozzáférése a `method` nevű függvényhez amely
a `Foo` prototípusában lett definiálva. A `value` mezőhöz szintén lesz hozzáférése,
amely akkor jött létre, amikor (szám szerint) **egy** új `Foo` példányt hoztunk létre.
Érdemes észrevenni hogy az `new Bar()` kifejezés **nem** hoz létre egy új `Foo` példányt
minden alkalommal, azonban újrahasználja azt az egyetlen inicilalizált `Foo`-t. Így az összes `Bar` példány *egy és ugyanazt* a `value` mezőt (és
értéket) fogja használni.

> **Megj.:** **Ne** használd a `Bar.prototype = Foo` kifejezést, mivel ez nem
> a `Foo` prototípusára fog mutatni, hanem magára a `Foo` függvényre, mint objektumra.
> Így a prototípus lánc a `Function.prototype`-ra fog futni a `Foo.prototype` helyett.
> Ekkor, a `method` függvény nem lesz benne a prototípus láncban.

### Property Lookup

When accessing the properties of an object, JavaScript will traverse the
prototype chain **upwards** until it finds a property with the requested name.

If it reaches the top of the chain - namely `Object.prototype` - and still
hasn't found the specified property, it will return the value
[undefined](#core.undefined) instead.

### The Prototype Property

While the prototype property is used by the language to build the prototype
chains, it is still possible to assign **any** given value to it. However,
primitives will simply get ignored when assigned as a prototype.

    function Foo() {}
    Foo.prototype = 1; // no effect

Assigning objects, as shown in the example above, will work, and allows for dynamic
creation of prototype chains.

### Performance

The lookup time for properties that are high up on the prototype chain can have
a negative impact on performance, and this may be significant in code where
performance is critical. Additionally, trying to access non-existent properties
will always traverse the full prototype chain.

Also, when [iterating](#object.forinloop) over the properties of an object
**every** property that is on the prototype chain will be enumerated.

### Extension of Native Prototypes

One mis-feature that is often used is to extend `Object.prototype` or one of the
other built in prototypes.

This technique is called [monkey patching][1] and breaks *encapsulation*. While
used by popular frameworks such as [Prototype][2], there is still no good
reason for cluttering built-in types with additional *non-standard* functionality.

The **only** good reason for extending a built-in prototype is to backport
the features of newer JavaScript engines; for example,
[`Array.forEach`][3].

### In Conclusion

It is **essential** to understand the prototypal inheritance model before
writing complex code that makes use of it. Also, be aware of the length of the
prototype chains in your code and break them up if necessary to avoid possible
performance problems. Further, the native prototypes should **never** be
extended unless it is for the sake of compatibility with newer JavaScript
features.

[1]: http://en.wikipedia.org/wiki/Monkey_patch
[2]: http://prototypejs.org/
[3]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach

