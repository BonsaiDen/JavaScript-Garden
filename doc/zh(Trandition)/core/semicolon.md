## 自動插入分號

雖然 JavaScript 有 C 語言的語法，但是他不強制一定要加上分號。
所以分號可以被忽略。

Javascript 並 **不是** 一個不需要分號的語言。實際上，它需要分號來讓程式碼更容易被理解。因此 Javascript 的編譯器中遇到了缺少分號的情形，它會自動的在程式碼中插入分號。

    var foo = function() {
    } // 編輯錯誤，因沒分號
    test()

這時候編譯器在編輯的時候，會自動的加上分號，然後重新編輯。

    var foo = function() {
    }; // 沒有錯誤，編輯繼續
    test()

自動的加入分號是被認為 **最大** 的設計缺陷之一，因為它能改變程式碼的行為。

### 工作原理

下面的程式碼中沒有使用任何的分號，所以編譯器需要去決定在哪些地方加入分號。

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

下面的程式碼是編譯器 **猜測** 的結果。

    (function(window, undefined) {
        function test(options) {

            // 沒有加入分號，兩行被合併為一行
            log('testing!')(options.list || []).forEach(function(i) {

            }); // <- 插入分號

            options.value.test(
                'long string to pass here',
                'and another long string to pass'
            ); // <- 插入分號

            return; // <- 插入分號，改變了 return 的表達行為
            { // 作為另一個程式碼的處理

                // 被當做一個獨立的函數來看
                foo: function() {} 
            }; // <- 插入分號
        }
        window.test = test; // <- 插入分號

    // 兩行又被合併
    })(window)(function(window) {
        window.someLibrary = {}; // <- 插入分號

    })(window); //<- 插入分號

> **注意:** 在這個範例中 Javascript 編譯器沒有正確的處理 `return` ，因為緊接的換行符號。
> 雖然這不能算是自動分號插入的錯誤，但是它是非常不樂見的效果。

編譯器在上面的程式碼中改變了原本程式碼的行為。在一些情況下，會做出 **錯誤的行為**

### 前置括號

在這種前置括號的情況下，編譯器 **不會** 自動的插入分號。

    log('testing!')
    (options.list || []).forEach(function(i) {})

上面的程式碼被編譯器轉為只有一行程式

    log('testing!')(options.list || []).forEach(function(i) {})

以上的範例中 `log` 有 **很大** 的可能 **不是** 回傳一個函數。然而這個情況下會出現 `TypeError` 的錯誤或是會出現 `undefined is not a function` .

### 結語

建議永遠 **不要** 忽略分號。同樣的也建議大括號應在他對應的表達式在同一行。在 `if... else...`的表達式中也是如此，不應省略大括號。
這個習慣可以不僅僅是讓你的程式更一致，也可以避免編譯器因為改變程式而出錯。

