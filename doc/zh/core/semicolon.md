##自动分号插入

尽管 JavaScript 有 C 的代码风格，但是它**不**强制要求在代码中使用分号，实际上可以省略它们。

JavaScript 不是一个没有分号的语言，恰恰相反上它需要分号来就解析源代码。
因此 JavaScript 解析器在遇到由于缺少分号导致的解析错误时，会**自动**在源代码中插入分号。

    var foo = function() {
    } // 解析错误，分号丢失
    test()

自动插入分号，解析器重新解析。

    var foo = function() {
    }; // 没有错误，解析继续
    test()

自动的分号插入被认为是 JavaScript 语言**最大**的设计缺陷之一，因为它*能*改变代码的行为。

### 工作原理

下面的代码没有分号，因此解析器需要自己判断需要在哪些地方插入分号。

    (function(window, undefined) {
        function test(options) {
            log('testing!')

            (options.list || []).forEach(function(i) {

            })

            options.value.test(
                'long string to pass here',
                'and another long string to pass'
            )

            return
            {
                foo: function() {}
            }
        }
        window.test = test

    })(window)

    (function(window) {
        window.someLibrary = {}
    })(window)

下面是解析器"猜测"的结果。

    (function(window, undefined) {
        function test(options) {

            // 没有插入分号，两行被合并为一行
            log('testing!')(options.list || []).forEach(function(i) {

            }); // <- 插入分号

            options.value.test(
                'long string to pass here',
                'and another long string to pass'
            ); // <- 插入分号

            return; // <- 插入分号, 改变了 return 表达式的行为
            { // 作为一个代码段处理
                foo: function() {} 
            }; // <- 插入分号
        }
        window.test = test; // <- 插入分号

    // 两行又被合并了
    })(window)(function(window) {
        window.someLibrary = {}; // <- 插入分号
    })(window); //<- 插入分号

> **注意:** JavaScript 不能正确的处理 `return` 表达式紧跟换行符的情况，
> 虽然这不能算是自动分号插入的错误，但这确实是一种不希望的副作用。

解析器显著改变了上面代码的行为，在另外一些情况下也会做出**错误的处理**。

###前置括号

在前置括号的情况下，解析器**不会**自动插入分号。

    log('testing!')
    (options.list || []).forEach(function(i) {})

上面代码被解析器转换为一行。

    log('testing!')(options.list || []).forEach(function(i) {})

`log` 函数的执行结果**极大**可能**不是**函数；这种情况下就会出现 `TypeError` 的错误，详细错误信息可能是 `undefined is not a function`。

###结论

建议**绝对**不要省略分号，同时也提倡将花括号和相应的表达式放在一行，
对于只有一行代码的 `if` 或者 `else` 表达式，也不应该省略花括号。
这些良好的编程习惯不仅可以提到代码的一致性，而且可以防止解析器改变代码行为的错误处理。

