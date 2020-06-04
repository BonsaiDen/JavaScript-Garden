## Прототипът

JavaScript не притежава класически модел за наследяване. Вместо това се
използва *прототипен* модел.

Въпреки че това се смята за слабост на JavaScript, наследяването чрез
прототипи е всъщност по-мощен модел от класическия модел (чрез класове). Доста
по-лесно е да се осъществи класически модел на наследяване на основата на
прототипи отколкото обратното.

JavaScript е единственият широко използван език, притежаващ наследяване чрез
прототипи. Затова може да ви отнеме време да разберете добре разликите между
двата модела.

> **Note:** Simply using `Bar.prototype = Foo.prototype` will result in both objects
> sharing the **same** prototype. Therefore, changes to either object's prototype
> will affect the prototype of the other as well, which in most cases is not the
> desired effect.

    function Foo() {
        this.value = 42;
    }
    Foo.prototype = {
        method: function() {}
    };

    function Bar() {}

    // Set Bar's prototype to a new instance of Foo
    Bar.prototype = new Foo();
    Bar.prototype.foo = 'Hello World';

    // Make sure to list Bar as the actual constructor
    Bar.prototype.constructor = Bar;

    var test = new Bar(); // create a new bar instance

    // The resulting prototype chain
    test [instance of Bar]
        Bar.prototype [instance of Foo]
            { foo: 'Hello World', value: 42 }
            Foo.prototype
                { method: ... }
                Object.prototype
                    { toString: ... /* etc. */ }

In the code above, the object `test` will inherit from both `Bar.prototype` and
`Foo.prototype`; hence, it will have access to the function `method` that was
defined on `Foo`. It will also have access to the property `value` of the
**one** `Foo` instance that is its prototype. It is important to note that `new
Bar()` does **not** create a new `Foo` instance, but reuses the one assigned to
its prototype; thus, all `Bar` instances will share the **same** `value` property.

> **Note:** Do **not** use `Bar.prototype = Foo`, since it will not point to
> the prototype of `Foo` but rather to the function object `Foo`. So the
> prototype chain will go over `Function.prototype` and not `Foo.prototype`;
> therefore, `method` will not be on the prototype chain.

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

