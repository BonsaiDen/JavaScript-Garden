##`arguments` 对象

JavaScript 中每个函数内都能访问一个特别变量 `arguments`。这个变量维护着所有传递到这个函数中的参数列表。

> **注意:** 由于 `arguments` 已经被定义为函数内的一个变量。
> 因此通过 `var` 关键字定义 `arguments` 或者将 `arguments` 声明为一个形式参数，
> 都将导致原生的 `arguments` 不会被创建。

`arguments` 变量**不是**一个数组（`Array`）。
尽管在语法上它有数组相关的属性 `length`，但它不从 `Array.prototype` 继承，实际上它是一个对象（`Object`）。

因此，无法对 `arguments` 变量使用标准的数组方法，比如 `push`、`pop` 或者 `slice`。
虽然使用 `for` 循环遍历也是可以的，但是为了更好的使用数组方法，最好把它转化为一个真正的数组。

###转化为数组

下面的代码将会创建一个新的数组，包含所有 `arguments` 对象中的元素。

    Array.prototype.slice.call(arguments);

这个转化比较**慢**，在性能不好的代码中**不推荐**这种做法。

###传递参数

下面是将参数从一个函数传递到另一个函数的推荐做法。

    function foo() {
        bar.apply(null, arguments);
    }
    function bar(a, b, c) {
        // 干活
    }

另一个技巧是同时使用 `call` 和 `apply`，创建一个快速的解绑定包装器。

    function Foo() {}

    Foo.prototype.method = function(a, b, c) {
        console.log(this, a, b, c);
    };

    // 创建一个解绑定的 "method"
    // 输入参数为: this, arg1, arg2...argN
    Foo.method = function() {

        // 结果: Foo.prototype.method.call(this, arg1, arg2... argN)
        Function.call.apply(Foo.prototype.method, arguments);
    };

	
**[译者注][30]**：上面的 `Foo.method` 函数和下面代码的效果是一样的:
	
	Foo.method = function() {
		var args = Array.prototype.slice.call(arguments);
        Foo.prototype.method.apply(args[0], args.slice(1));
    };

	
###自动更新

`arguments` 对象为其内部属性以及函数形式参数创建 *getter* 和 *setter* 方法。

因此，改变形参的值会影响到 `arguments` 对象的值，反之亦然。

    function foo(a, b, c) {
        arguments[0] = 2;
        a; // 2                                                           

        b = 4;
        arguments[1]; // 4

        var d = c;
        d = 9;
        c; // 3
    }
    foo(1, 2, 3);

### 性能真相

不管它是否有被使用，`arguments` 对象总会被创建，除了两个特殊情况 - 作为局部变量声明和作为形式参数。

`arguments` 的 *getters* 和 *setters* 方法总会被创建；因此使用 `arguments` 对性能不会有什么影响。
除非是需要对 `arguments` 对象的属性进行多次访问。

> **ES5 提示:** 这些 *getters* 和 *setters* 在严格模式下（strict mode）不会被创建。

**[译者注][30]：**在 [MDC][2] 中对 `strict mode` 模式下 `arguments` 的描述有助于我们的理解，请看下面代码：

	// 阐述在 ES5 的严格模式下 `arguments` 的特性
	function f(a) {
	  "use strict";
	  a = 42;
	  return [a, arguments[0]];
	}
	var pair = f(17);
	console.assert(pair[0] === 42);
	console.assert(pair[1] === 17);

然而，的确有一种情况会显著的影响现代 JavaScript 引擎的性能。这就是使用 `arguments.callee`。

    function foo() {
        arguments.callee; // 使用这个函数对象
        arguments.callee.caller; // 以及这个函数对象的调用者
    }

    function bigLoop() {
        for(var i = 0; i < 100000; i++) {
            foo(); // 通常情况会作为内联函数...
        }
    }

上面代码中，`foo` 不再是一个单纯的内联函数 [inlining][1]（**[译者注][30]**：这里指的是解析器可以做内联处理），
因为它需要知道它自己和它的调用者。
这不仅抵消了内联函数带来的性能提升，而且破坏了封装，因此现在函数可能要依赖于特定的上下文。

因此**强烈**建议大家**不要**使用 `arguments.callee` 和它的属性。

> **ES5 提示:** 在严格模式下，`arguments.callee` 会报错 `TypeError`，因为它已经被废除了。

[1]: http://en.wikipedia.org/wiki/Inlining
[2]: https://developer.mozilla.org/en/JavaScript/Strict_mode
[30]: http://cnblogs.com/sanshi/
