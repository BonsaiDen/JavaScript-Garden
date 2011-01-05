### Functions and Closures

Functions in JavaScript are, yet again, Objects. This makes them extremely
powerful, you can for example, pass them around as parameters to provide 
callbacks to other methods.

But what really makes them powerful is the fact that JavaScript supports
**Closures**.

Closures mean that scopes *always* have access to the outer scope they were
defined in, and since JavaScript only has one type of scope, namely the function
one, one can use them to great good.

**The Classic "private" Example**

    function Counter(start) {
        var count = start;
        return {
            increment: function() {
                count++;
            },

            get: function() {
                return count;
            }
        }
    }

    var foo = new Counter(4);
    foo.increment();
    foo.get(); // 5

In the above example we return **two closures**, both the function `increment`
as well as `get` keep a reference to the `count` variable defined in the
constructor.

One **cannot** access `count` from the outside, the only way to interact with it
is via the two "closured" functions.

Remember, closures work by keeping a reference to their outer scopes, so the
following does **not** work:

    var foo = new Counter(4);
    foo.hack = function() {
        count = 1337;
    };

This will **not** change the variable `count` that's inside of `Counter` since 
`foo.hack` was not defined in that scope, instead, it will create or override the
global variable `count`.

**Best Practice:** Keep in mind that every time you return a function it's
already a closure, you can use this to hide away internals or as in the above
example, use it to emulate private variables.

