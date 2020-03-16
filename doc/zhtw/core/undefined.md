## `undefined` 和 `null`

JavaScript 中有兩個表示空值的方式， `null` 和 `undefined` ， `undefined`是比較常用的一種。

### `undefined` 的值

`undefined` 是一個值為 `undefined` 的類型。

語言中也定義了一個全域變數，它的值為 `undefined`，這個變數的被稱作 `undefined` 。
這個變數 **不是** 一個常數，也不是一個關鍵字。這表示它的值可以被輕易的覆蓋。

> **ES5 提示: ** `undefined` 在 ECMAScript 5 裡 **不再是** *可寫* 的
> 但是它的名稱還是可以被隱藏，比如說定義一個函數為 `undefined`。

這裡有一些例子會回傳 `undefined` 的值：

 - 進入尚未修改的全域變數 `undefined`。
 - 進入一個宣告但 **尚未** 初始化的變數。
 - `return` 表示式中沒有返回任何內容。
 - 呼叫不存在的屬性。
 - 函式參數沒有被傳遞數值。
 - 任何被被設定為 `undefined` 的變數。
 - 任何表達式中形式為 `void(expression)`

### 處理 `undefined` 值的改變

由於全域變數 `undefined` 只有保存 `undefined` 類型實際值的一個副本，指定了一個新的值並 **不會** 改變 `undefined`類型裡面的值。

為了避免去改變 `undefined` 的值，常用的技巧就是加上一個新的變數到 [匿名包裝器](#function.scopes)。在使用的時候，這個參數不會接受任何的值。

    var undefined = 123;
    (function(something, foo, undefined) {
        // undefined 在區域區間內得到了 `undefined` 的值

    })('Hello World', 42);

另外一個可以得到同樣的效果就是在內部宣告一個變數

    var undefined = 123;
    (function(something, foo) {
        var undefined;
        ...

    })('Hello World', 42);

唯一的不同就是在下者會多 4 個多 bytes 用來壓縮檔案，而且函數內也沒有其他需要使用 `var`

### 使用 `null`

JavaScript 中所使用的 `undefined` 類似別的語言中的 *null* , 但實際上在 JavaScript 中的 `null` 算是另外一個類型。

它在 JavaScript 有些可以使用的地方 （例如說宣告一個原型的終結，例如 `Foo.prototype = null` ）。
但是在大部分的時候可以用 `undefined`，來取代。
