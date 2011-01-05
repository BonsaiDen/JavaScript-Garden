### Expressions and Statements

In JavaScript there's a important difference between expressions and statements.

**Example**
    
    foo(); // this works just like expected
    function foo() {}                    

    bar(); // this raises a TypeError
    console.log(bar); // No ReferenceError but prints 'undefined'
    var bar = function() {}

In the above example the call to `foo` works due to the fact that `function
foo()` is a *statement*, but the call to `bar` fails since `var bar
= function()` is an *expression*.

Before the code is run, JavaScript executes all *statements*, since `var` is
a statement, the variable `bar` will get created but the corresponding
assignment expression will not yet get evaluated, therefore `bar` defaults to
the value of `undefined`.

**Another Example**

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

Remember, there's **no** block scope in JavaScript, therefore the above will
*not* assign `2` to the global variable `bar` but to the local `bar` of `test`.
Also, while the if body never gets executed, the variable `foo` still gets
created and defaults to `undefined`.

