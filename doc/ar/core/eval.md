## Why Not to Use `eval`

The `eval` function will execute a string of JavaScript code in the local scope.

    var number = 1;
    function test() {
        var number = 2;
        eval('number = 3');
        return number;
    }
    test(); // 3
    number; // 1

However, `eval` only executes in the local scope when it is being called
directly *and* when the name of the called function is actually `eval`.

    var number = 1;
    function test() {
        var number = 2;
        var copyOfEval = eval;
        copyOfEval('number = 3');
        return number;
    }
    test(); // 2
    number; // 3

The use of `eval` should be avoided. 99.9% of its "uses" can be achieved
**without** it.
    
### `eval` in Disguise

The [timeout functions](#other.timeouts) `setTimeout` and `setInterval` can both 
take a string as their first argument. This string will **always** get executed 
in the global scope since `eval` is not being called directly in that case.

### Security Issues

`eval` also is a security problem, because it executes **any** code given to it.
It should **never** be used with strings of unknown or untrusted origins.

### In Conclusion

`eval` should never be used. Any code that makes use of it should be questioned
in its workings, performance and security. If something requires `eval` in
order to work, it should **not** be used in the first place.  A *better design*
should be used, that does not require the use of `eval`.

