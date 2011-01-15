## The prototype

JavaScript does not feature the classical inheritance model, instead it uses a 
*prototypical* one. 

While this is often considered to be one of JavaScript's weaknesses, the 
prototypical inheritance model is in fact more powerful than the classic model. 
For example, it is fairly trivial to build a classic model on top the it while the 
other way around is a far more difficult task.

Due to the fact that JavaScript is basically the only widely used language that
features prototypical inheritance, it takes some time to adjust to the 
differences between the two models. 

The first major difference is that inheritance in JavaScript is done by using 
*prototype chains*.

    function Foo() {
        this.value = 42;
    }
    Foo.prototype = {
        method: function() {}
    };

    function Bar() {}

    // Set Bar's prototype to the prototype object of Foo
    Bar.prototype = Foo.prototype;

    var test = new Bar() // create a new bar instance

    // Resulting prototype chain
    Object.prototype: {toString: ... /* etc. */};
        Foo.prototype: {method: ...};
            Bar.prototype: Foo.prototype
                Bar.method()

The above object `test` will inherit from both `Bar.prototype` and
`Foo.prototype`. It will therefore have access to the function `method` that was 
defined on `Foo`, but it will not have access to the **property** `value` of a 
`Foo` instance since that property gets defined in the [constructor](#constructor)
of `Foo`. Which, in this case, never gets called.

> **Note:** Do **not** use `Bar.property = Foo`, since it will not point to 
> the prototype of `Foo` but rather to the function object `Foo`. Therefore the 
> prototype chain will go over `Function.prototype` in this case, which results
> in `method` not being on the prototype chain.

### Property lookup

When accessing the properties of an object, JavaScript will traverse the
prototype chain **upwards** until it finds a property with the requested name.

When it reaches the top of the chain - namely `Object.prototype` - and still
hasn't found the specified property, it will return the value
[undefined](#undefined) instead.

### The prototype property

The `prototype` property is in no way special, it is possible to assign **any**
given value to it, although primitives will simply get ignored.

    function Foo() {
    }
    Foo.prototype = 1; // no effect

Assigning objects on the other hand allows for dynamic creation of prototype
chains.

    function Foo() {
        this.value = 42;
    }
    Foo.prototype = {
        method: function() {}
    };

    function Bar() {}

    Bar.prototype = new Foo();
    var boo = new Bar();

    // Resulting prototype chain
    Object.prototype: {toString: ... /* etc. */};
        Foo.prototype: {method: ...};
            [Foo Instance]: {value: 42};
                Bar.prototype: [Foo Instance]
                    Bar.method()

Now `Bar.prototype` points to an *instance* of `Foo`, therefore the property
`value` of **that** instance is now on the prototype chain and since `Foo` itself
has a prototype, the chain continues with that one afterwards.

### Performance

As a result of all of this this, the lookup time for properties that are high up 
the prototype chain can have a negative impact on performance critical code. 
Accessing non existent properties will always traverse the complete chain. 

Also, when [iterating](#the-for-in-loop) over the properties of an object 
**every** property that is on the prototype chain will get enumerated.

### Extension of native prototypes

One mis-feature that is often used is to extend `Object.prototype` or on of the
other built in prototypes.

This technique is called [monkey patching][1] and breaks *encapsulation* at its
very root. While used by widely spread frameworks such as [Prototype][2], there
is still no good reason for cluttering built in types with additional
non-standard functionality.

The **only** good reason for extending a built in prototype is to back port 
the features of newer JavaScript engines to older ones, like for example
[`Array.forEach`][3].

### In conclusion

It is a must to understand the prototypical inheritance model completely before
writing complex code which makes use of it. Also, watching the length of all the 
prototype chains and breaking them up if necessary can avoid possible performance
issues. Further, the native prototypes should **never** be extended unless it is
down for the sake of compatibility with newer JavaScript features.

[1]: http://en.wikipedia.org/wiki/Monkey_patch
[2]: http://prototypejs.org/
[3]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach

