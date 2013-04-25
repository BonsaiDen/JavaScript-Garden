## `instanceof` 操作符

`instanceof` 操作符用來比較兩個建構函數的操作數。只有在比較字定義的物件時才有意義。這和 [typeof operator](#types.typeof)一樣用處不大。

### 比較定意義物件

    function Foo() {}
    function Bar() {}
    Bar.prototype = new Foo();

    new Bar() instanceof Bar; // true
    new Bar() instanceof Foo; // true

    // This just sets Bar.prototype to the function object Foo,
    // but not to an actual instance of Foo
    Bar.prototype = Foo;
    new Bar() instanceof Foo; // false

### `instanceof` 比較內置類型

    new String('foo') instanceof String; // true
    new String('foo') instanceof Object; // true

    'foo' instanceof String; // false
    'foo' instanceof Object; // false

有一點需要注意的， `instanceof` 不能用來物件來自上下文不同的屬性（例如：瀏覽器中不同的文檔結構），因為它的建構函數不一樣。

### In Conclusion

`instanceof` 操作符應該 **只** 用來比較同一個 JavaScript 上下文定意義的物件。
正如 [`typeof`](#types.typeof)操作符一樣，任何其他用法都要避免。
