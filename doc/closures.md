### Closures and References

One of JavaScript's most powerful features is the availability of *Closures*.
But it's also one of its most misunderstood features.

Closures mean that scopes **always** keep access to the outer scope they were
defined in. Since JavaScript only has one type of scope - the function scope - 
all functions are by technically closures,

Although the word closure is most commonly used to refer to functions that were 
either returned or passed as an argument.

#### Emulating private Variables

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

    var foo = Counter(4);
    foo.increment();
    foo.get(); // 5

In the above example we return **two closures**. The function `increment` as well
as the function `get`, both keep a *reference* to the scope of  `Counter` and 
therefore always have access to the `count` variable that was defined in **that**
scope.

#### Why private Variables work

Since it's not possible to reference or assign scopes, there's **no** way one 
could access the variable `count` from the outside, the only way to interact with it
is via the two "closured" functions. Therefore `count` is essentially private.

    var foo = new Counter(4);
    foo.hack = function() {
        count = 1337;
    };

This will **not** change the variable `count` in the scope of `Counter` since 
`foo.hack` was not defined in that scope, instead, it will create or override the
*global* variable `count`.

A common mistake made with Closures is not to understand that they keep
a reference to the scope, and not the variables. It's especially important to
understand that they do **not** copy the values of primitives.

#### Closures inside Loops

    for(var i = 0; i < 10; i++) {
        setTimeout(function() {
            console.log(i);  
        }, 1000);
    }

A common misconception is that the above will output the numbers `0` through
`9` after one second. But in reality, the above simply alerts the number `10` ten
times.

The *anonymous* function keeps a reference to `i` and at the time the timeouts 
fire, the loop has already finished and updated the value of `i` to `10`.

In order to get the desired behavior, one has to create a copy of the value of 
`i`. Don't bother with another variable inside the loop, its value will just as 
well get overridden. The trick here is to use an [anonymous
wrapper](#scopes).

#### Avoiding the reference Problem

    for(var i = 0; i < 10; i++) {
        (function(e) {
            setTimeout(function() {
                console.log(e);  
            }, 1000);
        })(i);
    }

Here the outer function gets called immediately with `i` (which is passed by 
value) as its first arguments, therefore we now have a copy of the **value** of 
`i` (named `e`) inside the function

The anonymous function passed to `setTimeout` now has a reference to `e` which
does not get changed by the loop.

#### Best Practices
Understand Closures **and** master them, they are the most powerful feature of
JavaScript. If you're not able to use them correctly you're wasting a lot of the
language's potential.

