## eval

The `eval` function is supposed to execute a string of JavaScript syntax in the
local scope. But it only does so for [function statements](#functions).

    var foo = 1;
    function test() {
        var foo = 2;
        eval('foo = 3');
        return foo;
    }
    test(); // 3
    foo; // 1

But when used inside of a function expression, `eval` gets executed in the
*global scope*.

    var foo = 1;
    var test = function() {
        var foo = 2;
        eval('foo = 3');
        return foo;
    }
    test(); // 2
    foo; // 3

This, of course, also applies to anonymous functions since these are also
expressions and not statements, and even works when a function statement was 
declared inside of an expression.


    var foo = 1;
    var test = function() {
        var foo = 2;
        function bar() {
            eval('foo = 3');
            return foo;
        }
        return bar();
    }
    test(); // 2
    foo; // 3

Let alone this inconsistency is enough of a reason to not use `eval`.

## `eval` in disguise

The [timeout functions](#timeouts) `setTimeout` and `setInterval` can both take a string as
their first argument, this string will **always** get executed in the global 
scope since `eval` is not being called directly in that case.

Also, `eval` is slow and a security problem since it will **execute** any code given to it.
