### `setTimeout` and `setInterval`

Since JavaScript is asynchronous, it is possible to schedule the execution of a 
function using the `setTimeout` and `setInterval` functions.

> **Note:** Timeouts are **not** part of the ECMAScript standard. They were
> implemented in [BOM, or DOM Level 0][1], which are never defined nor
> documented formally. No recommended specification has been published so far,
> however, they are currently being standardized by [HTML5][2]. Due to this 
> nature, the implementation may vary from browsers and engines.

    function foo() {}
    var id = setTimeout(foo, 1000); // returns a Number > 0

When `setTimeout` is called, it returns the ID of the timeout and schedule
`foo` to run **approximately** one thousand milliseconds in the future. 
`foo` will then be executed **once**.

Depending on the timer resolution of the JavaScript engine running the code, as
well as the fact that JavaScript is single threaded and other code that gets
executed might block the thread, it is by **no means** a safe bet that one will
get the exact delay specified in the `setTimeout` call.

The function that was passed as the first parameter will get called by the
*global object*, which means that [`this`](#function.this) inside the called function 
refers to the global object.

    function Foo() {
        this.value = 42;
        this.method = function() {
            // this refers to the global object
            console.log(this.value); // will log undefined
        };
        setTimeout(this.method, 500);
    }
    new Foo();


> **Note:** As `setTimeout` takes a **function object** as its first parameter, a
> common mistake is to use `setTimeout(foo(), 1000)`, which will use the 
> **return value** of the call `foo` and **not** `foo`. This is, most of the time, 
> a silent error, since when the function returns `undefined` `setTimeout` will 
> **not** raise any error.

### Stacking Calls with `setInterval`

While `setTimeout` only runs the function once, `setInterval` - as the name 
suggests - will execute the function **every** `X` milliseconds, but its use is 
discouraged. 

When code that is being executed blocks the timeout call, `setInterval` will 
still issue more calls to the specified function. This can, especially with small
intervals, result in function calls stacking up.

    function foo(){
        // something that blocks for 1 second
    }
    setInterval(foo, 1000);

In the above code, `foo` will get called once and will then block for one second.

While `foo` blocks the code, `setInterval` will still schedule further calls to
it. Now, when `foo` has finished, there will already be **ten** further calls to
it waiting for execution.

### Dealing with Possible Blocking Code

The easiest solution, as well as most controllable solution, is to use `setTimeout` within
the function itself.

    function foo(){
        // something that blocks for 1 second
        setTimeout(foo, 1000);
    }
    foo();

Not only does this encapsulate the `setTimeout` call, but it also prevents the
stacking of calls and gives additional control. `foo` itself can now decide 
whether it wants to run again or not.

### Manually Clearing Timeouts

Clearing timeouts and intervals works by passing the respective ID to
`clearTimeout` or `clearInterval`, depending on which `set` function was used
in the first place.

    var id = setTimeout(foo, 1000);
    clearTimeout(id);

### Clearing All Timeouts

As there is no built-in method for clearing all timeouts and/or intervals, 
it is necessary to use brute force in order to achieve this functionality.

    // clear "all" timeouts
    for(var i = 1; i < 1000; i++) {
        clearTimeout(i);
    }

But there might still be timeouts that are unaffected by this arbitrary number.
Another way of doing this is to consider that the ID given to a timeout is
incremented by one every time you call `setTimeout`.

    // clear "all" timeouts
    var biggestTimeoutId = window.setTimeout(function(){}, 1),
    i;
    for(i = 1; i <= biggestTimeoutId; i++) {
        clearTimeout(i);
    }

Even though this works on all major browsers today, it isn't specified that
the IDs should be ordered that way and it may change. Therefore, it is instead
recommended to keep track of all the timeout IDs, so they can be cleared
specifically.

### Hidden Use of `eval`

`setTimeout` and `setInterval` can also take a string as their first parameter.
This feature should **never** be used because it internally makes use of `eval`.

> **Note:** The exact workings when a string is passed to them might differ in
> various JavaScript implementations. For example, Microsoft's JScript uses
> the `Function` constructor in place of `eval`.

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

Since `eval` is not getting called [directly](#core.eval) in this case, the string 
passed to `setTimeout` will be executed in the *global scope*; thus, it will 
not use the local variable `foo` from the scope of `bar`.

It is further recommended to **not** use a string to pass arguments to the
function that will get called by either of the timeout functions. 

    function foo(a, b, c) {}
    
    // NEVER use this
    setTimeout('foo(1, 2, 3)', 1000)

    // Instead use an anonymous function
    setTimeout(function() {
        foo(1, 2, 3);
    }, 1000)

> **Note:** While it is also possible to use `setTimeout(foo, 1000, 1, 2, 3)`
> syntax, it is not recommended, as its use may lead
> to subtle errors when used with [methods](#function.this).
> Furthermore, the syntax might not work in some JavaScript implementations.
> For example, Microsoft's Internet Explorer [does **not** pass the arguments directly to the callback](3).

### In Conclusion

A string should **never** be used as the parameter of `setTimeout` or 
`setInterval`. It is a clear sign of **really** bad code, when arguments need 
to be supplied to the function that gets called. An *anonymous function* should
be passed that then takes care of the actual call.

Furthermore, the use of `setInterval` should be avoided because its scheduler is not
blocked by executing JavaScript.

[1]: http://www.nczonline.net/blog/2009/09/29/web-definitions-dom-ajax-and-more/ "Web definitions: DOM, Ajax, and more"
[2]: http://www.w3.org/TR/2014/WD-html5-20140617/webappapis.html#timers "6 Web application APIs - HTML5"
[3]: http://msdn.microsoft.com/en-us/library/ie/ms536753(v=vs.85).aspx "setTimeout method (Internet Explorer)"
