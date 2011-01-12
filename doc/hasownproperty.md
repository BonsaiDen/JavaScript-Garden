## `hasOwnProperty`

If you want to check whether a `Object` has a property defined on **itself** (and 
not just somewhere on the [prototype chain](#prototype), you have to use the 
`hasOwnProperty` method which all objects inherit from `Object.prototype`.

While it is tempting to just do a `Foo.bar !== undefined` this is in no way safe.
Although JavaScript does return `undefined` for non-existent properties, they
property might very well exist, but it's value just happens to be set to 
`undefined`.

Additionally, using the `in` operator doesn't work either, since it **does** 
traverse the prototype chain upwards until it finds a property with the 
specified name.

    // Poisoning Object.prototype, NEVER do this, it calls for trouble
    Object.prototype.bar = 1; 
    var foo = {goo: undefined};
    
    foo.bar; // 1
    'bar' in foo; // true

    foo.hasOwnProperty('bar'); // false
    foo.hasOwnProperty('goo'); // true

As you can see, only `hasOwnProperty` gives the correct and expected result. 
`hasOwnProperty` is of essential use when iterating over the properties of any 
`Object`, since there's no other way to exclude things that are not defined on 
the object **itself** but rather somewhere on its prototype chain.  

### Best practices

When checking for the existence of a property on a object, `hasOwnProperty` is 
the only way to go. It's also recommended to make sure that `hasOwnProperty` is 
part of **every** [for in loop](#forinloop).

