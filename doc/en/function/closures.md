## Closures and References

One of JavaScript's most powerful features is the availability of *closures*.
With closures, scopes **always** keep access to the outer scope, in which they
were defined. Since the only scoping that JavaScript has is 
[function scope](#function.scopes), all functions, by default, act as closures.

### Emulating private variables

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

Here, `Counter` returns **two** closures: the function `increment` as well as 
the function `get`. Both of these functions keep a **reference** to the scope of 
`Counter` and, therefore, always keep access to the `count` variable that was 
defined in that scope.

### Why Private Variables Work

Since it is not possible to reference or assign scopes in JavaScript, there is 
**no** way of accessing the variable `count` from the outside. The only way to 
interact with it is via the two closures.

    var foo = new Counter(4);
    foo.hack = function() {
        count = 1337;
    };

The above code will **not** change the variable `count` in the scope of `Counter`, 
since `foo.hack` was not defined in **that** scope. It will instead create - or 
override - the *global* variable `count`.

### Closures Inside Loops

One often made mistake is to use closures inside of loops, as if they were
copying the value of the loop's index variable.

    for(var i = 0; i < 10; i++) {
        setTimeout(function() {
            console.log(i);  
        }, 1000);
    }

The above will **not** output the numbers `0` through `9`, but will simply print
the number `10` ten times.

The *anonymous* function keeps a **reference** to `i`. At the time 
`console.log` gets called, the `for loop` has already finished, and the value of 
`i` has been set to `10`.

In order to get the desired behavior, it is necessary to create a **copy** of 
the value of `i`.

### Avoiding the Reference Problem

In order to copy the value of the loop's index variable, it is best to use an 
[anonymous wrapper](#function.scopes).

    for(var i = 0; i < 10; i++) {
        (function(e) {
            setTimeout(function() {
                console.log(e);  
            }, 1000);
        })(i);
    }

The anonymous outer function gets called immediately with `i` as its first 
argument and will receive a copy of the **value** of `i` as its parameter `e`.

The anonymous function that gets passed to `setTimeout` now has a reference to 
`e`, whose value does **not** get changed by the loop.

There is another possible way of achieving this, which is to return a function 
from the anonymous wrapper that will then have the same behavior as the code 
above.

    for(var i = 0; i < 10; i++) {
        setTimeout((function(e) {
            return function() {
                console.log(e);
            }
        })(i), 1000)
    }

There's yet another way to accomplish this by using `.bind`, which can bind
a `this` context and arguments to function. It behaves identially to the code
above

    for(var i = 0; i < 10; i++) {
        setTimeout(console.log.bind(console, i), 1000);
    }
