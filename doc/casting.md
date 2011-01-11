## Type Casting

Since JavaScript is a weakly typed language one might think that it is the best
to let the language to the type casting when comparing. But this is **not** a good
idea, since the rules for converting between the types are extremely complex and
even obscure at times.

### Never use type coercion

Do **never** compare by using the [double equal](#equality), one little change
in your code can break everything.

    // These are true
    new Number(10) == 10; // Number.toString() gets converted to a Number
    10 == '10'; // Strings gets converted to Number
    10 == '+10 '; // More string madness
    10 == '010'; // And more 
    isNaN(null) == false; // null converts to 0
                          // which of course is not NaN
    
    // These are false
    10 == 010;
    10 == '-10'

> **Note:** Number literals that start with a `0` are interpreted as octal that
> is base 8. 

### Madness with `new` and built in Types

The constructors of the built in types like `Number` and `String` behave
differently when being used with the `new` keyword and without it.

    new Number(10) === 10; // False, Object and Number
    Number(10) === 10; // True, Number and Number
    new Number(10) + 0 === 10; // True, due to implicit conversion

As you can see above, using the built in type like `Number` as a constructor,
will create a new Number `Object`, but leaving out the `new` keyword will make
it behave like a converter.

Also having literals or non `Object` values in there, will active more coercing
magic.

Since the automatic casting either by using different data types together, or the
double equal operator is everything **but** consistent, the best option is to do
the casting explicitly, basically all you can do is to cast to three different
types.

### Casting to a String

    '' + 10 === '10'; // true

By using a empty string one can easily cast to a plain string.

### Casting to a Number

    +'10' === 10; // true

Using the **unary** plus operator it is possible to cast to a plain number.

### Casting to a Boolean

By using the **not** operator twice, one can convert anything to its boolean
value. 

    !!'foo';   // true
    !!'';      // false
    !!'0';     // false
    !!'1';     // true
    !!'-1'     // true
    !!{};      // true
    !!true;    // true

