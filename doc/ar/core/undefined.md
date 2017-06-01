## `undefined` and `null`

JavaScript has two distinct values for nothing, `null` and `undefined`, with
the latter being more useful.

### The Value `undefined`

`undefined` is a type with exactly one value: `undefined`.

The language also defines a global variable that has the value of `undefined`;
this variable is also called `undefined`. However, this variable is **neither** a constant
nor a keyword of the language. This means that its *value* can be easily 
overwritten.

> **ES5 Note:** `undefined` in ECMAScript 5 is **no longer** *writable* in strict
> mode, but its name can still be shadowed by for example a function with the name 
> `undefined`.

Here are some examples of when the value `undefined` is returned:

 - Accessing the (unmodified) global variable `undefined`.
 - Accessing a declared *but not* yet initialized variable.
 - Implicit returns of functions due to missing `return` statements.
 - `return` statements that do not explicitly return anything.
 - Lookups of non-existent properties.
 - Function parameters that do not have any explicit value passed.
 - Anything that has been set to the value of `undefined`.
 - Any expression in the form of `void(expression)`

### Handling Changes to the Value of `undefined`

Since the global variable `undefined` only holds a copy of the actual *value* of 
`undefined`, assigning a new value to it does **not** change the value of the 
*type* `undefined`.

Still, in order to compare something against the value of `undefined`, it is
necessary to retrieve the value of `undefined` first.

To protect code against a possible overwritten `undefined` variable, a common
technique used is to add an additional parameter to an [anonymous
wrapper](#function.scopes) that gets no argument passed to it.

    var undefined = 123;
    (function(something, foo, undefined) {
        // undefined in the local scope does 
        // now again refer to the value `undefined`

    })('Hello World', 42);

Another way to achieve the same effect would be to use a declaration inside the 
wrapper.

    var undefined = 123;
    (function(something, foo) {
        var undefined;
        ...

    })('Hello World', 42);

The only difference here is that this version results in 4 more bytes being
used in case it is minified, and there is no other `var` statement inside the
anonymous wrapper.

### Uses of `null`

While `undefined` in the context of the JavaScript language is mostly used in
the sense of a traditional *null*, the actual `null` (both a literal and a type)
is more or less just another data type.

It is used in some JavaScript internals (like declaring the end of the
prototype chain by setting `Foo.prototype = null`), but in almost all cases, it
can be replaced by `undefined`.


