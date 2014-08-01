## The `for in` Loop

Just like the `in` operator, the `for in` loop traverses the prototype
chain when iterating over the properties of an object.

> **Note:** The `for in` loop will **not** iterate over any properties that
> have their `enumerable` attribute set to `false`; for example, the `length`
> property of an array.

    // Poisoning Object.prototype
    Object.prototype.bar = 1;

    var foo = {moo: 2};
    for(var i in foo) {
        console.log(i); // prints both bar and moo
    }

Since it is not possible to change the behavior of the `for in` loop itself, it
is necessary to filter out the unwanted properties inside the loop body;
this is done using the [`hasOwnProperty`](#object.hasownproperty) method of
`Object.prototype`.

> **Note:** Since `for in` always traverses the complete prototype chain, it
> will get slower with each additional layer of inheritance added to an object.

### Using `hasOwnProperty` for Filtering

    // still the foo from above
    for(var i in foo) {
        if (foo.hasOwnProperty(i)) {
            console.log(i);
        }
    }

This version is the only correct one to use. Due to the use of `hasOwnProperty`, it
will **only** print out `moo`. When `hasOwnProperty` is left out, the code is
prone to errors in cases where the native prototypes - e.g. `Object.prototype` -
have been extended.

One widely used framework that extends `Object.prototype` is [Prototype][1].
When this framework is included, `for in` loops that do not use
`hasOwnProperty` are guaranteed to break.

### Using `Object.keys` for Iterating

    // still the foo from above
    for (var i = 0, keys = Object.keys(foo); i < keys.length; i++) {
        console.log(keys[i]);
    }

This version is very similar to the [`hasOwnProperty`](#object.hasownproperty) example above, except it is [faster][2].

> Note: This is a `for-loop` than a `for-in loop`. But it does the same task
> without adding a costly function [`hasOwnProperty`](#object.hasownproperty)
> on each iteration.

### In Conclusion

It is recommended to **always** use `hasOwnProperty`. Assumptions should never
be made about the environment the code is running in, or whether the native
prototypes have been extended or not.

[1]: http://www.prototypejs.org/
[2]: http://jsperf.com/object-keys-foreach-vs-for-in-hasownproperty/
