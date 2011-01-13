## Arrays

Although arrays in JavaScript are objects, there's are no good reasons to use
the [for in loop](#forinloop) in order to iterate over them. In fact there
a number of good reasons **against** the use of `for in` on arrays.

> **Note:** JavaScript arrays are **not** *associative arrays*. JavaScript only 
> has [objects](#objects) for mapping keys to values. And while associative 
> arrays **preserve** order, objects do **not**.

While the `for in` loop does in fact iterate over the indexes of an array, this 
it not the only thing it iterates over - it will also traverse the prototype chain. 

This already adds the overhead of using `hasOwnProperty` in order to ensure that 
everything besides the indexes is ignored. And still, if any additional 
properties happen to be defined on the array itself, those will still pass the 
filtering via `hasOwnProperty`.

Combining the already slow nature of the prototype traversing `for in` loop with
the use of `hasOwnProperty` results in a performance degradation of a factor of 
up to **20x**.

### Efficient iterating

In order to achieve the best performance when iterating over arrays, it is best
to use the classic `for` loop.

    var list = [1, 2, 3, 4, 5, ...... 100000000];
    for(var i = 0, l = list.length; i < l; i++) {
        console.log(list[i]);
    }

There is one extra catch in the above example, which is the caching of the 
length of the array via `l = list.length`.

Although the `length` property is defined on the array itself, there's still an
overhead for doing the lookup on each iteration of the loop. And while recent 
JavaScript engines **may** apply optimization in this case, there is no way of
telling whether the code will run on one of these newer engines or not, and 
leaving out the caching may result in a performance degradation of a factor of 
up to **2x** or more.

### The `length` property

While the *getter* of the `length` property simply act like such one, the
*setter* can be used to **truncate** the array.

    var foo = [1, 2, 3, 4, 5, 6];
    foo.length = 3;
    foo; // [1, 2, 3]

    foo.length = 6;
    foo; // [1, 2, 3]

Assigning a smaller length does truncate the array, but increasing the length has no 
effect on the array.

### Best practices

Always use the `for` construct and cache the length to achieve the best 
performance, and don't make any assumptions about the JavaScript engine optimizing 
**anything**.
 
