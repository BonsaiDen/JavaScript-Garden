## `eval`

The `eval` function will execute a string of JavaScript code in the local scope.

    var foo = 1;
    function test() {
        var foo = 2;
        eval('foo = 3');
        return foo;
    }
    test(); // 3
    foo; // 1

But `eval` only exectues in local scope when it is being called directly and the 
name of the function that was actually called is `eval`.

    var foo = 1;
    function test() {
        var foo = 2;
        var bar = eval;
        bar('foo = 3');
        return foo;
    }
    test(); // 2
    foo; // 3
    
## `eval` in disguise

The [timeout functions](#timeouts) `setTimeout` and `setInterval` can both take a string as
their first argument. This string will **always** get executed in the global 
scope since `eval` is not being called directly in that case.

## Security issues

Also, `eval` is slow and a security problem since it will **execute** any code given to it.

