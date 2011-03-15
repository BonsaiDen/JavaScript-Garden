## Function Declarations and Expressions

Functions in JavaScript are first class objects. That means they can be 
passed around like any other value. One common use of this feature is to pass
an *anonymous function* as a callback to another, possibly asynchronous function.

### The `function` declaration

    function foo() {}

The above function gets [hoisted](#function.scopes) before the execution of the 
program starts; thus, it is available *everywhere* in the scope it was *defined* 
in, even if called before the actual definition in the source.

    foo(); // Works because foo was created before this code runs
    function foo() {}

### The `function` expression

    var foo = function() {};

This example assigns the unnamed and *anonymous* function to the variable `foo`. 

    foo; // 'undefined'
    foo(); // this raises a TypeError
    var foo = function() {};

Due to the fact that `var` is a declaration, that hoists the variable name `foo` 
before the actual execution of the code starts, `foo` is already defined when 
the script gets executed.

But since assignments only happen at runtime, the value of `foo` will default
to [undefined](#core.undefined) before the corresponding code is executed.

### Named function expression

Another special case is the assignment of named functions.

    var foo = function bar() {
        bar(); // Works
    }
    bar(); // ReferenceError

Here `bar` is not available in the outer scope, since the function only gets
assigned to `foo`; however, inside of `bar` it is available. This is due to 
how [name resolution](#function.scopes) in JavaScript works, the name of the 
function is *always* made available in the local scope of the function itself.

