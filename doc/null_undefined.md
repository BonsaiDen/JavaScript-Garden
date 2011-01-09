### Null and Undefined

JavaScript has two distinct values for "nothing", the more useful of those two
being `undefined`.

To make matters even more confusing, there's both the `value` (and type) of
`undefined` as well as a global variable **called** `undefined`, as said this is
a variable and **not** a literal or keyword.

This variable **can** be overridden, leading to abstruse bugs.

#### The value undefined

The value `undefined` is returned in the following cases:

 - Implicit returns of functions due to missing `return` statements
 - `return` statements which don't explicitly return anything
 - Lookups of non existent properties
 - Function parameters which don't had any explicit value passed
 - Anything that has been set to the value of `undefined`


#### The case of the "overridden" undefined

Again, the variable `undefined` is just another normal variable, changing its
value does not change the value of the **type** `undefined`.

Still, in order to compare something against the value of `undefined` one has
to get the value in the first place.

In order to protect code against the possibility of an overridden variable
`undefined` (which definitely happens in the wild) a common idiom is to use the
anonymous function wrapper and add an additional parameter which one passed
**no** argument for.

    var undefined = 123;
    (function(something, foo, undefined) {
        // undefined in the local scope does now again refer to the value
        // undefined

    })('Hello World', 42);

#### Uses of null

While `undefined` in the context of the JavaScript language is mostly used in
the sense of a traditional null, the actual `null` (both a literal and a type)
is more or less just another data type.

While it is uses in some JavaScript internals (like declaring the end of the
prototype chain by setting `Foo.prototype = null`), it can almost ever be
replace by `undefined`.

