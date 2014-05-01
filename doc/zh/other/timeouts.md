###`setTimeout` 和 `setInterval`

由于 JavaScript 是异步的，可以使用 `setTimeout` 和 `setInterval` 来计划执行函数。

> **注意:** 定时处理**不是** ECMAScript 的标准，它们在 [DOM (文档对象模型)][1] 被实现。

    function foo() {}
    var id = setTimeout(foo, 1000); // 返回一个大于零的数字

当 `setTimeout` 被调用时，它会返回一个 ID 标识并且计划在将来**大约** 1000 毫秒后调用 `foo` 函数。
`foo` 函数只会被执行**一次**。

基于 JavaScript 引擎的计时策略，以及本质上的单线程运行方式，所以其它代码的运行可能会阻塞此线程。
因此**没法确保**函数会在 `setTimeout` 指定的时刻被调用。

作为第一个参数的函数将会在*全局作用域*中执行，因此函数内的 [`this`](#function.this) 将会指向这个全局对象。

    function Foo() {
        this.value = 42;
        this.method = function() {
            // this 指向全局对象
            console.log(this.value); // 输出：undefined
        };
        setTimeout(this.method, 500);
    }
    new Foo();


> **注意:** `setTimeout` 的第一个参数是**函数对象**，一个常犯的错误是这样的 `setTimeout(foo(), 1000)`，
> 这里回调函数是 `foo` 的**返回值**，而**不是**`foo`本身。
> 大部分情况下，这是一个潜在的错误，因为如果函数返回 `undefined`，`setTimeout` 也**不会**报错。

###`setInterval` 的堆调用

`setTimeout` 只会执行回调函数一次，不过 `setInterval` - 正如名字建议的 - 会每隔 `X` 毫秒执行函数一次。
但是却不鼓励使用这个函数。

当回调函数的执行被阻塞时，`setInterval` 仍然会发布更多的回调指令。在很小的定时间隔情况下，这会导致回调函数被堆积起来。

    function foo(){
        // 阻塞执行 1 秒
    }
    setInterval(foo, 100);

上面代码中，`foo` 会执行一次随后被阻塞了一秒钟。

在 `foo` 被阻塞的时候，`setInterval` 仍然在组织将来对回调函数的调用。
因此，当第一次 `foo` 函数调用结束时，已经有 **10** 次函数调用在等待执行。

###处理可能的阻塞调用

最简单也是最容易控制的方案，是在回调函数内部使用 `setTimeout` 函数。

    function foo(){
        // 阻塞执行 1 秒
        setTimeout(foo, 100);
    }
    foo();

这样不仅封装了 `setTimeout` 回调函数，而且阻止了调用指令的堆积，可以有更多的控制。
`foo` 函数现在可以控制是否继续执行还是终止执行。


###手工清空定时器

可以通过将定时时产生的 ID 标识传递给 `clearTimeout` 或者 `clearInterval` 函数来清除定时，
至于使用哪个函数取决于调用的时候使用的是 `setTimeout` 还是 `setInterval`。

    var id = setTimeout(foo, 1000);
    clearTimeout(id);

###清除所有定时器

由于没有内置的清除所有定时器的方法，可以采用一种暴力的方式来达到这一目的。

    // 清空"所有"的定时器
    for(var i = 1; i < 1000; i++) {
        clearTimeout(i);
    }

可能还有些定时器不会在上面代码中被清除（**[译者注][30]：**如果定时器调用时返回的 ID 值大于 1000），
因此我们可以事先保存所有的定时器 ID，然后一把清除。

###隐藏使用 `eval`

`setTimeout` 和 `setInterval` 也接受第一个参数为字符串的情况。
这个特性**绝对**不要使用，因为它在内部使用了 `eval`。

> **注意:** 由于定时器函数不是 ECMAScript 的标准，如何解析字符串参数在不同的 JavaScript 引擎实现中可能不同。
> 事实上，微软的 JScript 会使用 `Function` 构造函数来代替 `eval` 的使用。

    function foo() {
        // 将会被调用
    }

    function bar() {
        function foo() {
            // 不会被调用
        }
        setTimeout('foo()', 1000);
    }
    bar();

由于 `eval` 在这种情况下不是被[直接](#core.eval)调用，因此传递到 `setTimeout` 的字符串会自*全局作用域*中执行；
因此，上面的回调函数使用的不是定义在 `bar` 作用域中的局部变量 `foo`。

建议**不要**在调用定时器函数时，为了向回调函数传递参数而使用字符串的形式。

    function foo(a, b, c) {}
    
    // 不要这样做
    setTimeout('foo(1,2, 3)', 1000)

    // 可以使用匿名函数完成相同功能
    setTimeout(function() {
        foo(1, 2, 3);
    }, 1000)

> **注意:** 虽然也可以使用这样的语法 `setTimeout(foo, 1000, 1, 2, 3)`，
> 但是不推荐这么做，因为在使用对象的[属性方法](#function.this)时可能会出错。
>（**译者注：**这里说的是属性方法内，`this` 的指向错误）

###结论

**绝对不要**使用字符串作为 `setTimeout` 或者 `setInterval` 的第一个参数，
这么写的代码明显质量很差。当需要向回调函数传递参数时，可以创建一个*匿名函数*，在函数内执行真实的回调函数。

另外，应该避免使用 `setInterval`，因为它的定时执行不会被 JavaScript 阻塞。

[1]: http://en.wikipedia.org/wiki/Document_Object_Model 
[30]: http://cnblogs.com/sanshi/

