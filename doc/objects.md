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

### Access of properties

The properties of an object can be accessed in two ways. Either via the dot
notation, or the square bracket notation.
    
    var foo = {name: 'Kitten'}
    foo.name; // kitten
    foo['name']; // kitten
    
    var get = 'name';
    foo[get]; // kitten
    
    foo.1234; // SyntaxError
    foo['1234']; // works

Both notation are identical in their workings, the only difference being that
the square bracket notation allows for dynamic setting of properties as well as
the use of property names that would otherwise lead to a syntax error.

### Notation of keys

    var test = {
        'case': 'I am a keyword so I must be notated as a string',
        delete: 'I am a keyword too so me' // raises SyntaxError
    };

Object properties can be both notated as plain characters and as strings. Due to
another mis-design in JavaScript's parser, the above raises a `SyntaxError`.

The error is getting raised because `delete` is a *keyword* of the language, 
therefore it must be, just like `case`, notated as a string literal.

### In conclusion

Objects are the bread and butter of JavaScript, nearly everything in the
language is based on top of them.

[1]: http://en.wikipedia.org/wiki/Hashmap

