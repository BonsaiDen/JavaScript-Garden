## Type Casting

JavaScript is a *weakly typed* language, so it will apply *type coercion*
**wherever** possible.

    // These are true
    new Number(10) == 10; // Number object is converted
                          // to a number primitive via implicit call of
                          // Number.prototype.valueOf method

    10 == '10';           // Strings gets converted to Number
    10 == '+10 ';         // More string madness
    10 == '010';          // And more 
    isNaN(null) == false; // null converts to 0
                          // which of course is not NaN
    
    // These are false
    10 == 010;
    10 == '-10';

> **ES5 Note:** Number literals that start with a `0` are interpreted as octal 
> (Base 8). Octal support for these has been **removed** in ECMAScript 5 strict 
> mode.

To avoid the issues above, use of the [strict equal operator](#types.equality) 
is **highly** recommended. Although this avoids a lot of common pitfalls, there 
are still many further issues that arise from JavaScript's weak typing system.

### Constructors of Built-In Types

The constructors of the built in types like `Number` and `String` behave
differently when being used with the `new` keyword and without it.

    new Number(10) === 10;     // False, Object and Number
    Number(10) === 10;         // True, Number and Number
    new Number(10) + 0 === 10; // True, due to implicit conversion

Using a built-in type like `Number` as a constructor will create a new `Number` 
object, but leaving out the `new` keyword will make the `Number` function behave
like a converter.

In addition, passing literals or non-object values will result in even more
type coercion.

The best option is to cast to one of the three possible types **explicitly**.

### Casting to a String

    '' + 10 === '10'; // true

By prepending an empty string, a value can easily be cast to a string.

### Casting to a Number

    +'10' === 10; // true

Using the **unary** plus operator, it is possible to cast to a number.

### Casting to a Boolean

By using the **not** operator twice, a value can be converted to a boolean.

    !!'foo';   // true
    !!'';      // false
    !!'0';     // true
    !!'1';     // true
    !!'-1'     // true
    !!{};      // true
    !!true;    // true


