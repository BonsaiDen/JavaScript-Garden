## `instanceof`オペレーター

`instanceof`オペレーターは2つのオペランドのコンストラクタを比較します。これはカスタムで作ったオブジェクトを比較する時にのみ有用です。組み込みの型に使用するのは[typeof operator](#types.typeof)を使用するのと同じくらい意味がありません。

### Comparing Custom Objects

    function Foo() {}
    function Bar() {}
    Bar.prototype = new Foo();

    new Bar() instanceof Bar; // true
    new Bar() instanceof Foo; // true

    // This just sets Bar.prototype to the function object Foo
    // But not to an actual instance of Foo
    Bar.prototype = Foo;
    new Bar() instanceof Foo; // false

### Using `instanceof` with Native Types

    new String('foo') instanceof String; // true
    new String('foo') instanceof Object; // true

    'foo' instanceof String; // false
    'foo' instanceof Object; // false

One important thing to note here is, that `instanceof` does not work on objects 
that origin from different JavaScript contexts (e.g. different documents
in a web browser), since their constructors will not be the exact same object.

### In Conclusion

The `instanceof` operator should **only** be used when dealing with custom made 
objects that origin from the same JavaScript context. Just like the
[`typeof`](#types.typeof) operator, every other use of it should be **avoided**.

