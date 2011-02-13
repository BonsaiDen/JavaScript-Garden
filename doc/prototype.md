## The prototype

JavaScript does not feature the classical inheritance model, instead it uses a 
*prototypical* one. 

While this is often considered to be one of JavaScript's weaknesses, the 
prototypical inheritance model is in fact more powerful than the classic model. 
For example, it is fairly trivial to build a classic model on top of it, while 
the other way around is a far more difficult task.

Due to the fact that JavaScript is basically the only widely used language that
features prototypical inheritance, it takes some time to adjust to the 
differences between the two models. 

The first major difference is that inheritance in JavaScript is done by using so
called *prototype chains*.
                
> **Note:** Simply using `Bar.prototype = Foo.prototype` will result in both objects
> sharing the **same** prototype. Therefore, changes to either object its prototype 
> will affect the other its prototype as well, which in most cases is not the 
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

    var test = new Bar() // create a new bar instance

    // The resulting prototype chain
    test [instance of Bar]
        Bar.prototype [instance of Foo] 
            { foo: 'Hello World' }
            Foo.prototype
                {method: ...};
                Object.prototype
                    {toString: ... /* etc. */};

In the above, the object `test` will inherit from both `Bar.prototype` and
`Foo.prototype`; hence, it will have access to the function `method` that was 
defined on `Foo`. But it will not have access to the property `value` of a 
`Foo` instance, since that property gets defined in the [constructor](#constructor)
of `Foo`. But this constructor has to be called explicitly.

> **Note:** Do **not** use `Bar.prototype = Foo`, since it will not point to 
> the prototype of `Foo` but rather to the function object `Foo`. So the 
> prototype chain will go over `Function.prototype` and not `Foo.prototype`;
> therefore, `method` will not be on the prototype chain.

### Property lookup

When accessing the properties of an object, JavaScript will traverse the
prototype chain **upwards** until it finds a property with the requested name.

When it reaches the top of the chain - namely `Object.prototype` - and still
hasn't found the specified property, it will return the value
[undefined](#undefined) instead.

### The prototype property

While the prototype property is used by the language to build the prototype
chains, it is still possible to assign **any** given value to it. Although 
primitives will simply get ignored when assigned as a prototype.

    function Foo() {}
    Foo.prototype = 1; // no effect

Assigning objects, as shown in the example above, will work, and allows for dynamic
creation of prototype chains.

### Performance

The lookup time for properties that are high up on the prototype chain can have a
negative impact on performance critical sections of code. Additionally, trying to 
access non-existent properties will always traverse the full prototype chain. 

Also, when [iterating](#the-for-in-loop) over the properties of an object 
**every** property that is on the prototype chain will get enumerated.

### Extension of native prototypes

One mis-feature that is often used is to extend `Object.prototype` or one of the
other built in prototypes.

This technique is called [monkey patching][1] and breaks *encapsulation*. While 
used by widely spread frameworks such as [Prototype][2], there is still no good 
reason for cluttering built in types with additional non-standard functionality.

The **only** good reason for extending a built in prototype is to back port 
the features of newer JavaScript engines; for example, 
[`Array.forEach`][3].

### In conclusion

It is a must to understand the prototypical inheritance model completely before
writing complex code which makes use of it. Also, watching the length of the 
prototype chains and breaking them up if necessary can avoid possible performance
issues. Further, the native prototypes should **never** be extended unless it is
for the sake of compatibility with newer JavaScript features.

[1]: http://en.wikipedia.org/wiki/Monkey_patch
[2]: http://prototypejs.org/
[3]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach

