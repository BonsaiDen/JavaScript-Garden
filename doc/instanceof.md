## The `instanceof` operator

`instanceof` is only useful when comparing custom made objects. Besides that it
returns a mess similar to the [typeof operator](#typeof).

### Comparing custom objects

    function Foo() {}
    function Bar() {}
    Bar.prototype = Foo;

    new Bar() instanceof Bar; // true
    new Bar() instanceof Foo; // false

### Using `instanceof` on built in objects

    new String('foo') instanceof String; // true
    new String('foo') instanceof Object; // true

    'foo' instanceof String; // false
    'foo' instanceof Object; // false

One important thing to note is that `instanceof` does of course not work on
objects that origin from different JavaScript contexts;rFor example, different
documents in a web browser.

### In conclusion

The `instanceof` operator should **only** be used when dealing with custom made 
objects that origin from the same JavaScript context. Just like the
[`typeof`](#typeof) operator, every other use of it should be **avoided**.

