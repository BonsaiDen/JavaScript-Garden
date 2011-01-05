### The For In Loop

Just like the `in` operator, the `for in` loop also does traverse the prototype
chain when iterating over an object's properties. Although it will *not* include
properties that have their `enumerable` attribute set to false e.g. the `length`
property of an array.

So as you can already imagine you have to use `hasOwnProperty` in order to make
the iteration over an object's own properties work. Also, since `for in`
iterates over *anything* that's on the prototype chain, it will get slower for
more complex cases of inheritance.

**Broken Example**

    Object.prototype.bar = 1; // poisoning the Object.prototype, NEVER do this
    var foo = {moo: 2};
    for(var i in foo) {
        console.log(i);
    }

This results in both `bar` and `moo` being printed out.

**Fixed Version**

    for(var i in foo) { // still the foo from above
        if (foo.hasOwnProperty(i)) {
            console.log(i);
        }
    }

This version is the **correct** one, it will *only* print `moo`. If you don't use 
`hasOwnProperty`, your code is prone to errors when the native prototypes have
been extended.

For example the `Prototype.js` JavaScript Framework **does** do extend the 
prototypes of built in objects. So if your code ever ends up on a page which 
includes it (Hint: Ruby on Rails defaults to Prototype.js) and you're not using 
`hasOwnProperty`, all hell will break loose.

**Best Practice:** Always use `hasOwnProperty` never make any assumptions on the
built in prototypes being extended or not.

