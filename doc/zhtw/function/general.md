## 函式的宣告和表達方式

函式在 JavaScript 是第一等物件。這表示他們可以把函式當做值一樣傳遞。
一個常見的用法是用 *匿名函式* 當做一個回傳去呼叫另一個函式，這是一種非同步函式

### 函式的宣告

    function foo() {}

上面的函式在被執行之前會被 [解析(hoisted)](#function.scopes)，因此它可以在 **任意** 的地方都是 *有宣告的* ，就算是在比這個函式還早呼叫。


    foo(); // 可以執行，因為 foo 已經在運行前就被建立
    function foo() {}

### `function` 的表達式

    var foo = function() {};

這個例子把一個 *匿名* 函式賦值給變數 `foo`。

    foo; // 'undefined'
    foo(); // 錯誤: TypeError
    var foo = function() {};

由於 `var` 已經宣告變數 `foo` 在所有的程式碼執行之前。
所以 `foo`已經在程式運行前就已經被定義過了。
但是因為賦值只會在運行時去職情，所以在程式碼執行前，`foo` 的值還沒被宣告所以為 [undefined](#core.undefined)。


### 命名函式的賦值表達式

另一個特殊狀況就勢將一個命名函式賦值給一個變數。

    var foo = function bar() {
        bar(); // 可以運行
    }
    bar(); // 錯誤：ReferenceError

`bar` 不可以在外部的區域被執行，因為它只有在 `foo` 的函式內才可以去執行。
然而在 `bar` 內部還是可以看見。這是由於 JavaScript的 [命名處理](#function.scopes)所致。
函式名在函式內 *都* 可以去使用。

