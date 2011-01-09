### Arrays

Although the `Array` in JavaScript is an `Object`, there's no good reason to use
the [for in loop](#the-for-in-loop) in order to iterate over it. In fact there
a number of very good reasons **against** the use of `for in` on an `Array`.

> **Note:** There are **no** so called *associative arrays* in JavaScript. 
> JavaScript only has [objects](#objects) for mapping keys to values. And while 
> *associative arrays* **preverse** order, objects do **not**.

While it may seem like a good choice at first, to trade the some speed against
the readability of the `for in` construct, this has **major** implications on
performance.

The `for in` does in fact iterate over the indexes of an `Array`. But it does
also traverse the prototype chain. So one already has to use `hasOwnProperty` in
order to make sure to filter out unwanted properties, and still if any
additional properties happen to be defined on the array, they will still make it
through this filter.

Combining the already slow nature of the prototype traversing `for in` with the
use of `hasOwnProperty` results in a performance degradation of a factor of up
to **20x**.

So if you want to iterate over an `Array` in JavaScript, **always** use the
classic `for` loop construct.

    var list = [1, 2, 3, 4, 5, ...... 100000000];
    for(var i = 0, l = list.length; i < l; i++) {
        console.log(list[i]);
    }

As you can see, there's one extra catch in the above example. That is the
caching of the length via `l = list.length`.

Although the `length` property is defined on the array itself, there's still an
overhead for doing the lookup on each iteration. And while recent JavaScript
engines **may** apply optimization in this case, one can never be sure that
those optimizations are actually in place, nor can one be sure whether they
reach the speed of the above caching. In fact leaving out the caching may result
in a performance degradation of a factor of up to **2x** (and even more in older
engines).

**The length Property**

The `length` property of an `Array` is not just a plain property. While its 
`getter` just returns the number of elements in the array, its `setter` on 
the other hand can be used to **truncate** the array.

    var foo = [1, 2, 3, 4, 5, 6];
    foo.length = 3;
    foo; // [1, 2, 3]
    foo.length = 6;
    foo; // [1, 2, 3]

As one can see, assigning a smaller length truncates the array, but increasing 
the length it has no effect at all.

#### Best Practices
Always use the `for` construct and cache the length to achieve the best 
performance, don't make any assumptions about the JavaScript engine optimizing 
**anything**.
 
