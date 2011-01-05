### The Prototype

JavaScript does not feature classical inheritance, but it has prototypical one.

**In short:** JavaScript's Model is more powerful (you can for example implement 
classical inheritance with it, you can't do this the other way around), but also 
more error prone.

Common mistakes arise from the fact how the prototype chain works.

**Examples**
    
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
`Foo.prototype` so it will have access to the function `method` that was defined
on `Foo`, but it will not have access to the value property of a `Foo` instance
since `Foo` itself never gets called.  

**Note:** Don't use `Bar.property = Foo;` this will **no**t point to `Foo`'s
prototype but rather to the function object `Foo`, so the chain will go over
`Function.prototype` in this case.

If you try to access a property of an object, JavaScript will search the
prototype chain **upwards** until it finds a property with the specified name,
when it reaches the top of the chain, namely `Object.prototype`, and still
hasn't found the property it will return `undefined`.

**The Prototype Chain in the above Example**

    Object.prototype: {toString: ... /* etc. */};
        Foo.prototype: {method: ...};
            Bar.prototype: Foo.prototype
                Bar.method()

**Note:** You can assign *any* `object` to the prototype value, so consider
the following:

    Bar.prototype = new Foo();
    var boo = new Bar();

**The resulting prototype chain**

    Object.prototype: {toString: ... /* etc. */};
        Foo.prototype: {method: ...};
            [Foo Instance]: {value: 42};
                Bar.prototype: [Foo Instance]
                    Bar.method()

Now `Bar.prototype` points to an **instance** of `Foo`, which of course is just
another object, but this time has the `value` property on it. And since `Foo`
itself has a prototype, the chain continues with that one afterwards.

All of this has a couple of implications:

 1. Having long prototype chains decreases performance due to many lookups
 2. This can be used as a replacement of the classical inheritance model 
 3. You can't just access a property to check whether it's defined on a specific
    object, since JS will always search the prototype chain upwards

**Best Pratice:** Make sure to watch you prototype chains, don't abuse them or
you will end up with strange bugs and/or horrible performance.

