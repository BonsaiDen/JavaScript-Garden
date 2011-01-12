## Function arguments

Inside of functions JavaScript injects a special variable into the scope of the
function, this variable is called `arguments` and holds a list of all the
arguments that were passed to the function.

It's important to know that `arguments` is **not** an `Array`, it has some of
the semantics of an array - namely the `length` property - but it does not
inherit from `Array.prototype`, it is in fact an `Object`.

Due to this, it is not possible to use the standard array methods like `push`,
`pop` or `slice` on it. While iteration with a plain `for` loop works just fine,
one has convert it to a real `Array` in order to use the those methods.

### Converting to an array
    
    Array.prototype.slice.call(arguments);

The above will return a new `Array` containing all the elements of the `arguments`
object. This conversion is **slow**, it is not recommended to use it in
performance critical code.

> **Note:** Don't use `arguments` as the name of a function parameter, since it
> due the nature of [name resolution](#scopes) in JavaScript this parameter will
> override the `arguments` object.

