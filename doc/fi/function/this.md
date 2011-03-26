## How `this` Works

JavaScript has a different concept of what the special name `this` refers to 
than most other programming languages do. There are exactly **five** different 
ways in which the value of `this` can be bound in the language.

### The Global Scope

    this;

When using `this` in global scope, it will simply refer to the *global* object.


### Calling a Function

    foo();

Here `this` will again refer to the *global* object.

> **ES5 Note:** In strict mode, the global case **no longer** exists.
> `this` will instead have the value of `undefined` in that case.

### Calling a Method

    test.foo(); 

In this example `this` will refer to `test`.

### Calling a Constructor

    new foo(); 

A function call that is preceded by the `new` keyword acts as
a [constructor](#function.constructors). Inside the function `this` will refer 
to a *newly created* `Object`.

### Explicit Setting of `this`

    function foo(a, b, c) {}
                          
    var bar = {};
    foo.apply(bar, [1, 2, 3]); // array will expand to the below
    foo.call(bar, 1, 2, 3); // results in a = 1, b = 2, c = 3

When using the `call` or `apply` methods of `Function.prototype`, the value of
`this` inside the called function gets **explicitly set** to the first argument 
of the corresponding function call.

As a result, the above example the *method case* does **not** apply, and `this` 
inside of `foo` will be set to `bar`.

> **Note:** `this` **cannot** be used to refer to the object inside of an `Object`
> literal. So `var obj = {me: this}` will **not** result in `me` referring to
> `obj`, since `this` only gets bound by one of the five listed cases.

### Common Pitfalls

While most of these cases make sense, the first one is to be considered another
mis-design of the language, as it **never** has any practical use.

    Foo.method = function() {
        function test() {
            // this is set to the global object
        }
        test();
    }

A common misconception is that `this` inside of `test` refers to `Foo`, while in
fact it **does not**.

In order to gain access to `Foo` from within `test` it is necessary to create a 
local variable inside of `method` which refers to `Foo`.

    Foo.method = function() {
        var that = this;
        function test() {
            // Use that instead of this here
        }
        test();
    }

`that` is just a normal name, but it is commonly used for the reference to an 
outer `this`. In combination with [closures](#function.closures), it can also 
be used to pass `this` values around.

### Assigning Methods

Another thing that does **not** work in JavaScript is function aliasing, that is,
**assigning** a method to a variable.

    var test = someObject.methodTest;
    test();

Due to the first case `test` now acts like like a plain function call; therefore,
`this` inside it will no longer refer to `someObject`.

While the late binding of `this` might seem like a bad idea at first, it is in 
fact what makes [prototypal inheritance](#object.prototype) work. 

    function Foo() {}
    Foo.prototype.method = function() {};

    function Bar() {}
    Bar.prototype = Foo.prototype;

    new Bar().method();

When `method` gets called on a instance of `Bar`, `this` will now refer to that
very instance. 


