## The `Array` constructor

It's good practice to always use the `[]` notation to create new arrays. The `Array`
constructor is ambiguous in how it deals with its parameters:

    [1, 2, 3]; // Result: [1, 2, 3]
    new Array(1, 2, 3); // Result: [1, 2, 3]

    [3]; // Result: [3]
    new Array(3); // Result: [undefined, undefined, undefined] 
    new Array('3') // Result: ['3']

When there's only one argument being passed to the `Array` constructor, and that
argument is a `Number`, the constructor will use that number as the length of
the new array to be created.

This behavior only comes in handy in a few cases, like repeating a string.

    new Array(count + 1).join(stringToRepeat);

### Best practices

The use of the `Array` constructor should be avoided if possible. The `[]` notation is
definitely preferred here.

