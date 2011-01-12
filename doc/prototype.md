## The prototype

JavaScript does not feature the classical inheritance model, instead it uses a 
*prototypical* one. 


While this is often considered to be one of JavaScript's weak points, the 
prototypical inheritance model is in fact more powerful than the classic
inheritance model. It fairly trivial to built the classic model on top the it, 
while the other way around is a far more difficult task.

Due to the fact that JavaScript is practically the only language that is both in
widespread **and** uses prototypical inheritance, it takes some time to adjust
to the differences between the two models. 

For example, inheritance in JavaScript is done by using *prototype chains*.

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
`Foo.prototype`, so it will have access to the function `method` that was defined
on `Foo`, but it will not have access to the property `value` of a `Foo` instance
since the [constructor](#constructor) `Foo` never gets called in this case.

> **Note:** Don't use `Bar.property = Foo;`, since this will **not** point to 
> the prototype of `Foo` but rather to the function object `Foo`, so the chain 
> will go over `Function.prototype` in this case (therefore the function `method`
> is not on the prototype chain).

### Property lookup

When accessing the property of an object, JavaScript will traverse the
prototype chain **upwards** until it finds a property with the requested name.

When it reaches the top of the chain - namely `Object.prototype` - and still
hasn't found the specified property, it will return the value
[undefined](#undefined).

### Dynamically created prototypes

It is possible to assign **any** given object as the value of the `prototype` 
property.

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

Now `Bar.prototype` points to an **instance** of `Foo`, therefore the property
**value** is now on the prototype chain and since `Foo` itself has a prototype, 
the chain continues with that one afterwards.

### Performance

As a result of all of this this, the lookup time for properties that are high up 
the prototype chain can have a negative impact on performance critical code. 
Access to non existent properties will always traverse the full prototype chain 
and when [iterating](#the-for-in-loop) over the properties of an object  **every** 
property that's on the prototype chain will get enumerated.

### Best practices

It's a must to understand the prototypical inheritance model completely before
writing complex code that makes use of it. Also, watching the length of the 
prototype chains and breaking them up if necessary can avoid performance issues.

