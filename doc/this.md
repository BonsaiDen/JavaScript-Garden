### How `this` works in JavaScript

JavaScript has a, at first, very strange concept of what `this` refers to. If
one takes a closer look, he can see that there are actually only three different
ways in which the value of `this` gets determined.

**The Function Case**

    foo();

Here `this` will refer to the *global* object.

**The Method Case**

    test.foo(); 

In this example `this` will refer to `test`.

**The Constructor Case**

    new foo(); 

A function call that's preceded by the `new` keyword acts as
a [constructor](#constructors). Inside the function `this` will refer to a newly
created `Object`.

The first case is consider a mis-design by many people since it's **never** of 
any practical use, but leads to many bugs.

**Example**

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

**Example**

    Foo.method = function() {
        var that = this;
        function test() {
            // Use that instead of this here
        }
        test();
    }

`that` is just a normal name, but it's a common idiom to use it as a reference
to an outer `this`. In combination with [Closures](#closures-and-references), 
this can also be used to pass `this` around.

Another thing that does **not** work in JavaScript is binding a method to
a variable.

**Example**

    var test = someObject.methodTest();
    test();

Again due to the first case, `test` now acts like like a plain function call
therefore the `this` inside it will not refer to `someObject` anymore.

While the late binding of `this` might seem like a bad thing, it is fact what
makes [prototypical inheritance](#the-prototype) work. 

**Example**
    
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

