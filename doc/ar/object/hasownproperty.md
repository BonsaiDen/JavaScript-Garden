## `hasOwnProperty`

To check whether an object has a property defined on *itself* and not somewhere
on its [prototype chain](#object.prototype), it is necessary to use the
`hasOwnProperty` method which all objects inherit from `Object.prototype`.

> **Note:** It is **not** enough to check whether a property is `undefined`. The
> property might very well exist, but its value just happens to be set to
> `undefined`.

`hasOwnProperty` is the only thing in JavaScript which deals with properties and
does **not** traverse the prototype chain.

    // Poisoning Object.prototype
    Object.prototype.bar = 1;
    var foo = {goo: undefined};

    foo.bar; // 1
    'bar' in foo; // true

    foo.hasOwnProperty('bar'); // false
    foo.hasOwnProperty('goo'); // true

Only `hasOwnProperty` will give the correct and expected result. See the section
on [`for in` loops](#object.forinloop) for more details on when to use
`hasOwnProperty` when iterating over object
properties.

### `hasOwnProperty` as a Property

JavaScript does not protect the property name `hasOwnProperty`; thus, if the
possibility exists that an object might have a property with this name, it is
necessary to use an *external* `hasOwnProperty` to get correct results.

    var foo = {
        hasOwnProperty: function() {
            return false;
        },
        bar: 'Here be dragons'
    };

    foo.hasOwnProperty('bar'); // always returns false

    // Use another Object's hasOwnProperty and call it with 'this' set to foo
    ({}).hasOwnProperty.call(foo, 'bar'); // true

    // It's also possible to use hasOwnProperty from the Object
    // prototype for this purpose
    Object.prototype.hasOwnProperty.call(foo, 'bar'); // true


### In Conclusion

Using `hasOwnProperty` is the **only** reliable method to check for the
existence of a property on an object. It is recommended that `hasOwnProperty`
be used in many cases when iterating over object properties as described
in the section on [`for in` loops](#object.forinloop).

