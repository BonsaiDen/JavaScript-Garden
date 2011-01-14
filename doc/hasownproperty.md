## `hasOwnProperty`

In order to check whether a object has a property defined on **itself** and 
not somewhere on its [prototype chain](#prototype), it is necessary to use the 
`hasOwnProperty` method which all objects inherit from `Object.prototype`.

> **Note:** It is **not** enough checking for a property being `undefined`. The
> property  might very well exist, but its value just happens to be set to 
> `undefined`.

`hasOwnProperty` is the only thing in JavaScript which deals with properties and 
does **not** traverse the prototype chain, everything else does.

    // Poisoning Object.prototype
    Object.prototype.bar = 1; 
    var foo = {goo: undefined};
    
    foo.bar; // 1
    'bar' in foo; // true

    foo.hasOwnProperty('bar'); // false
    foo.hasOwnProperty('goo'); // true

Only `hasOwnProperty` will give the correct and expected result. This is 
essential when iterating over the properties of any object, since there is no 
other way to exclude things that are not defined on the object **itself** but 
rather are somewhere on its prototype chain.  

### Best practices

When checking for the existence of a property on a object, `hasOwnProperty` is 
the only way to go. It is also recommended to make sure that `hasOwnProperty` is 
part of **every** [`for in` loop](#forinloop).

