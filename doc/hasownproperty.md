## `hasOwnProperty`

In order to check whether a object has a property defined on itself and **not** 
somewhere on its [prototype chain](#prototype), it is necessary to use the 
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

Only `hasOwnProperty` will give the correct and expected result. This is 
essential when iterating over the properties of any object. There is no other 
way to exclude properties that are not defined on the object **itself**, but 
somewhere on its prototype chain.  

### In conclusion

When checking for the existence of a property on a object, `hasOwnProperty` is 
the **only** method of doing so. It is also recommended to make `hasOwnProperty`
part of **every** [`for in` loop](#forinloop), this will avoid errors from 
extended native [prototypes](#prototype).

