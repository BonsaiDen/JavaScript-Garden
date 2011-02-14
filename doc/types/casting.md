## Type casting

JavaScript is a *weakly typed* language, so it will apply *type coercion*
wherever possible.

    // These are true
    new Number(10) == 10; // Number.toString() is converted
                          // back to a number

    10 == '10';           // Strings gets converted to Number
    10 == '+10 ';         // More string madness
    10 == '010';          // And more 
    isNaN(null) == false; // null converts to 0
                          // which of course is not NaN
    
    // These are false
    10 == 010;
    10 == '-10';

> **Note:** Number literals that start with a `0` are interpreted as octal (Base
> 8).

In order to avoid that the use of the [strict equal operator](#types.equality) is
recommended.

But this does still not solve all the issues that arise from JavaScript's weak 
typing system.

### Madness with `new` and built in types

The constructors of the built in types like `Number` and `String` behave
differently when being used with the `new` keyword and without it.

    new Number(10) === 10;     // False, Object and Number
    Number(10) === 10;         // True, Number and Number
    new Number(10) + 0 === 10; // True, due to implicit conversion

Using the built in type like `Number` as a constructor will create a new number 
`Object`, but leaving out the `new` keyword will make it behave like a converter.

In addition, having literals or non `Object` values in there will activate more 
coercing magic.

The best option is to do cast to one of the three possible types explicitly.

### Casting to a string

    '' + 10 === '10'; // true

By using a empty string a value can easily be casted to a plain string.

### Casting to a number

    +'10' === 10; // true

Using the **unary** plus operator it is possible to cast to a plain number.

### Casting to a boolean

By using the **not** operator twice, a value can be converted to its boolean 
value. 

    !!'foo';   // true
    !!'';      // false
    !!'0';     // false
    !!'1';     // true
    !!'-1'     // true
    !!{};      // true
    !!true;    // true

