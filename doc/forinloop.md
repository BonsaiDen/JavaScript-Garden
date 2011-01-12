## The For In Loop

Just like the `in` operator, the `for in` loop also traverses the prototype
chain when iterating over the properties of an object.

> **Note:** The `for in` loop it will **not** iterate over any properties that 
> have their `enumerable` attribute set to `false`, for example the `length` 
> property of an array.

Since it's not possible to change the behavior of the `for in` loop itself, one 
has to filter out the unwanted properties inside the loop body itself by using 
the [hasOwnProperty](#hasownproperty) method of the object. It should also be 
noted that due to its nature of traversing the complete prototype chain, the 
`for in` loop gets slower for each layer of inheritance.

    // poisoning Object.prototype
    Object.prototype.bar = 1;

    var foo = {moo: 2};
    for(var i in foo) {
        console.log(i);
    }

The above code results in both `bar` and `moo` being printed out.

### Using `hasOwnProperty` for filtering

    // still the foo from above
    for(var i in foo) {
        if (foo.hasOwnProperty(i)) {
            console.log(i);
        }
    }

This version is the only correct one to use. Due to the use of `hasOwnPropery` it
will **only** print out `moo`. When `hasOwnProperty` is left out, the code is 
prone to errors when the native prototypes - for example `Object.prototype` - 
have been extended.

One widely used framework which does this is [**Prototype.js**][1]. In case code 
ends up being used together with this framework and this code does **not** use
`hasOwnProperty`, it is basically **guaranteed** to break.

### Best practices

It's recommended to always use `hasOwnProperty`, never should any assumptions be
made about the environment code is running in or whether the built in prototypes 
have been extended or not. 

 [1]: http://www.prototypejs.org/

