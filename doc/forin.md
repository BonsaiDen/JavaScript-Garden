### The For In Loop

Just like the `in` operator, the `for in` loop does also traverse the prototype
chain when iterating over the properties of an `Object`.

> **Note:** The `for in` loop it will **not** iterate over any properties that have
> their `enumerable` attribute set to `false`, for example the `length`property of 
> an `Array`.

Since you cannot change the behavior of the `for in` loop itself, you have to
filter out the unwanted properties in the loop body by using 
[`hasOwnProperty`](#hasownproperty). It should also be noted that due to its
nature of traversing the complete prototype chain, the `for in` loop can get
incredible slow for complex inheritance structures.

**Example**

    Object.prototype.bar = 1; // poisoning the Object.prototype, NEVER do this
    var foo = {moo: 2};
    for(var i in foo) {
        console.log(i);
    }

The above code results in both `bar` and `moo` being printed out.

**Example**

    for(var i in foo) { // still the foo from above
        if (foo.hasOwnProperty(i)) {
            console.log(i);
        }
    }

This version is the only correct one, it will **only** print out `moo`. If you 
don't use  `hasOwnProperty`, your code is prone to errors when the native 
prototypes - for example `Object.prototype` have been extended.

One widely used Framework which does this, is **Prototype.js**. If your code ever
ends up on a site which includes that Framework, and it does **not** use
`hasOwnProperty`, it is basically **guaranteed** to break.

#### Best Practices
Always use `hasOwnProperty`. Never make any assumptions on the built in 
prototypes being extended or not. 

