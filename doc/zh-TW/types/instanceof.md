## The `instanceof` Operator

The `instanceof` operator compares the constructors of its two operands. It is 
only useful when comparing custom made objects. Used on built-in types, it is
nearly as useless as the [typeof operator](#types.typeof).

### Comparing Custom Objects

    function Foo() {}
    function Bar() {}
    Bar.prototype = new Foo();

    new Bar() instanceof Bar; // true
    new Bar() instanceof Foo; // true

    // This just sets Bar.prototype to the function object Foo,
    // but not to an actual instance of Foo
    Bar.prototype = Foo;
    new Bar() instanceof Foo; // false

### Using `instanceof` with Native Types

    new String('foo') instanceof String; // true
    new String('foo') instanceof Object; // true

    'foo' instanceof String; // false
    'foo' instanceof Object; // false

One important thing to note here is that `instanceof` does not work on objects 
that originate from different JavaScript contexts (e.g. different documents
in a web browser), since their constructors will not be the exact same object.

### In Conclusion

The `instanceof` operator should **only** be used when dealing with custom made 
objects that originate from the same JavaScript context. Just like the
[`typeof`](#types.typeof) operator, every other use of it should be **avoided**.

