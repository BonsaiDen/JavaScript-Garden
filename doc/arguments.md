## The `arguments` object

Every function scope in JavaScript can access the special variable `arguments`.
This variable holds a list of all the arguments that were passed to the function.

> **Note:** In case `arguments` has already been defined inside the functions
> scope either via a `var` statement or being the name of a formal parameter,
> the `arguments` object will not be created.

The `arguments` variable is **not** an `Array`. While it has some of the 
semantics of an array - namely the `length` property - it does not inherit from 
`Array.prototype` and is in fact an `Object`.

Due to this, it is not possible to use standard array methods like `push`,
`pop` or `slice` on `arguments`. While iteration with a plain `for` loop works 
just fine, it is necessary to convert it to a real `Array` in order to use the 
array like methods on it.

### Converting to an array

The code below will return a new `Array` containing all the elements of the 
`arguments` object.

    Array.prototype.slice.call(arguments);

This conversion is **slow**, it is not recommended to use it in performance 
critical sections of code.

### Modification "magic"

The `arguments` object creates getter and setter functions for both its properties
as well as the function's formal parameters.

As a result, changing the value of a formal parameter will also change the value
corresponding formal parameter, and the other way around.

    function foo(a, b, c) {
        arguments[0] = 2;
        a; // 2                                                           

        b = 4;
        arguments[1]; // 4

        var d = c;
        d = 9;
        c; // 3
    }
    foo(1, 2, 3);

### Performance myths and truths

The `arguments` is, except for the two cases named at the start of this section,
always created. It doesn't matter whether it is used or not. Both getters and
setters are **always** created; thus, using it has nearly no performance impact
at all, especially not in real world code where there is more than an access to
the arguments object properties.

> **ES5 Note:** These getters and setters are not created in strict mode.

However, there is one case which will drastically reduce the performance in
modern JavaScript engines. That case is the use of `arguments.callee`.

    function foo() {
        arguments.callee; // do something with this function object
        arguments.callee.caller; // and the calling function object
    }

    function bigLoop() {
        for(var i = 0; i < 100000; i++) {
            foo(); // Would normally be inlined...
        }
    }

In the above code, `foo` can no longer be a subject to [inlining][1] since it 
needs to know about both itself and its caller. This not only defeats possible 
performance gains due to inlining, it also breaks encapsulation since the 
function may now be dependent on being called in a specific context.

It is highly recommended to **never** make use of `arguments.callee` or any of 
its properties.

> **ES5 Note:** In strict mode, `arguments.callee` will throw a `TypeError` since 
> its use has been deprecated.

[1]: http://en.wikipedia.org/wiki/Inlining

