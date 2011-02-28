## The `Array` constructor

Since the `Array` constructor is ambiguous in how it deals with its parameters,
it is highly recommended to always use the array literals - `[]` notation - 
when creating new arrays.

    [1, 2, 3]; // Result: [1, 2, 3]
    new Array(1, 2, 3); // Result: [1, 2, 3]

    [3]; // Result: [3]
    new Array(3); // Result: [undefined, undefined, undefined] 
    new Array('3') // Result: ['3']

In cases when there is only one argument passed to the `Array` constructor,
and that argument is a `Number`, the constructor will use that number as the 
*length* of the new array to be created.

This behavior only comes in handy in a few cases, like repeating a string, in
which it avoids the use of a `for loop` code.

    new Array(count + 1).join(stringToRepeat);

### In conclusion

The use of the `Array` constructor should be avoided as much as possible. 
Literals are definitely preferred. They are shorter and have a clearer syntax; 
therefore, they also increase the readability of the code.

