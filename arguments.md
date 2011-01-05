### Function Arguments

Inside a JavaScript function you have access to a special variable called
`arguments`, this is useful when writing functions that take a variable number
of arguments. While one might think that this is just a normal `Array` containing
the arguments that were passed to the function, but it's not.

The `arguments` `Object` kinda works like an `Array` but does not inherit from
`Array.prototype` so while it has a `length` property and you can use it with
a normal `for` loop, it does **not** have methods like `slice`, `push`, `pop`
etc.

There are cases were you need to convert it into a normal array, then you have
to use the following line of code:
    
    Array.prototype.slice.call(arguments);

.....................
