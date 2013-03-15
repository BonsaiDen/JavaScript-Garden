## 作用域和命名空間

儘管 JavaScript 支持一個大括號創建的程式碼，但並不支持塊級作用域。
而僅僅支援 *函式作用域*

    function test() { // 一個作用域
        for(var i = 0; i < 10; i++) { // 不是一個作用域
            // 算數
        }
        console.log(i); // 10
    }

> **注意:** 如果不是在賦值語句中，而是在 return 表達式或者函數參數中， `{...}` 將會作為程式碼中的解析，而不是作為物件的字面語法解析。
> 如果考慮到 [自動分號插入](#core.semicolon)，可能會造成一些不易察覺的錯誤。

JavaScript 中沒有寫示的命名空間定義，這代表著它所有定義的東西都是 *全域共享* 在同一個命名空間下。

每次引用一個變數，JavaScript 會向上找整個作用域直到找到這個變數為止。
如果在全域中無法找到那個變數，它會拋出 `ReferenceError` 錯誤碼。

### 全域變數的壞處

    // script A
    foo = '42';

    // script B
    var foo = '42'

上面兩個腳本 *不會* 有同樣的效果。腳本 A 在 *全域* 空間定義了變數 `foo`，腳本 B 定義了 `foo` 在目前的區間內。

再次強調，上面的效果是 **完全不同**，不使用 `var` 會導致隱性的全域變數。

    // 全域作用區
    var foo = 42;
    function test() {
        // 局部作用區
        foo = 21;
    }
    test();
    foo; // 21

在函數 `test` 中部使用 `var` 會覆蓋到原本在外面的 `foo`。
雖然看起來不是什麼大問題，但是當程式有幾千行的時候沒有使用 `var` 會照成難以追蹤的臭蟲。

    
    // 全域作用域
    var items = [/* some list */];
    for(var i = 0; i < 10; i++) {
        subLoop();
    }

    function subLoop() {
        // subLoop 的作用域
        for(i = 0; i < 10; i++) { // 缺少了 var
            // 做一些事情
        }
    }
    
在外面的迴圈在呼叫第一次 `subLoop` 之後就會停止，因為 `subLoop` 全域變數中的 `i` 被覆蓋了。
在第二次使用 `for` 迴圈的時候，使用 `var` 就可以避免這種錯誤。
在宣告變數的時候 **絕對不要** 忘記 `var`，除非就是 `希望他的效果` 是取改變外部的作用域。

### 局部變數

在 javascript 中能用兩種方式來宣告局部變數。
[函式](#function.general) 參數和透過 `var` 來宣告變數。

    // 全域變數
    var foo = 1;
    var bar = 2;
    var i = 2;

    function test(i) {
        // 函式 test 內部的局部作用域
        i = 5;

        var foo = 3;
        bar = 4;
    }
    test(10);

`foo` 和 `i` 是它的局部變數在 `test` 函式中，但是在 `bar` 的賦值會覆蓋全區域的作用域內的同名變數。

### 變數宣告

JavaScript 會 **提昇** 變數宣告， 這代表著 `var` 和 `function` 的圈告都會被提升到當前作用域的頂端。

    bar();
    var bar = function() {};
    var someValue = 42;

    test();
    function test(data) {
        if (false) {
            goo = 1;

        } else {
            var goo = 2;
        }
        for(var i = 0; i < 100; i++) {
            var e = data[i];
        }
    }

在上面的程式碼會被轉化在執行之前。 JavaScript 會把 `var`，和 `function` 宣告，放到最頂端最接近的作用區間

    // var 被移到這裡
    var bar, someValue; //  值等於 'undefined'

    // function 的宣告也被搬上來
    function test(data) {
        var goo, i, e; // 沒有作用域的也被搬至頂端
        if (false) {
            goo = 1;

        } else {
            goo = 2;
        }
        for(i = 0; i < 100; i++) {
            e = data[i];
        }
    }

    bar(); // 出錯：TypeError ， bar 還是 'undefined'
    someValue = 42; // 賦值語句不會被提昇規則影響
    bar = function() {};

    test();

沒有作用域區間不只會把 `var` 放到迴圈之外，還會使得 `if` 表達式更難看懂。

在一般的程式中，雖然 `if` 表達式中看起來修改了 *全域變數* `goo`，但實際上在提昇規則被運用後，卻是在修改 *局部變數*

如果沒有提昇規則的話，可能會出現像下面的看起來會出現 `ReferenceError` 的錯誤。

    // 檢查 SomeImportantThing 是否已經被初始化
    if (!SomeImportantThing) {
        var SomeImportantThing = {};
    }

但是它沒有錯誤，因為 `var` 的表達式會被提升到 *全域作用域* 的頂端。

    var SomeImportantThing;

    // 有些程式，可能會初始化。
    SomeImportantThing here, or not

    // 檢查是否已經被初始化。
    if (!SomeImportantThing) {
        SomeImportantThing = {};
    }

### 名稱解析順序
 
JavaScript 中所有的作用區，包括 *全域作用域*，都有一個特殊的名字 [`this`](#function.this), 在它們裡面被定義，指向當前的物件

函式作用域也有一個名稱叫做 [`arguments`](#function.arguments), 定義它們，其中包括傳到函式內的參數。

例如，它們開始試著進入到 `foo` 的作用域裡面， JavaScript 會依照下面的順序去查詢：

 1. 當作用域內是否有 `var foo` 的定義。
 2. 函式形式參數是否有使用 `foo` 名稱定義。
 3. 函式自身是剖叫做 `foo`。
 4. 回溯到上一個層級然後再從第一個開始往下去查。

> **注意: ** 自定義 `arguments` 參數會阻止原生的 `arguments` 的物件創立

### 命名空間

只有一個全域作用域會導致常見的錯誤是命名衝突。在 JavaScript 中可以透過 *匿名包裝器* 來解決。

    (function() {
        // 自己本身的匿名空間
        
        window.foo = function() {
            // 對外公開的函式
        };

    })(); // 馬上執行這個匿名函式

匿名函式被認為是 [表達式](#function.general)因此為了要可以調用，它們會先被執行。

    ( // 小括號內的先被執行
    function() {}
    ) // 回傳函數對象
    () // 調用上面的執行結果

還有其他方式也可以像上面一樣調用函式的方式達到

    !function(){}()
    +function(){}()
    (function(){}());
    // and so on...

### 結語

建議最好是都用 *匿名包裝器* 來封裝你的程式碼在自己的命名區間內。這不僅是要防止命名衝突也可以使得程序更有模組化。

另外，全域變數是個 **不好的** 習慣，因為它會帶來錯誤和更難去維護。