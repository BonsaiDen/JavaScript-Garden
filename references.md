### Pass By Value and References

One common pitfall with closures is, that while all values in JavaScript are 
**passed by value**, closures keep **references**.

**Example**

    for(var i = 0; i < 10; i++) {
        setTimeout(function() {
            console.log(i);  
        }, 1000);
    }

A common misconception is that the above will output the numbers `0` through
`9` after one second. But in reality, the above simply alerts the number `10` ten
times.

Remember, closures keep references, so this makes sense, since `i` is
a reference and at the time the timeouts fire, the loop has already finished and
updated the value of `i` to `10`.

So in order to fix it, you have to create a copy of the value of `i`. Don't
bother with another variable inside the loop, its value will just as well get
overridden. The trick here is to use an anonymous wrapper.

**Example**

    for(var i = 0; i < 10; i++) {
        (function(e) {
            setTimeout(function() {
                console.log(e);  
            }, 1000);
        })(i);
    }

Here the outer function gets called immediately with `i` (which is passed by 
value) as its parameter, therefore we now have a copy of the *current* value of 
`i` named `e` inside the function, which then gets referenced by our "closured"
function that gets passed to `setTimeout`.

