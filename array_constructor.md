### The Array Constructor

Always use the `[]` notation to create a new array, the Array constructor has
a horrible flaw in what kind of arguments it takes.

**Example**

    [1, 2, 3]; // New array with three elements
    new Array(1, 2, 3); // Same as above

    [9]; // New array with one element
    new Array(9); // New array of length 9 filled with `undefined`

When there's only one argument being passed to the constructor it will create
a new array of that size, if you don't know this, things will explode

There are only a few cases when single parameter constructor comes in handy, on
of them is to repeat a string:

    new Array(count - 1).join(stringToRepeat);


**Best Practice:** Always use the `[]` notation, it's cleaner and less error
prone.

