### `setTimeout` and `setInterval`

Since JavaScript is asynchronous, one can schedule the execution of a function by
using the `setTimeout` and `setInterval` functions.

> **Note:** Timeouts are **not** part of the EcmaScript Standard, they are
> implemented as part of the [<abbr title="Document Object Model">DOM</abbr>][1].

    function foo() {
    }
    var id = setTimeout(foo, 1000); // returns a Number > 0

When `setTimeout` gets called, it will return the ID of the timeout, and schedule
`foo` to run in **approximately** one thousand milliseconds in the future. 
`foo` will then executed exactly once.

Depending on the timer resolution of the JavaScript engine running  the code, 
and the fact that JavaScript is single threaded and other code that gets executed
might block the thread, it's by no means a safe bet that one will get the exact 
timeout they specified when calling `setTimeout`.

> **Note:** As `setTimeout` takes a **function object** as its first parameter, an
> oft made mistake is to use something like `setTimeout(foo(), 1000)`, which
> will use the **return value** of the call `foo` and **not** `foo`. This is,
> most of the time, a silent error, since when the function returns `undefined`
> `setTimeout` won't raise an error, but simply do nothing.

### Stacking calls with `setInterval`

While `setTimeout` only runs the function once, `setInterval` - as the name 
suggests - will execute the function **every** `X` milliseconds. But its use is 
discouraged. 

When executing code blocks the timeout call, `setInterval` will still issue more
calls to the specified function. This can, especially with small intervals, result 
in function calls stacking up.

    function foo(){
        // something that blocks for 1 second
    }
    setInterval(foo, 100);

In the above code `foo` will get called once and then block for one second.
While `foo` blocks the code `setInterval` will still schedule further calls to
it. Now when `foo` has finished, there will already be **ten** further calls to
waiting to for execution.

### Dealing with possible blocking code

The easiest as well as most controllable solution is to use `setTimeout` within
the function itself.

    function foo(){
        // something that blocks for 1 second
        setTimeout(foo, 100);
    }
    foo();

Not only does this encapsulate the `setTimeout` call, but it also prevents the
stacking of calls from happening and it gives additional control since `foo` can
now decide on its own whether it wants to run again or not.

### Manually clearing timeouts

In order to remove set timeouts and intervals one has to use `clearTimeout` and
`clearInterval` and supply to them the ID that was return by the corresponding
`set` calls.

    var id = setTimeout(foo, 1000);
    clearTimeout(id);

### Clearing all timeouts

As there is no built in method to clear all timeouts or intervals, one has to use brute
force:

    // clear "all" timeouts
    for(var i = 0; i < 1000000; i++) {
        clearTimeout(i);
    }

Note that there might be even higher IDs then in the above example, so make sure 
to keep track of your timeout IDs, so you can avoid code such as the above.

### Things to avoid at all costs

`setTimeout` and `setInterval` can also take a string as their first parameter.
Do **not** make use of this feature, since it internally makes use of `eval`.

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

Since `eval` is not getting [called directly](#eval) here, the string passed to
`setTimeout` will get executed in the global scope and will therefore not use 
the local `foo` of `bar`.

Also, if you need to pass parameters to the function you're scheduling a timeout
for, do **not** use `setTimeout('foo(1,2, 3)', 1000)`, simply use an anonymous
function.

    function foo(a, b, c) {
    }

    setTimeout(function() {
        foo(a, b, c);
    }, 1000)

### Best Practices

**Never** use a string as the parameter of `setTimeout` or `setInterval` its a
sign of **really** bad code, if you need to supply arguments to the function,
pass an anonymous function which then calls your function. Also avoid
`setInterval` since its hard to control and when you loose the returned ID,
there's no easy way to clear it.

 [1]: http://en.wikipedia.org/wiki/Document_Object_Model 

