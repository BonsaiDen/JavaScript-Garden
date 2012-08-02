##`instanceof` 操作符

`instanceof` 操作符用来比较两个操作数的构造函数。只有在比较自定义的对象时才有意义。
如果用来比较内置类型，将会和 [`typeof` 操作符](#types.typeof) 一样用处不大。

###比较自定义对象

    function Foo() {}
    function Bar() {}
    Bar.prototype = new Foo();

    new Bar() instanceof Bar; // true
    new Bar() instanceof Foo; // true

    // 如果仅仅设置 Bar.prototype 为函数 Foo 本身，而不是 Foo 构造函数的一个实例
    Bar.prototype = Foo;
    new Bar() instanceof Foo; // false

###`instanceof` 比较内置类型

    new String('foo') instanceof String; // true
    new String('foo') instanceof Object; // true

    'foo' instanceof String; // false
    'foo' instanceof Object; // false

有一点需要注意，`instanceof` 用来比较属于不同 JavaScript 上下文的对象（比如，浏览器中不同的文档结构）时将会出错，
因为它们的构造函数不会是同一个对象。

### 结论

`instanceof` 操作符应该**仅仅**用来比较来自同一个 JavaScript 上下文的自定义对象。
正如 [`typeof`](#types.typeof) 操作符一样，任何其它的用法都应该是避免的。

[30]: http://cnblogs.com/sanshi/
