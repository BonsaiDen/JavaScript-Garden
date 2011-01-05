### hasOwnProperty

If you want to check whether a object a property defined on *itself*, you have to 
use the `hasOwnProperty` method which all objects inherit from `Object.prototype`.

While it's tempting to just do a `Foo.bar !== undefined` this is in no way safe.
While JavaScript does return `undefined` for non-existent properties, they
property might very well exist, but it's value is set to `undefined`.

Also using the `in` operator doesn't work either, since it *does* traverse the
prototype chain upwards until it finds a property with the specified name.

**Examples**
                 
    // Poisoning Object.prototype, NEVER do this
    Object.prototype.bar = 1; 
    var foo = {goo: undefined};
    
    foo.bar; // 1
    'bar' in foo; // true

    foo.hasOwnProperty('bar'); // false
    foo.hasOwnProperty('goo'); // true

As you can see, only `hasOwnProperty` gives the correct answer, the method is of
essential use when iterating over the properties of any object, since there's no
other way to exclude things that are not defined on the object itself but rather
somewhere on it's prototype chain.

**Best Practice:** Always use `hasOwnProperty` when checking for properties on
objects.

