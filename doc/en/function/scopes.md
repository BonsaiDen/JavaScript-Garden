## Scopes and Namespaces

Although JavaScript deals fine with the syntax of two matching curly
braces for blocks, it does **not** support block scope; hence, all that is left 
in the language is *function scope*.

    function test() { // a scope
        for(var i = 0; i < 10; i++) { // not a scope
            // count
        }
        console.log(i); // 10
    }

> **Note:** When not used in an assignment, return statement or as a function 
> argument, the `{...}` notation will get interpreted as a block statement and 
> **not** as an object literal. This, in conjunction with 
> [automatic insertion of semicolons](#core.semicolon), can lead to subtle errors.

There are also no distinct namespaces in JavaScript, which means that everything 
gets defined in one *globally shared* namespace.

Each time a variable is referenced, JavaScript will traverse upwards through all 
the scopes until it finds it. In the case that it reaches the global scope and 
still has not found the requested name, it will raise a `ReferenceError`.

### The Bane of Global Variables

    // script A
    foo = '42';

    // script B
    var foo = '42'

The above two scripts do **not** have the same effect. Script A defines a 
variable called `foo` in the *global* scope, and script B defines a `foo` in the
*current* scope.

Again, that is **not** at all the *same effect*: not using `var` can have major 
implications.

    // global scope
    var foo = 42;
    function test() {
        // local scope
        foo = 21;
    }
    test();
    foo; // 21

Leaving out the `var` statement inside the function `test` will override the 
value of `foo`. While this might not seem like a big deal at first, having 
thousands of lines of JavaScript and not using `var` will introduce horrible,
hard-to-track-down bugs.
    
    // global scope
    var items = [/* some list */];
    for(var i = 0; i < 10; i++) {
        subLoop();
    }

    function subLoop() {
        // scope of subLoop
        for(i = 0; i < 10; i++) { // missing var statement
            // do amazing stuff!
        }
    }
    
The outer loop will terminate after the first call to `subLoop`,  since `subLoop`
overwrites the global value of `i`. Using a `var` for the second `for` loop would
have easily avoided this error. The `var` statement should **never** be left out 
unless the *desired effect* is to affect the outer scope.

### Local Variables

The only source for local variables in JavaScript are
[function](#function.general) parameters and variables that were declared via the 
`var` statement.

    // global scope
    var foo = 1;
    var bar = 2;
    var i = 2;

    function test(i) {
        // local scope of the function test
        i = 5;

        var foo = 3;
        bar = 4;
    }
    test(10);

While `foo` and `i` are local variables inside the scope of the function `test`,
the assignment of `bar` will override the global variable with the same name.

### Hoisting

JavaScript **hoists** declarations. This means that both `var` statements and
`function` declarations will be moved to the top of their enclosing scope.

    bar();
    var bar = function() {};
    var someValue = 42;

    test();
    function test(data) {
        if (false) {
            goo = 1;

        } else {
            var goo = 2;
        }
        for(var i = 0; i < 100; i++) {
            var e = data[i];
        }
    }

The above code gets transformed before any execution is started. JavaScript moves
the `var` statements, as well as the `function` declarations to the top of the 
nearest surrounding scope.

    // var statements got moved here
    var bar, someValue; // default to 'undefined'

    // the function declaration got moved up too
    function test(data) {
        var goo, i, e; // missing block scope moves these here
        if (false) {
            goo = 1;

        } else {
            goo = 2;
        }
        for(i = 0; i < 100; i++) {
            e = data[i];
        }
    }

    bar(); // fails with a TypeError since bar is still 'undefined'
    someValue = 42; // assignments are not affected by hoisting
    bar = function() {};

    test();

Missing block scoping will not only move `var` statements out of loops and
their bodies, it will also make the results of certain `if` constructs 
non-intuitive.

In the original code, although the `if` statement seemed to modify the *global 
variable* `goo`, it actually modifies the *local variable* - after hoisting 
has been applied.

Without the knowledge about *hoisting*, the below code might seem to raise a 
`ReferenceError`.

    // check whether SomeImportantThing has been initialized
    if (!SomeImportantThing) {
        var SomeImportantThing = {};
    }

But of course, the above works due to the fact that the `var` statement is being 
moved to the top of the *global scope*.

    var SomeImportantThing;

    // other code might initialize SomeImportantThing here, or not

    // make sure it's there
    if (!SomeImportantThing) {
        SomeImportantThing = {};
    }

### Name Resolution Order

All scopes in JavaScript, including the *global scope*, have the special name 
[`this`](#function.this), defined in them, which refers to the *current object*. 

Function scopes also have the name [`arguments`](#function.arguments), defined in
them, which contains the arguments that were passed to a function.

For example, when trying to access a variable named `foo` inside the scope of a 
function, JavaScript will lookup the name in the following order:

 1. In case there is a `var foo` statement in the current scope, use that.
 2. If one of the function parameters is named `foo`, use that.
 3. If the function itself is called `foo`, use that.
 4. Go to the next outer scope, and start with **#1** again.

> **Note:** Having a parameter called `arguments` will **prevent** the creation 
> of the default `arguments` object.

### Namespaces

A common problem of having only one global namespace is the likeliness of running
into problems where variable names clash. In JavaScript, this problem can
easily be avoided with the help of *anonymous wrappers*.

    (function() {
        // a self contained "namespace"
        
        window.foo = function() {
            // an exposed closure
        };

    })(); // execute the function immediately


Unnamed functions are considered [expressions](#function.general); so in order to
being callable, they must first be evaluated.

    ( // evaluate the function inside the paranthesis
    function() {}
    ) // and return the function object
    () // call the result of the evaluation

There are other ways for evaluating and directly calling the function expression; which, 
while different in syntax, do behave the exact same way.

    // A few other styles for directly invoking the 
    !function(){}()
    +function(){}()
    (function(){}());
    // and so on...

### In Conclusion

It is recommended to always use an *anonymous wrapper* for encapsulating code in 
its own namespace. This does not only protect code against name clashes, but it 
also allows for better modularization of programs.

Additionally, the use of global variables is considered **bad practice**. **Any**
use of them indicates badly written code that is prone to errors and hard to maintain.

