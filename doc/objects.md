## Objects

Everything in JavaScript acts like an object, with the only two exceptions being 
[`null`](#undefined) and [`undefined`](#undefined).

    false.toString() // 'false'
    [1, 2, 3].toString(); // '1,2,3'
    
    function Foo(){}
    Foo.bar = 1;
    Foo.bar; // 1

A commonly made mis-assumption is that number literals cannot be used as objects,
since a mis-design in JavaScript's parser tries to parse the following as a 
floating point literal instead.

    2.toString(); // raises SyntaxError

But a couple of workarounds can be used in order make number literals work as
object too.

    2..toString(); // the second point is correctly recognized
    2. toString(); // note the space
    (2).toString(); // 2 is evaluated first

### Objects as a data type

Objects in JavaScript can also be used as a [*Hashmap*][1], since they mainly 
consist of named properties that map to values.

Using the curly brace notation `{}` one can create a plain object. This new
object [inherits](#prototype) from `Object.prototype` and has no 
[own properties](#hasownproperty) set on it.

    var foo = {}; // a new empty object

    // a new object with a property called 'test' with value 12
    var bar = {test: 12}; 

### Notation of keys

    var test = {
        'case': 'I am a keyword so I must be notated as a string',
        delete: 'I am a keyword too so me' // raises SyntaxError
    };

Object properties can be both notated as plain characters and as strings. Due to
another mis-design in JavaScript's parser, the above raises a `SyntaxError`.

The error is getting raised because `delete` is a *keyword* of the language, 
therefore it must be, just like `case`, notated as a string literal.

 [1]: http://en.wikipedia.org/wiki/Hashmap

