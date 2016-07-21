##原型

JavaScript 不包含传统的类继承模型，而是使用 *prototype* 原型模型。

虽然这经常被当作是 JavaScript 的缺点被提及，其实基于原型的继承模型比传统的类继承还要强大。
例如，很容易通过原型继承实现传统的类继承模型，但是反过来，通过传统的类继承模型来实现原型继承模型就困难得多。
(It is for example fairly trivial to build a classic model on top of it, while the
other way around is a far more difficult task.)

由于 JavaScript 是唯一一个被广泛使用的基于原型继承的语言，所以理解两种继承模式的差异是需要一定时间的。

第一个不同之处在于 JavaScript 使用*原型链*的继承方式。

> **注意:** 简单的使用 `Bar.prototype = Foo.prototype` 将会导致两个对象共享**相同**的原型。
> 因此，改变任意一个对象的原型都会影响到另一个对象的原型，在大多数情况下这不是希望的结果。

    function Foo() {
        this.value = 42;
    }
    Foo.prototype = {
        method: function() {}
    };

    function Bar() {}

    // 设置 Bar 的 prototype 属性为 Foo 的实例对象
    Bar.prototype = new Foo();
    Bar.prototype.foo = 'Hello World';

    // 修正 Bar.prototype.constructor 为 Bar 本身
    Bar.prototype.constructor = Bar;

    var test = new Bar(); // 创建Bar的一个新实例

    // 原型链
    test [Bar的实例]
        Bar.prototype [Foo的实例] 
            { foo: 'Hello World', value: 42 }
            Foo.prototype
                {method: ...};
                Object.prototype
                    {toString: ... /* etc. */};

上面的例子中，`test` 对象从 `Bar.prototype` 和 `Foo.prototype` 继承下来；因此，
它能访问 `Foo` 的原型方法 `method`。同时，它也能够访问**那个**定义在原型上的 `Foo` 实例属性 `value`。
需要注意的是 `new Bar()` **不会**创造出一个新的 `Foo` 实例，而是
重复使用它原型上的那个实例；因此，所有的 `Bar` 实例都会共享**相同**的 `value` 属性。

> **注意:** **不要**使用 `Bar.prototype = Foo`，因为这不会指向 `Foo` 的原型，而是指向函数 `Foo`。
> 因此原型链将会回溯到 `Function.prototype` 而不是 `Foo.prototype`，因此 `method` 将不会在 Bar 的原型链上。

###属性查找

当查找一个对象的属性时，JavaScript 会**向上**遍历原型链，直到找到给定名称的属性为止。

到查找到达原型链的顶部 - 也就是 `Object.prototype` - 但是仍然没有找到指定的属性，就会返回 [undefined](#core.undefined)。

###原型属性

当原型属性用来创建原型链时，可以把**任何**类型的值赋给它（prototype）。
然而将原子类型（primitives）赋给 prototype 的操作将会被忽略。

    function Foo() {}
    Foo.prototype = 1; // 无效

而将对象赋值给 prototype，正如上面的例子所示，将会动态的创建原型链。

###性能

如果一个属性在原型链的上端，则对于查找时间将带来不利影响。注意，试图获取一个不存在的属性将会遍历整个原型链。

并且，当使用 [`for in`](#object.forinloop) 循环遍历对象的属性时，原型链上的**所有**属性都将被访问。

###扩展内置类型的原型

扩展 `Object.prototype` 或者其他内置类型的原型对象，作为一个错误特性，经常被使用。

这种技术被称之为 [monkey patching][1] 并且会破坏*封装*。虽然它被广泛的应用到一些 JavaScript 类库中比如 [Prototype][2],
但是我仍然不赞同为内置类型添加一些*非标准*的函数。

扩展内置类型的**唯一**理由是为了和新的 JavaScript 保持一致，比如 [`Array.forEach`][3]。

> **[译者注][30]：**这是编程领域常用的一种方式，称之为 [Backport][5]，也就是将新的补丁添加到老版本中。

###总结

在写复杂的 JavaScript 应用之前，充分理解原型链继承的工作方式是每个 JavaScript 程序员**必修**的功课。
要提防原型链过长带来的性能问题，并知道如何通过缩短原型链来提高性能。
更进一步，绝对**不要**扩展内置类型的原型，除非是为了和新的 JavaScript 引擎兼容。


[1]: http://en.wikipedia.org/wiki/Monkey_patch
[2]: http://prototypejs.org/
[3]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
[5]: http://en.wikipedia.org/wiki/Backport 
[30]: http://cnblogs.com/sanshi/
