### More on Scopes

JavaScript has *only* function scope, there's **no** block scope (although the
language deals fine with the usual syntax for blocks.).

Additionally, there are no distinct namespaces in JavaScript, this means that 
everything gets defined in **one** globally shared namespace.

Each time you reference a variable, JavaScript will search the scopes upwards
until it finds it, if it reaches the global scope and still can't find the
requested name it will raise a `ReferenceError`.

If you want to declare a variable local to the current scope you have to use the
`var` keyword. **Always** use the `var` keyword when declaring variables
otherwise you might override things that were already defined in the outer
scopes, which is *bad*.

**Example**

    var foo = 1; // global variable foo
    var bar = 2; // global variable bar

    function test() {
        var foo = 3; // NEW local variable foo, does NOT affect the global foo
        bar = 4; // we just changed the value of the outer bar
    }

Now as you might already imagine, having only one global scope makes namespace 
clashes *more* than likely.

But there's a simply way to avoid this, you can use an *anoynmous* function
wrapper (we've already seen on of them them in the for loop example above).

**Example**

    (function() {
        // a self contained "namespace"
        
        window.foo = function() {
            // an exposed closure
        };

    })(); // execute the function immediately

By default you cannot just call a function, you need to *evaluate* it first, in
this example this is done by wrapping the *function expression* in parenthesis.
This is the most common style to do this, but everything else that forces the
function to be evaluated works just as well, like for example `+function(){}()`.

**Best Practice:** Always use the anonymous wrapper to encapsulate your code in
case there's any chance it might get used by someone else in their project. 
Also never define any variables in the global namespace, always use `var` to
limit the scope of your variables.

