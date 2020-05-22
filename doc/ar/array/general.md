## Array Iteration and Properties

Although arrays in JavaScript are objects, there are no good reasons to use
the [`for in`](#object.forinloop) loop. In fact, there 
are a number of good reasons **against** the use of `for in` on arrays.

> **Note:** JavaScript arrays are **not** *associative arrays*. JavaScript only 
> has [objects](#object.general) for mapping keys to values. And while associative 
> arrays **preserve** order, objects **do not**.

Because the `for in` loop enumerates all the properties that are on the prototype 
chain and because the only way to exclude those properties is to use 
[`hasOwnProperty`](#object.hasownproperty), it is already up to **twenty times** 
slower than a normal `for` loop.

### Iteration

In order to achieve the best performance when iterating over arrays, it is best
to use the classic `for` loop.

    var list = [1, 2, 3, 4, 5, ...... 100000000];
    for(var i = 0, l = list.length; i < l; i++) {
        console.log(list[i]);
    }

There is one extra catch in the above example, which is the caching of the 
length of the array via `l = list.length`.

Although the `length` property is defined on the array itself, there is still an
overhead for doing the lookup on each iteration of the loop. And while recent 
JavaScript engines **may** apply optimization in this case, there is no way of
telling whether the code will run on one of these newer engines or not. 

In fact, leaving out the caching may result in the loop being only **half as
fast** as with the cached length.

### The `length` Property

While the *getter* of the `length` property simply returns the number of
elements that are contained in the array, the *setter* can be used to 
**truncate** the array.

    var arr = [1, 2, 3, 4, 5, 6];
    arr.length = 3;
    arr; // [1, 2, 3]

    arr.length = 6;
    arr.push(4);
    arr; // [1, 2, 3, undefined, undefined, undefined, 4]

Assigning a smaller length truncates the array. Increasing it creates a sparse array.

### In Conclusion

For the best performance, it is recommended to always use the plain `for` loop
and cache the `length` property. The use of `for in` on an array is a sign of
badly written code that is prone to bugs and bad performance. 

