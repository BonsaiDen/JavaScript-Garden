## Function Declarations and Expressions

Functions in JavaScript are first class objects, which means that they can be 
passed around like any other value. One common use of this feature is to pass
an *anonymous function* as a callback to another, possibly asynchronous function.

### The `function` declaration

    function foo() {}

The above function gets created **before** the execution of the program starts;
thus, it is available *everywhere* in the scope it was *defined* in, even if 
called before the actual definition in the source.

    foo(); // Works because foo was created before this code runs
    function foo() {}

### The `function` expression

    var foo = function() {};

The above assigns the unnamed and - *anonymous* - function to the variable `foo`. 

    foo; // 'undefined'
    foo(); // this raises a TypeError
    var foo = function() {};

Due to the fact that `var` is a *statement*, which - just like the function 
declaration - creates the variable `foo` before the actual execution of the code
starts, `foo` is already defined when the script gets executed.

Since assignments only happens at runtime, the value of `foo` will default
to [undefined](#undefined) before the corresponding code is executed.

### Named function expression

Another special case is the assignment of named functions.

    var foo = function bar() {
        bar(); // Works
    }
    bar(); // ReferenceError

Here `bar` is not available in the outer scope, since the function only gets
assigned to `foo`; however, inside of `bar` it **is** available. This is due to 
how [name resolution](#scopes) in JavaScript works, the name of the function
is always made available in the local scope of the function itself.

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

Since there is **no** [block scope](#scopes) in JavaScript, the above will
**not** assign the value `2` to the *global* variable `bar`. Instead, it will
assign the value of `2` to the *local* variable `bar` of `test`. 

Also, while the statements inside the `if` block never get executed, the variable
`foo` still gets created and defaults to the value of `undefined`; again, this
is due to the lack of block scoping.

### Order of parsing

All `var` statements get parsed **before** `function` declarations; hence,
subsequent statements will override the previous ones.

    function foo() {}
    var foo;

    foo; // [function foo]
    var foo = 2;
    foo; // 2

