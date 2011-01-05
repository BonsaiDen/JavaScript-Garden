### Objects

To make it short, everything in JavaScript *acts* like an `Object`, expect for 
`null` and `undefined`. This means that all those values inherit from 
`Object.prototype` (yet another reason **not** to mess with it).

**Examples**
    
    false.toString() // 'false'
    [1, 2, 3].toString(); // '1,2,3'

**Common Mistakes**

    2.toString(); // syntax error

The above doesn't work, but this is **not** because of the number not being an
object (in fact JavaScript interprets it as an Object just fine), but a 
mis-design in JavaScript's parser. Which tries to parse *anything* that follows a
dot - which itself is preceded by whitespace or a number -  as a float.

You can work around this by either inserting a space `2. toString()` or using
parenthesis `(2).toString()`.

Objects can also *act* like a hashmap in JavaScript by simply mapping *keys* to
*values*. Using the curly brace notation `{}` one can create a new plain object, 
which inherits from `Object` and has no *own properties*.

**Examples**

    var foo = {}; // a new empty object
    var bar = {test: 12}; // a new object which has one property called 'test'
                          // which value is 12

**Common Mistakes**
    
    var foo = {
        delete: function() {} // syntax error
    };

The above does not work in JavaScript engines which do not support EcmaScript 5.
What happens is that `delete` is a *keyword* and therefore cannot be used as a key
here. But you can simply work around this by using a string with the value
`'delete'` instead of the plain token.

This is yet another mis-design in JavaScript's parser that you to watch out for.

