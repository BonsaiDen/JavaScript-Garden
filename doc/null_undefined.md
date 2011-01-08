### Null and Undefined

There's some confusion about what those two values are used for.

`undefined` is just a type, but there is also the *variable* called `undefined` which 
defaults to the value `undefined`, but whose value **can** be changed. All 
variables that have not been assigned any value default to the *value* 
`undefined`.

In the case of unsupplied function arguments *or* when trying to access 
properties of an object which are not defined on the object itself and cannot be 
found by searching the prototype chain, JavaScript will also return 
the value `undefined`. 

#### Getting a fresh undefined Variable

To protect oneself against changes to the value of the variable `undefined`, you
can get a new one by having an extra argument on your anonymous wrapper
function, for which you do **not** pass a value:

    (function(undefined) {
        // now we have a fresh version of the undefined variable
    })(); // don't pass any value so that the argument defaults to undefined

#### null

`null` in JavaScript is both a literal and a type.

While `null` is used a lot in the internals of objects and can, at many places, be
used in exchange with `undefined`, it's mostly just another data type when it
comes to JavaScript programming.

