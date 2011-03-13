## The `Array` Constructor

Since the `Array` constructor is ambiguous in how it deals with its parameters,
it is highly recommended to always use the array literals - `[]` notation - 
when creating new arrays.

    [1, 2, 3]; // Result: [1, 2, 3]
    new Array(1, 2, 3); // Result: [1, 2, 3]

    [3]; // Result: [3]
    new Array(3); // Result: []
    new Array('3') // Result: ['3']

In cases when there is only one argument passed to the `Array` constructor,
and that argument is a `Number`, the constructor will return a new *sparse* 
array with the `length` property set to the value of the argument. It should be 
noted that **only** the `length` property of the new array will be set this way, 
the actual indexes of the array will not be initialized. 

    var arr = new Array(3);
    arr[1]; // undefined
    1 in arr; // false, the index was not set

The behavior of being able to set the length of the array upfront only comes in 
handy in a few cases, like repeating a string, in which it avoids the use of a 
`for loop` code.

    new Array(count + 1).join(stringToRepeat);

### In conclusion

The use of the `Array` constructor should be avoided as much as possible. 
Literals are definitely preferred. They are shorter and have a clearer syntax; 
therefore, they also increase the readability of the code.

