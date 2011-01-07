### Function Arguments

Inside a JavaScript function you have access to a special variable called
`arguments`, which is a list of the parameters the function was called with. This 
is useful when writing functions that deal with variable number of arguments. 

It's important to know that `arguments` is **not** an `Array`, it has some of
the semantics of an array - namely the `length` property - but it does not
inherit from `Array.prototype`, it is an `Object`.

Due to this fact, one cannot use the standard array methods like `push`, `pop`,
`slice` etc. with it. While iteration with a plain `for` loop works just fine,
one has convert it to a real `Array` in order to use the named methods.
    
    Array.prototype.slice.call(arguments);

This will return a new `Array` containing all the elements from the `arguments`
object, note that this is **slow**, try to avoid at all costs in performance
critical code. 

> **Note:** Don't use `arguments` as a parameter name for functions, since it will 
> [override](#scopes-and-namespaces) the default `arguments` object.

