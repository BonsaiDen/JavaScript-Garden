## `undefined` and `null`

JavaScript has two distinct values for "nothing", the more useful of those two
being `undefined`.

### The value `undefined`

`undefined` is a type with exactly one value: `undefined`.

The language also defines a global variable that has the value of `undefined`,
this variable is also called `undefined`. But this variable is **not** a constant,
meaning that it can be easily overwritten which then leads to abstruse bugs. 

The value `undefined` is returned in the following cases:

 - Accessing the (unmodified) global variable `undefined`
 - Implicit returns of functions due to missing `return` statements
 - `return` statements which don't explicitly return anything
 - Lookups of non existent properties
 - Function parameters which don't had any explicit value passed
 - Anything that has been set to the value of `undefined`


### The case of the "overridden" `undefined`

Since the variable `undefined` only has the value of `undefined`, changing its 
value does not change the value of the **type** `undefined`.

Still, in order to compare something against the value of `undefined` it is
necessary to retrieve the value of `undefined` in the first place.

In order to protect code against a possible overwritten `undefined` variable, a 
common technique used is to add an additional parameter to the encapsulation
[anonymous wrapper](#scopes), which gets no argument passed to it.

    var undefined = 123;
    (function(something, foo, undefined) {
        // undefined in the local scope does 
        // now again refer to the value

    })('Hello World', 42);

### Uses of `null`

While `undefined` in the context of the JavaScript language is mostly used in
the sense of a traditional null, the actual `null` (both a literal and a type)
is more or less just another data type.

It is used in some JavaScript internals (like declaring the end of the
prototype chain by setting `Foo.prototype = null`), but in almost all cases it
can be replaced by `undefined`.

