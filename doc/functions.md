## Functions and statements

Functions in JavaScript are first class objects, which means that they can be 
passed around like any other value. One common use of this feature is to pass
*anonymous functions* as callbacks to other functions. 

There are two different ways to define a function in JavaScript:

### The `function` statement

    function foo() {}

The above function gets created **before** the execution of the program starts.
Therefore it is available everywhere in the scope it was defined in, even if the
code that calls it appears before it in the actual source.

    foo(); // Works because foo was created before this code runs
    function foo() {}

### The `function` expression

    var foo = function() {};

The above assigns the unnamed and therefore *anonymous function* to the variable
`foo`. This happens at runtime.

    foo; // 'undefined'
    foo(); // this raises a TypeError
    var foo = function() {};

Due to the fact that `var` is a *statement*, which - just like the function 
statement - creates the variable `foo` before the actual execution of the code
starts, `foo` is already defined when the script gets executed, but since the 
assignment only happens at runtime, its value will default to 
[undefined](#undefined).

### Named function expression

Another special case is the assignment of named functions.

    var foo = function bar() {
        bar(); // Works
    }
    bar(); // ReferenceError

Here `bar` is not available in the outer scope, since the function only gets
assigned to `foo`, however, inside of `bar` it is available. This is due to the
fact how [name resolution](#scopes) in JavaScript work. The name of the function
itself is always made available in the local scope of the function.

### The `var` statement

    function test() {
        if (foo) {
            bar = 2;

        } else {
            var bar = 1;
        }
        return foo;
    }

    if (false) {
        var foo = 1;
    }

Since there's **no** [block scope](#scopes) in JavaScript, the above will
**not** assign the value `2` to the *global* variable `bar`, rather it will 
assign the value of `2` to the *local* variable `bar` of `test`. 
Also, while the statements inside the `if` block never get executed, the variable
`foo` still gets created and defaults to `undefined`.

### `var` vs. `function`

All `var` statements get parsed **before** `function` statements, therefore 
subsequent statements will override the previous ones.

    function foo() {}
    var foo;

    foo; // [function foo]
    var foo = 2;
    foo; // 2

