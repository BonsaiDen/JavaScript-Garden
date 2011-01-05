### Arrays

Many people, coming from other languages or not, have the conception that since
Arrays are objects too, they can use just the `For In` loop to iterate over them.

Whatever you do, do **NOT** do this. Even though the internals of JavaScript
make this work, it's horrible slow, and not only that, you have you to use 
`hasOwnProperty` too, to make sure you only get the stuff you want.

While one might think that it's a no brainer to trade a small performance loss
against readability, let me say that were not talking about small losses here.

We're talking about a factor of **10x** to **20x** here, depending on engine
version and how many properties there are defined on the array. 

Also if you just want to iterate over a subset of an array, then using `For In` 
with an addtional `if` condition is obviously not the way to go.

So how to do iteration over arrays in JavaScript? Well there's only one way
here, and that is to use the classic `for loop` (with one little extra).

**Example**

    var list = [1, 2, 3, 4, 5, ...... 100000000];
    for(var i = 0, l = list.length; i < l; i++) {
        console.log(list[i]);
    }

So now you might wonder, why is that `l = list.length` in there? Well you might
have already guessed it but I'm going to tell you anyway: Property look ups
are **slow**.

The `length` property of an is special anyways. It's `getter` just returns the
number of elements in the array. But it also has a `setter` which can be used to
*truncate* the array.

**Example**

    var foo = [1, 2, 3, 4, 5, 6];
    foo.length = 3;
    foo; // [1, 2, 3]
    foo.length = 6;
    foo; // [1, 2, 3]

As one can see, assigning a smaller length truncates the array but increasing it 
has no effect on the array whatsoever.

But back to caching the length, while newer JavaScript engines are able to
optimize the access to the `length` property, there are still cases where *not*
caching the length results in a loop that's up to **2x** then the version that
does the caching.

**Best Pratice:** Always use the classical `for` loop and cache the length to
archieve the best performance, don't make any assumptions about the  engine your 
code will be running on.

