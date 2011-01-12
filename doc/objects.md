## Objects

Everything in JavaScript - except for `null` and `undefined` -  is an object. 
This means that all types in the language inherit from `Object.prototype`.

    false.toString() // 'false'
    [1, 2, 3].toString(); // '1,2,3'
    2.toString(); // syntax error

The last example doesn't work, this is **not** because the number literal 
cannot be used like an object, it's because of a mis-design in JavaScript's 
parser. Which tries to parse **anything** that follows a dot - which itself is 
preceded by whitespace or a number literal - as a floating point number.

One can work around this problem by either inserting a space `2. toString()`, 
another dot `2..toString()` or using parenthesis `(2).toString()`.

### Objects as a data type

Objects in JavaScript can also be used as a [*Hashmap*][1], since they consist
of named properties that map to values.

Using the curly brace notation `{}` one can create a new, plain object, which 
inherits from `Object.prototype` and has no [own properties](#hasownproperty)
set on it.

    var foo = {}; // a new empty object

    // a new object with a property called 'test' that has the value 12
    var bar = {test: 12}; 
    
    // 


### Notation of keys

    var test = {
        'case': 'Of the missing quoation',
        delete: function() {}
    };

Object properties can be both notated as plain characters and as strings. Due to
another mis-design in JavaScript's parser, the above raises a `SyntaxError`.
Since `delete` is a *keyword*, it must therefore be notated as a string, just
like the other *keyword* `case` is.

 [1]: http://en.wikipedia.org/wiki/Hashmap

