## Function arguments

Inside the scope of a function JavaScript injects a special variable into. This 
variable is called `arguments` and holds a list of all the arguments that were 
passed to the function.

This `arguments` variable is **not** an `Array`. It has some of the semantics of
an array - namely the `length` property - but it does not inherit from 
`Array.prototype`. It is in fact an `Object`.

Due to this, it is not possible to use standard array methods like `push`,
`pop` or `slice` on `arguments`. While iteration with a plain `for` loop works 
just fine, one has convert it to a real `Array` in order to use the array like 
methods.

### Converting to an array

    Array.prototype.slice.call(arguments);

The above will return a new `Array` containing all the elements of the `arguments`
object. This conversion is **slow**, it is not recommended to use it in
performance critical code.

> **Note:** Do **not** use `arguments` as the name of a function parameter, due 
> to the fact how [name resolution](#scopes) in JavaScript works, the parameter 
> will override the default `arguments` object.

