### Objects

Everything in JavaScript - except for `null` and `undefined` -  **acts** like an 
`Object`. This means that all types inherit from `Object.prototype` (yet another 
reason **not** to mess with it).

    false.toString() // 'false'
    [1, 2, 3].toString(); // '1,2,3'
    2.toString(); // syntax error

The last example doesn't work, but this is **not** because the number literal 
cannot be used like an object, it's because of a mis-design in JavaScript's 
parser. Which tries to parse **anything** that follows a dot - which itself is 
preceded by whitespace or a number literal - as a floating point number.

You can work around this by either inserting a space `2. toString()`, another dot
`2..toString()` or using parenthesis `(2).toString()`.

#### Objects as a Datatype

Objects can also **act** like a [*Hashmap*][1] in JavaScript by simply mapping *keys* to
*values*. Using the curly brace notation `{}` one can create a new plain object, 
which inherits from `Object.prototype` and has no [own
properties](#hasownproperty).

    var foo = {}; // a new empty object
    var bar = {test: 12}; // a new object which has one property called 'test'
                          // which value is 12

    var test = {
        delete: function() {}
    };

The above definition of `test` raises a `SyntaxError` in JavaScript engines which 
do not support the upcoming EcmaScript 5 standard. What happens is that `delete` 
is a *keyword* and therefore cannot be used as a key here (another mis-design of
the  parser). But you can simply work around this by using a string with the 
value of `'delete'` instead of the plain literal.

 [1]: http://en.wikipedia.org/wiki/Hashmap
