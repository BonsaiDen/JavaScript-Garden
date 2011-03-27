##为什么不要使用 `eval`

`eval` 函数会在当前作用域中执行一段 JavaScript 代码字符串。

    var foo = 1;
    function test() {
        var foo = 2;
        eval('foo = 3');
        return foo;
    }
    test(); // 3
    foo; // 1

但是 `eval` 只在被**直接**调用并且调用函数就是 `eval` 本身时，才在当前作用域中执行。

    var foo = 1;
    function test() {
        var foo = 2;
        var bar = eval;
        bar('foo = 3');
        return foo;
    }
    test(); // 2
    foo; // 3

**[译者注][30]：**上面的代码等价于在全局作用域中调用 `eval`，和下面两种写法效果一样：

	// 写法一：直接调用全局作用域下的 foo 变量
	var foo = 1;
    function test() {
        var foo = 2;
        window.foo = 3;
        return foo;
    }
    test(); // 2
    foo; // 3
	
	// 写法二：使用 call 函数修改 eval 执行的上下文为全局作用域
	var foo = 1;
    function test() {
        var foo = 2;
        eval.call(window, 'foo = 3');
        return foo;
    }
    test(); // 2
    foo; // 3

在**任何情况下**我们都应该避免使用 `eval` 函数。99.9% 使用 `eval` 的场景都有**不使用** `eval` 的解决方案。
    
###伪装的 `eval`

[定时函数](#other.timeouts) `setTimeout` 和 `setInterval` 都可以接受字符串作为它们的第一个参数。
这个字符串**总是**在全局作用域中执行，因此 `eval` 在这种情况下没有被直接调用。


###安全问题

`eval` 也存在安全问题，因为它会执行**任意**传给它的代码，
在代码字符串未知或者是来自一个不信任的源时，绝对不要使用 `eval` 函数。

###结论

绝对不要使用 `eval`，任何使用它的代码都会在它的工作方式，性能和安全性方面受到质疑。
如果一些情况必须使用到 `eval` 才能正常工作，首先它的设计会受到质疑，这**不应该**是首选的解决方案，
一个更好的不使用 `eval` 的解决方案应该得到充分考虑并优先采用。

[30]: http://cnblogs.com/sanshi/
