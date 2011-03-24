##`undefined` 和 `null`

JavaScript 有两个表示‘空’的值，其中比较有用的是 `undefined`。

###`undefined` 的值

`undefined` 是一个值为 `undefined` 的类型。

这个语言也定义了一个全局变量，它的值是 `undefined`，这个变量也被称为 `undefined`。
但是这个变量**不是**一个常量，也不是一个关键字。这意味着它的*值*可以轻易被覆盖。

> **ES5 提示:** 在 ECMAScript 5 的严格模式下，`undefined` **不再是** *可写*的了。
> 但是它的名称仍然可以被隐藏，比如定义一个函数名为 `undefined`。

下面的情况会返回 `undefined` 值：

 - 访问未修改的全局变量 `undefined`。
 - 由于没有定义 `return` 表达式的函数隐式返回。
 - `return` 表达式没有显式的返回任何内容。
 - 访问不存在的属性。
 - 函数参数没有被显式的传递值。
 - 任何被设置为 `undefined` 值的变量。
 
###处理 `undefined` 值的改变

由于全局变量 `undefined` 只是保存了 `undefined` 类型实际*值*的副本，
因此对它赋新值**不会**改变类型 `undefined` 的值。

然而，为了方便其它变量和 `undefined` 做比较，我们需要事先获取类型 `undefined` 的值。

为了避免可能对 `undefined` 值的改变，一个常用的技巧是使用一个传递到[匿名包装器](#function.scopes)的额外参数。
在调用时，这个参数不会获取任何值。

    var undefined = 123;
    (function(something, foo, undefined) {
        // 局部作用域里的 undefined 变量重新获得了 `undefined` 值

    })('Hello World', 42);

另外一种达到相同目的方法是在函数内使用变量声明。

    var undefined = 123;
    (function(something, foo) {
        var undefined;
        ...

    })('Hello World', 42);

这里唯一的区别是，在压缩后并且函数内没有其它需要使用 `var` 声明变量的情况下，这个版本的代码会多出 4 个字节的代码。

> **[译者注][30]：**这里有点绕口，其实很简单。如果此函数内没有其它需要声明的变量，那么 `var` 总共 4 个字符（包含一个空白字符）
就是专门为 `undefined` 变量准备的，相比上个例子多出了 4 个字节。

###`null` 的用处

JavaScript 中的 `undefined` 的使用场景类似于其它语言中的 *null*，实际上 JavaScript 中的 `null` 是另外一种数据类型。

它在 JavaScript 内部有一些使用场景（比如声明原型链的终结 `Foo.prototype = null`），但是大多数情况下都可以使用 `undefined` 来代替。

[30]: http://cnblogs.com/sanshi/
