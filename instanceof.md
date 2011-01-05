### The `instanceof` operator

`instanceof` is only useful when comparing custom made objects, besides that it
returns a mess much like the `typeof` operator.

**Example**

    // Comparing custom objects
    function Foo() {}
    function Bar() {}
    Bar.prototype = Foo;

    new Bar() instanceof Bar; // true
    new Bar() instanceof Foo; // false

    // More mess
    new String('foo') instanceof String; // true
    new String('foo') instanceof Object; // true
    'foo' instanceof String; // false
    'foo' instanceof Object; // false

Of course `instanceof` does not work cross document wise since the objects were
created in different contexts.

**Best Practice:** Only use `instanceof` when dealing with custom made objects
and keep its limitations in mind.

