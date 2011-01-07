### The Prototype

JavaScript does not feature the classical inheritance model, instead it uses a 
*prototypical* one. This might at first seem like a limitation, but it's not. a 
*prototypical* inheritance model is in fact more powerful than the classical
one, for example you can emulate the classical model with it, but you can't do it
the other way around.

Due to the fact that JavaScript is practically the only language in that's both in
widespread **and** uses prototypical inheritance, it takes some time to adjust
to the differences between the two models. Inheritance in JavaScript is done by
using *prototype chains*.

    function Foo() {
        this.value = 42;
    }
    Foo.prototype = {
        method: function() {
        }
    };

    function Bar() {
    }

    // Set Bar's prototype to the prototype object of Foo
    Bar.prototype = Foo.prototype;

    var test = new Bar() // create a new bar instance

The above `test` object will inherit from both `Bar.prototype` and
`Foo.prototype`, so it will have access to the function `method` that was defined
on `Foo`, but it will not have access to the value property of a `Foo` instance
since `Foo` itself never gets called.  

> **Note:** Don't use `Bar.property = Foo;` this will **not** point to `Foo` its
> prototype (therefore `method` is not on the prototype chain), but rather to the 
> function object `Foo`, so the chain will go over `Function.prototype` in this 
> case.

#### Property Lookup

If you try to access a property of an `Object`, JavaScript will traverse the
prototype chain **upwards** until it finds a property with the specified name.
When it reaches the top of the chain - namely `Object.prototype` - and still
hasn't found the property it will return the value `undefined`.

    // Prototype chain in the example above
    Object.prototype: {toString: ... /* etc. */};
        Foo.prototype: {method: ...};
            Bar.prototype: Foo.prototype
                Bar.method()

You can actually assign **any** `object` to the `prototype` property, so consider
the following.

    Bar.prototype = new Foo();
    var boo = new Bar();

    // Resulting prototype chain
    Object.prototype: {toString: ... /* etc. */};
        Foo.prototype: {method: ...};
            [Foo Instance]: {value: 42};
                Bar.prototype: [Foo Instance]
                    Bar.method()

Now `Bar.prototype` points to an **instance** of `Foo`, which of course is just
another object, but this time has the `value` property defined on it. And since 
`Foo` itself has a prototype, the chain continues with that one afterwards.

As a result of this, the lookup time for properties that are high up the chain 
can have a negative impact on performance critical code. Access to non existent
properties will always traverse the full chain and when 
[iterating](#the-for-in-loop) over the properties of an `Object` **every** 
property that's on the `prototype` chain will get enumerated.

#### Best Practices
Make sure to that you understand the prototypical inheritance model completely,
otherwise you will end up with unexpected, seemingly surprising results. Also,
watch the prototype chains of your objects, remember that they can have a big
impact on performance when not used correctly.

