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
is necessary to filter out the unwanted properties inside the loop body. In
ECMAScript 3 and older, this is done using the [`hasOwnProperty`](#object.hasownproperty)
method of `Object.prototype`.

Since ECMAScript 5, `Object.defineProperty` can be used with
`enumerable` set to `false` to add properties to objects (including `Object`)
without these properties being enumerated. In this case it is reasonable
to assume in application code that any enumerable properties have been added
for a reason and to omit `hasOwnProperty`, since it makes code more verbose and less
readable. In library code `hasOwnProperty` should still be used since
assumptions cannot be made about which enumerable properties might reside
on the prototype chain.

> **Note:** Since `for in` always traverses the complete prototype chain, it
> will get slower with each additional layer of inheritance added to an object.

### Using `hasOwnProperty` for Filtering

    // still the foo from above
    for(var i in foo) {
        if (foo.hasOwnProperty(i)) {
            console.log(i);
        }
    }

This version is the only correct one to use with older versions of ECMAScript.
Due to the use of `hasOwnProperty`, it will **only** print out `moo`.
When `hasOwnProperty` is left out, the code is prone to errors in cases where
the native prototypes - e.g. `Object.prototype` -
have been extended.

> Tried in jeforth
> js> [].length . \ ==> 0 OK.
> js> [] obj>keys . \ ==> "" OK.
> js> [].hasOwnProperty("length") \ ==> true (boolean).
> So 'length' is a non-enumerable property of an array.

In newer versions of ECMAScript, non-enumerable properties can be defined with
`Object.defineProperty`, reducing the risk of iterating over properties without
using `hasOwnProperty`. Nonetheless, care must be taken when using older
libraries like [Prototype][1], which does not yet take advantage of new ECMAScript features.
When this framework is included, `for in` loops that do not use
`hasOwnProperty` are guaranteed to break.

### In Conclusion

It is recommended to **always** use `hasOwnProperty` in ECMAScript 3 or lower, as well as
in library code. Assumptions should never be made in these environments about whether
the native prototypes have been extended or not. Since ECMAScript 5, `Object.defineProperty`
makes it possible to define non-enumerable properties and to omit `hasOwnProperty` in
application code.

[1]: http://www.prototypejs.org/

