##闭包和引用

闭包是 JavaScript 一个非常重要的特性，这意味着当前作用域**总是**能够访问外部作用域中的变量。
因为 [函数](#function.scopes) 是 JavaScript 中唯一拥有自身作用域的结构，因此闭包的创建依赖于函数。

> 译者注：ES2015 中增加了块级作用域。

###模拟私有变量

    function Counter(start) {
        var count = start;
        return {
            increment: function() {
                count++;
            },

            get: function() {
                return count;
            }
        }
    }

    var foo = Counter(4);
    foo.increment();
    foo.get(); // 5

这里，`Counter` 函数返回两个闭包，函数 `increment` 和函数 `get`。 这两个函数都维持着
对外部作用域 `Counter` 的引用，因此总可以访问此作用域内定义的变量 `count`。

###为什么不可以在外部访问私有变量

因为 JavaScript 中不可以对作用域进行引用或赋值，因此没有办法在外部访问 `count` 变量。
唯一的途径就是通过那两个闭包。

    var foo = new Counter(4);
    foo.hack = function() {
        count = 1337;
    };

上面的代码**不会**改变定义在 `Counter` 作用域中的 `count` 变量的值，因为 `foo.hack` 没有
定义在那个**作用域**内。它将会创建或者覆盖*全局*变量 `count`。

###循环中的闭包

一个常见的错误出现在循环中使用闭包，假设我们需要在每次循环中调用循环序号

    for(var i = 0; i < 10; i++) {
        setTimeout(function() {
            console.log(i);
        }, 1000);
    }

上面的代码不会输出数字 `0` 到 `9`，而是会输出数字 `10` 十次。

当 `console.log` 被调用的时候，*匿名*函数保持对外部变量 `i` 的引用，此时 `for`循环已经结束， `i` 的值被修改成了 `10`。

为了得到想要的结果，需要在每次循环中创建变量 `i` 的**拷贝**。

###避免引用错误

为了正确的获得循环序号，最好使用 [匿名包装器](#function.scopes)（**[译者注][30]：**其实就是我们通常说的自执行匿名函数）。

    for(var i = 0; i < 10; i++) {
        (function(e) {
            setTimeout(function() {
                console.log(e);
            }, 1000);
        })(i);
    }

外部的匿名函数会立即执行，并把 `i` 作为它的参数，此时函数内 `e` 变量就拥有了 `i` 的一个拷贝。

当传递给 `setTimeout` 的匿名函数执行时，它就拥有了对 `e` 的引用，而这个值是**不会**被循环改变的。

有另一个方法完成同样的工作，那就是从匿名包装器中返回一个函数。这和上面的代码效果一样。

    for(var i = 0; i < 10; i++) {
        setTimeout((function(e) {
            return function() {
                console.log(e);
            };
        })(i), 1000);
    }

	
[30]: http://cnblogs.com/sanshi/
