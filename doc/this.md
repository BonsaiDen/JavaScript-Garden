### How `this` works

JavaScript has a, at first, very strange concept of what `this` refers to.
There are exactly five different ways in which the value of `this` can get set.

#### The global scope

    this;

When using `this` in global scope, it will simply refer to the *global* object.

#### Calling a Function

    foo();

Here `this` will again refer to the *global* object.

#### Calling a Method

    test.foo(); 

In this example `this` will refer to `test`.

#### Calling a Constructor

    new foo(); 

A function call that's preceded by the `new` keyword acts as
a [constructor](#constructors). Inside the function `this` will refer to a newly
created `Object`.

#### Explicit setting

    function foo(a, b, c) {
    }
                          
    var bar = {};
    foo.call(bar, [1, 2, 3]);
    foo.apply(bar, 1, 2, 3);

When using the `call` or `apply` methods of `Function.prototype`, one can 
explicitly set the value of `this` inside the called function, so in the above
case the *method case* does **not** apply, and `this` inside of `foo` will be
set to `bar`.

> **Note:** `this` **cannot** be used to refer to the object inside of an `Object`
> literal. So `var obj = {me: this}` will **not** result in `me` refering to
> `obj`, since `this` gets determined by one of the above cases.

#### Common Pitfalls

While most of these cases make sense, the first one is considered a mis-design 
by many people since it's **never** of any practical use, but leads to many bugs.

    Foo.method = function() {
        function test() {
            // this is set to the global object
        }
        test();
    }

A common misconception is that `this` inside of `test` refers to `Foo`, but it 
does **not**.

In order to gain access to `Foo` from within `test` one has to create a local
variable inside of `method` which refers to `Foo`.

    Foo.method = function() {
        var that = this;
        function test() {
            // Use that instead of this here
        }
        test();
    }

`that` is just a normal name, but it's a common idiom to use it as a reference
to an outer `this`. In combination with [Closures](#closures), 
this can also be used to pass `this` around.

#### Assigning Methods

Another thing that does **not** work in JavaScript is **assigning** a method to
a variable.

    var test = someObject.methodTest();
    test();

Again due to the first case, `test` now acts like like a plain function call
therefore the `this` inside it will not refer to `someObject` anymore.

While the late binding of `this` might seem like a bad thing, it is fact what
makes [prototypical inheritance](#prototype) work. 

    
    function Foo() {}
    Foo.prototype.method = function() {};

    function Bar() {}
    Bar.prototype = Foo.prototype;

    new Bar().method();

When `method` gets called on a instance of `Bar`, `this` will now refer to that
instance.  

#### Best Practices
Don't try to work around the behavior of `this` in JavaScript. Instead
**understand** how and why it works the way it does. Otherwise you'll end up with
a lot of bugs that seem to be there for no good reason.

