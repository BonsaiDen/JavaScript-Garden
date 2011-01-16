## Scopes and Namespaces

Although JavaScript deals fine with the block scope syntax of two matching curly
braces, it does **not** support block scope; thus, all that is left is the 
*function scope*.

> **Note:** When not used in an assignment or as a function argument, the `{...}`
> notation will get interpreted as a block statement and **not** as an `Object`. 
> This, in conjunction with [automatic insertion of semicolons](#semicolon), 
> can lead to subtle errors.

Additionally, there are no distinct namespaces in JavaScript. This means that 
everything gets defined in **one** globally shared namespace.

Each time a variable is referenced, JavaScript will traverse upwards through all 
the scopes until it finds it. In the case that it reaches the global scope and 
still has not found the requested name, it will raise a `ReferenceError`.

### The Bane of global Variables

    // script A
    foo = '42';

    // script B
    var foo = '42'

The above two scripts do **not** have the same effect. Script A defines a 
variable called `foo` in the *global* scope and script B defines a `foo` in the
*local* scope.

Again, that is **not** at all the same effect, not using `var` can have major 
implications.

    // global scope
    var foo = 42;
    function test() {
        // local scope
        foo = 21;
    }
    test();
    foo; // 21

Leaving out the `var` statement will override the value of `foo`, this might not
seem like a big deal at first, but consider having a ten-thousand line
JavaScript file with lots and lots of different variable names, not using `var`
will introduce hard to track down bugs.
    
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
    
The outer loop will terminate after the first call to `subLoop` since that
function overwrites the global value of `i`. Using a `var` for the second
`for` loop would have easily avoided this error. The `var` statement should never
be left out unless the desired effect **is** to affect the outer scope.

### Local variables

The only source for local variables in JavaScript are [function](#functions)
parameters and variables that were declared with the `var` statement.

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
the assignment of `bar` will override the global variable.

### Name resolution order

All scopes in JavaScript - including the global one - have the name 
[this](#this) defined in them, which refers to the  "current object". 

Function scopes also have the name [arguments](#arguments) defined, which 
contains the arguments that were passed to a function.

For example, when trying to access a variable named `foo` inside the scope of a 
function, JavaScript will lookup the name in the following order:

 1. In case there's a `var foo` statement in the current scope use that.
 2. If one of the function parameters is named `foo` use that.
 3. If the function itself is called `foo` use that.
 4. Go to the next outer scope and start from **#1** again.

> **Note:** Having a parameter called `arguments` will **override** the default
> `arguments` object.

### Namespaces

A common problem of having only one global namespace is that it is very easy to 
run into problems where variable names clash. But this can be easily avoided 
with the help of anonymous *function wrappers*.

    (function() {
        // a self contained "namespace"
        
        window.foo = function() {
            // an exposed closure
        };

    })(); // execute the function immediately


Since a unnamed functions are not considered as [statement](#functions), they
get interpreted as expression, in order to run those functions they must fist be
evaluate and then called.

    ( // evaluate the function inside the paranthesis
    function() {}
    ) // and return the function object
    () // call the result of the evaluation

There are other ways for evaluating and calling the function expression which - 
while different in syntax - do the exact same thing.

    // Two other ways
    +function(){}();
    (function(){}());

### In conclusion

It is recommended to always use an *anonymous wrapper* for encapsulating code in 
its own namespace. This does not only protect against name clashes, but it also
allows for better modularization.

Additionally, the use of global variables is considered **bad practice**, any use
of them indicates badly written code that is prone to failure and hard to 
maintain.

