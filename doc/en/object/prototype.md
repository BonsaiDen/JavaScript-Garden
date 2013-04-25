## The Prototype

JavaScript does not feature a classical inheritance model; instead, it uses a
*prototypal* one.

While this is often considered to be one of JavaScript's weaknesses, the
prototypal inheritance model is in fact more powerful than the classic model.
It is, for example, fairly trivial to build a classic model on top of a
prototypal model, while the other way around is a far more difficult task.

JavaScript is the only widely used language that features prototypal
inheritance, so it can take time to adjust to the differences between the two
models.

The first major difference is that inheritance in JavaScript uses *prototype
chains*.

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
            { foo: 'Hello World' }
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

