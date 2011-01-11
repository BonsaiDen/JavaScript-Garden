## The `instanceof` operator

`instanceof` is only useful when comparing custom made objects, besides that it
returns a mess similar to the [typeof operator](#the-typeof-operator).

### Comparing custom Objects

    function Foo() {}
    function Bar() {}
    Bar.prototype = Foo;

    new Bar() instanceof Bar; // true
    new Bar() instanceof Foo; // false

### Using instanceof on built in objects

    new String('foo') instanceof String; // true
    new String('foo') instanceof Object; // true

    'foo' instanceof String; // false
    'foo' instanceof Object; // false

Important to note here is that `instanceof` will **of course** not work when the 
two objects origin from different JavaScript contexts e.g. different documents in
a Web Browser.

### Best Practices

Only use `instanceof` when dealing with custom made objects, **never** use it like
the `typeof` operator - it will behave just as bad and even worse when dealing
with objects from different contexts.

