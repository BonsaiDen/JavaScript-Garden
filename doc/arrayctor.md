## The `Array` Constructor

Always use the `[]` notation to create a new array, the `Array` is ambiguous in 
how it deals with its parameters.

    [1, 2, 3]; // Result: [1, 2, 3]
    new Array(1, 2, 3); // Result: [1, 2, 3]

    [3]; // Result: [3]
    new Array(3); // Result: [undefined, undefined, undefined] 
    new Array('3') // Result: ['3']

When there's only one argument being passed to the `Array` constructor and that
argument is a `Number`, the constructor will use that number as the length of
the new array to be create.

There are only a few cases when the above behaviour comes in handy, on of them is
to repeat a string:

    new Array(count - 1).join(stringToRepeat);

### Best Practices

Always use the `[]` notation, not only is is shorter and easier to read, it's
also consistent in its behavior. If you see code that uses the `Array`
constructor without any good reason, that a clear sign that somethings wrong.

