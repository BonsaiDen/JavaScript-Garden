## Closures and references

One of JavaScript's most powerful features is the availability of *closures*.

Closures mean that scopes **always** keep access to the outer scope they were
defined in. Since the only scope that JavaScript has is the 
[function scope](#scopes), all functions, by default, act like closures.

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

In the above example `Counter` returns **two** closures. The function `increment`
as well as the function `get`. Both of these functions keep a **reference** to 
the scope of `Counter` and therefore always have access to the `count` variable 
that was defined in that **very** scope.

### Why private variables work

Since it is not possible to reference or assign scopes in JavaScript, there is 
**no** way of accessing the variable `count` from the outside. The only way to 
interact with it is via the two closures.

    var foo = new Counter(4);
    foo.hack = function() {
        count = 1337;
    };

This code will **not** change the variable `count` in the scope of `Counter`, 
since `foo.hack` was not defined in **that** scope, instead, it will create 
(or override) the *global* variable `count`.

### Closures inside loops

One mistake that is often made with closures is that they are used like if they
were copying primitive values, while they are in fact **referencing** the
variables which hold those values.

    for(var i = 0; i < 10; i++) {
        setTimeout(function() {
            console.log(i);  
        }, 1000);
    }

The above will **not** output the numbers `0` through `9`, it will simply print
the number `10` ten times.

The *anonymous* function keeps a reference to `i` and at the time `console.log`
gets called, the `for` loop has already finished and updated the value of `i` to 
`10`.

In order to get the desired behavior, it is necessary to create a **copy** of 
the value of `i`.

### Avoiding the reference problem

In order to copy the value of the loop its index variable, it is best to use an 
[anonymous wrapper](#scopes).

    for(var i = 0; i < 10; i++) {
        (function(e) {
            setTimeout(function() {
                console.log(e);  
            }, 1000);
        })(i);
    }

The anonymous outer function gets called immediately with `i` as the first 
argument, therefore it will receive a copy of the **value** of `i` as its 
parameter `e`.

The anonymous function that gets passed to `setTimeout` now has a reference to 
`e`, which value does **not** get changed by the loop.

There is another possible way of achieving this. It is possible to return a 
function from the anonymous wrapper, which will then have the same result as the
code above.

    for(var i = 0; i < 10; i++) {
        setTimeout((function(e) {
            return function() {
                console.log(e);
            }
        })(i), 1000)
    }

### In conclusion

It is important to understand **and** master closures, they are the most powerful
feature of JavaScript and are used pretty much everywhere when it comes to
elegant and efficient code.

