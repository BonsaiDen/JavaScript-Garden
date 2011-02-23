### `setTimeout` and `setInterval`

Since JavaScript is asynchronous, it is possible to schedule the execution of a 
function by using the `setTimeout` and `setInterval` functions.

> **Note:** Timeouts are **not** part of the ECMAScript Standard, they are
> implemented as part of the [Document Object Model][1].

    function foo() {}
    var id = setTimeout(foo, 1000); // returns a Number > 0

When `setTimeout` gets called, it will return the ID of the timeout and schedule
`foo` to run in **approximately** one thousand milliseconds in the future. 
`foo` will then executed exactly **once**.

Depending on the timer resolution of the JavaScript engine that is running the 
code, as well as the fact that JavaScript is single threaded and other code that 
gets executed might block the thread, it is by no means a safe bet that one will 
get the exact timeout they specified when calling `setTimeout`.

The function that was passed as the first parameter will get called by the
global object, that means that [this](#function.this) inside the called function 
refers to that very object.

    function Foo() {
        this.value = 42;
        this.method = function() {
            // this refers to the global object
            console.log(this.value); // will log undefined
        };
        setTimeout(this.method, 500);
    }
    new Foo();


> **Note:** As `setTimeout` takes a **function object** as its first parameter, an
> often made mistake is to use `setTimeout(foo(), 1000)`, which will use the 
> **return value** of the call `foo` and **not** `foo`. This is, most of the time, 
> a silent error, since when the function returns `undefined` `setTimeout` will 
> **not** raise any error.

### Stacking Calls with `setInterval`

While `setTimeout` only runs the function once, `setInterval` - as the name 
suggests - will execute the function **every** `X` milliseconds. But its use is 
discouraged. 

When code that is being executed blocks the timeout call, `setInterval` will 
still issue more calls to the specified function. This can, especially with small
intervals, result in function calls stacking up.

    function foo(){
        // something that blocks for 1 second
    }
    setInterval(foo, 100);

In the above code `foo` will get called once and will then block for one second.

While `foo` blocks the code `setInterval` will still schedule further calls to
it. Now, when `foo` has finished, there will already be **ten** further calls to
it waiting for execution.

### Dealing with Possible Blocking Code

The easiest as well as most controllable solution, is to use `setTimeout` within
the function itself.

    function foo(){
        // something that blocks for 1 second
        setTimeout(foo, 100);
    }
    foo();

Not only does this encapsulate the `setTimeout` call, but it also prevents the
stacking of calls and it gives additional control.`foo` itself can now decide 
whether it wants to run again or not.

### Manually Clearing Timeouts

Clearing timeouts and intervals works by passing the respective ID to
`clearTimeout` or `clearInterval`, depending which `set` function was used in
the first place.

    var id = setTimeout(foo, 1000);
    clearTimeout(id);

### Clearing all Timeouts

As there is no built in method for clearing all timeouts and/or intervals, 
it is necessary to use brute force in order to achieve this functionality.

    // clear "all" timeouts
    for(var i = 1; i < 1000; i++) {
        clearTimeout(i);
    }

There might still be timeouts that are unaffected by this arbitrary number;
therefore, is is instead recommended to keep track of all the timeout IDs, so
they can be cleared one by one.

### Hidden `eval` Magic

`setTimeout` and `setInterval` can also take a string as their first parameter.
This feature should **never** be used, since it internally makes use of `eval`.

    function foo() {
        // will get called
    }

    function bar() {
        function foo() {
            // never gets called
        }
        setTimeout('foo()', 1000);
    }
    bar();

Since `eval` is not getting [called directly](#core.eval) here, the string passed 
to `setTimeout` will get executed in the global scope; thus, it will not use the 
local variable `foo` from the scope of `bar`.

It is further recommended to **not** use a string to pass arguments to the
function that will get called. 

    function foo(a, b, c) {}
    
    // NEVER use this
    setTimeout('foo(1,2, 3)', 1000)

    // Instead use an anonymous function
    setTimeout(function() {
        foo(a, b, c);
    }, 1000)

> **Note:** While it is also possible to use the syntax 
> `setTimeout(foo, 1000, a, b, c)`, it is not recommended, as its use may lead
> to subtle errors when used with [methods](#function.this).

### In Conclusion

**Never** should a string be used as the parameter of `setTimeout` or 
`setInterval`. It is a clear sign of **really** bad code, when arguments need 
to be supplied to the function that gets called, an anonymous function should
be passed which handles the actual calling. 

Additionally, `setInterval` should be avoided since it is hard to control and
does not adjust to the single threaded nature of the language.

[1]: http://en.wikipedia.org/wiki/Document_Object_Model 

