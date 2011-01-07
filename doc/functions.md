### Functions and Statements

Functions in JavaScript are first class objects, that means they can be passed
around like any other value. One common use of that feature is to pass
*anonymous funtions* as callbacks to other functions. 

There are a two of different ways do define functions in JavaScript.

#### The Function Statement

    function foo() { 
    }

The above function gets created **before** any actual code is run, therefore its
available everywhere in the scope it was defined in from the start.

    foo(); // Works because foo was created before this code runs
    function foo() {
    }

#### The Function Expression

    var foo = function() {
    };

The above assign the unnamed and therefore *anonymous* function to the variable
`foo`. But it does **not** do so before the code is run. 

    foo; // 'undefined'
    foo(); // this raises a TypeError
    var foo = function() {
    };

The above may seem strange at first, but `var` is a statement, so the variable
`foo` will once again get created before any code is run. But `=` is an
expression, therefore `foo` does not get assigned any value, so it defaults to 
`undefined`.

#### Named Function Expression

There's one more case here, that is when you're assigning a named function.

    var foo = function bar() {
        bar(); // Works
    }
    bar(); // ReferenceError

Here `bar` is not available in the outer scope, since the function gets only
assigned to `foo`, however, inside of `bar`, `bar` **is** available, since the
name of the function itself always available in the functions own scope, for more on
*name resolution* read about [scopes](#scopes-and-namespaces).

#### The var Statement

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

Since there's **no** [block scope](#scopes-and-namespaces) in JavaScript, the above will
**not** assign the value `2` to the *global* variable `bar`, rather it assigns it to the 
*local* variable `bar` of `test`. Also, while the if body never gets executed, 
the variable `foo` still gets created and defaults to `undefined`.

