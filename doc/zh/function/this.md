##`this` 的工作原理

JavaScript 有一套完全不同于其它语言的对 `this` 的处理机制。
在**五**种不同的情况下 ，`this` 指向的各不相同。

###全局范围内

    this;

当在全部范围内使用 `this`，它将会指向*全局*对象。

> **[译者注][30]：**浏览器中运行的 JavaScript 脚本，这个全局对象是 `window`；
> 在 nodejs 环境中运行的 Javascript 脚本，这个全局对象是 `global`。

###函数调用

    foo();

这里 `this` 也会指向*全局*对象。

> **ES5 注意:** 在严格模式下（strict mode），不存在全局变量。
> 这种情况下 `this` 将会是 `undefined`。

###方法调用

    test.foo();

这个例子中，`this` 指向 `test` 对象。

###调用构造函数

    new foo();

如果函数倾向于和 `new` 关键词一块使用，则我们称这个函数是 [构造函数](#function.constructors)。
在函数内部，`this` 指向*新创建*的对象。

###显式的设置 `this`

    function foo(a, b, c) {}
                          
    var bar = {};
    foo.apply(bar, [1, 2, 3]); // 数组将会被扩展，如下所示
    foo.call(bar, 1, 2, 3); // 传递到 foo 的参数是：a = 1, b = 2, c = 3

当使用 `Function.prototype` 上的 `call` 或者 `apply` 方法时，函数内的 `this` 将会被
**显式设置**为函数调用的第一个参数。

因此*函数调用*的规则在上例中已经不适用了，在`foo` 函数内 `this` 被设置成了 `bar`。

> **注意:** 在对象的字面声明语法中，`this` **不能**用来指向对象本身。
> 因此 `var obj = {me: this}` 中的 `me` 不会指向 `obj`，因为 `this` 只可能出现在上述的五种情况中。
> **[译者注][30]：**这个例子中，如果是在浏览器中运行，`obj.me` 等于 `window` 对象。

###常见误解

尽管大部分的情况都说的过去，不过第一个规则（**[译者注][30]：**这里指的应该是第二个规则，也就是直接调用函数时，`this` 指向全局对象）
被认为是 JavaScript 语言另一个错误设计的地方，因为它**从来**就没有实际的用途。

    Foo.method = function() {
        function test() {
            // this 将会被设置为全局对象（译者注：浏览器环境中也就是 window 对象）
        }
        test();
    };

一个常见的误解是 `test` 中的 `this` 将会指向 `Foo` 对象，实际上**不是**这样子的。

为了在 `test` 中获取对 `Foo` 对象的引用，我们需要在 `method` 函数内部创建一个局部变量指向 `Foo` 对象。

    Foo.method = function() {
        var that = this;
        function test() {
            // 使用 that 来指向 Foo 对象
        }
        test();
    };

`that` 只是我们随意起的名字，不过这个名字被广泛的用来指向外部的 `this` 对象。
在 [闭包](#function.closures) 一节，我们可以看到 `that` 可以作为参数传递。

###方法的赋值表达式

另一个看起来奇怪的地方是函数别名，也就是将一个方法**赋值**给一个变量。

    var test = someObject.methodTest;
    test();

上例中，`test` 就像一个普通的函数被调用；因此，函数内的 `this` 将不再被指向到 `someObject` 对象。

虽然 `this` 的晚绑定特性似乎并不友好，但这确实是[基于原型继承](#object.prototype)赖以生存的土壤。

    function Foo() {}
    Foo.prototype.method = function() {};

    function Bar() {}
    Bar.prototype = Foo.prototype;

    new Bar().method();

当 `method` 被调用时，`this` 将会指向 `Bar` 的实例对象。

[30]: http://cnblogs.com/sanshi/
