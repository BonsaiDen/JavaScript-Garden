##函数声明与表达式

函数是 JavaScript 中的一等对象，这意味着可以把函数像其它值一样传递。
一个常见的用法是把*匿名函数*作为回调函数传递到异步函数中。

###函数声明

    function foo() {}

上面的方法会在执行前被 [解析(hoisted)](#function.scopes)，因此它存在于当前上下文的*任意*一个地方，
即使在函数定义体的上面被调用也是对的。

    foo(); // 正常运行，因为 foo 在代码运行前已经被创建
    function foo() {}

### 函数赋值表达式

    var foo = function() {};

这个例子把一个*匿名*的函数赋值给变量 `foo`。

    foo; // 'undefined'
    foo(); // 出错：TypeError
    var foo = function() {};

由于 `var` 定义了一个声明语句，对变量 `foo` 的解析是在代码运行之前，因此 `foo` 变量在代码运行时已经被定义过了。

但是由于赋值语句只在运行时执行，因此在相应代码执行之前， `foo` 的值缺省为 [undefined](#core.undefined)。

###命名函数的赋值表达式

另外一个特殊的情况是将命名函数赋值给一个变量。

    var foo = function bar() {
        bar(); // 正常运行
    }
    bar(); // 出错：ReferenceError

`bar` 函数声明外是不可见的，这是因为我们已经把函数赋值给了 `foo`；
然而在 `bar` 内部依然可见。这是由于 JavaScript 的 [命名处理](#function.scopes) 所致，
函数名在函数内*总是*可见的。
> **注意: **在 IE8 及 IE8 以下版本浏览器 bar 在外部也是可见的，是因为浏览器对命名函数赋值表达式进行了错误的解析，
> 解析成两个函数 `foo` 和 `bar`

