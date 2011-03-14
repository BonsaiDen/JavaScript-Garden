## Equality and comparisons

JavaScript has two different ways of comparing the values of objects for equality. 

### The equals operator

The equals operator consists of two equal signs: `==`

JavaScript features *weak typing*, that means, that the equals operator 
**coerces** types in order to compare them.
    
    ""           ==   "0"           // false
    0            ==   ""            // true
    0            ==   "0"           // true
    false        ==   "false"       // false
    false        ==   "0"           // true
    false        ==   undefined     // false
    false        ==   null          // false
    null         ==   undefined     // true
    " \t\r\n"    ==   0             // true

The above table shows the results of the type coercion and it is the main reason 
why the use of `==` is widely regarded as bad practice, it introduces hard to 
track down bugs due to its complicated conversion rules.

Additionally there is also a performance impact when type coercion is in play;
for example, a string has to be converted to a number before it can be compared
to another number.

### The strict equals operator

The strict equals operator consists of **three** equal signs: `===`

Other than the normal equals operator, the strict equals operator does **not**
perform type coercion between its operands.

    ""           ===   "0"           // false
    0            ===   ""            // false
    0            ===   "0"           // false
    false        ===   "false"       // false
    false        ===   "0"           // false
    false        ===   undefined     // false
    false        ===   null          // false
    null         ===   undefined     // false
    " \t\r\n"    ===   0             // false

The above results are a lot clearer and allow for early breakage of code. This
hardens code to a certain degree and also gives performance improvements in case
the operands are of different types.

### Comparing objects

While both `==` and `===` are stated as **equality** operators, they behave 
different when at least one of their operands happens to be an `Object`.

    {} === {};                   // false
    new String('foo') === 'foo'; // false
    new Number(10) === 10;       // false
    var foo = {};
    foo === foo;                 // true

Here both operators compare for **identity** and **not** equality; that is, they
will compare for the same **instance** of the object, much like `is` in Python 
and a pointer comparison in C do.

### In conclusion

It is highly recommended to only use the **strict equals** operator. In cases
where types need to be coerced, it should be done [explicitly](#types.casting) 
and not left to the language's complicated coercion rules.

