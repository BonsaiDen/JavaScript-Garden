## The evil `eval`

The `eval` function will execute a string of JavaScript code in the local scope.

    var foo = 1;
    function test() {
        var foo = 2;
        eval('foo = 3');
        return foo;
    }
    test(); // 3
    foo; // 1

But `eval` only executes in local scope when it is being called directly **and** 
the name of the function that was actually called is `eval`.

    var foo = 1;
    function test() {
        var foo = 2;
        var bar = eval;
        bar('foo = 3');
        return foo;
    }
    test(); // 2
    foo; // 3

The use of `eval` should be avoided at **all costs**. 99.9% of its "uses" can be
achieved **without** it.
    
### `eval` in disguise

The [timeout functions](#other.timeouts) `setTimeout` and `setInterval` can both 
take a string as their first argument. This string will **always** get executed 
in the global scope since `eval` is not being called directly in that case.

### Security issues

Also, `eval` is  a security problem as it executes **any** code given to it,
it should be **NEVER** used with strings of unknown or untrusted origins.

### In conclusion

`eval` is **EVIL**. It should never be used, any code that makes use of it is to
be questioned in its workings and security. If something requires `eval` in
order to work, it is to be considered as magic and should **not** be used in the
first place, a **better** design should be used that does not require the use of
`eval`.

