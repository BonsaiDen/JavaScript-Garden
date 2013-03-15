## `this` 的工作原理

JavaScript 有移到完全部屬於其他語言處理 `this` 的處理機制。
在 **五** 種物同的情況下， `this` 指向的個不相同

### 全域變數

    this;

如果再全域範圍內使用 `this`，會指向 *全域* 的物件


### 呼叫一個函式

    foo();

這裡 `this` 也會指向 *全域* 對象。

> **ES5 注意:** 在嚴格模式下，不存在全域變數。
> `this` 將會是 `undefined`。

### 方法調用

    test.foo(); 

這個例子中， `this` 指向 `test` 物件。

### 呼叫一個建構函式

    new foo(); 

如果函式傾向用 `new` 關鍵詞使用，我們稱這個函式為 [建構函式](#function.constructors)。
在函式內部， `this` 指向 *新物件的創立*

### 顯示的設置 `this`

    function foo(a, b, c) {}
                          
    var bar = {};
    foo.apply(bar, [1, 2, 3]); // Array 會被擴展，如下所示
    foo.call(bar, 1, 2, 3); // 傳遞參數 a = 1, b = 2, c = 3

當使用 `function.prototype` 上的 `call` 或只 `apply` 方法時，函式內的 `this` 將會被 **顯示設置** 為函式調用的第一個參數。

因此*函式調用*的規則在上例中已經不適用了，在 `foo`函式內 `this` 被設置程了 `bar`。

> **注意:** 在物件的字面宣告語法中，`this` **不能**用來指向物件本身。
> 因此 `var obj = {me: this}` 中的 `me` 不會指向 `obj`因為 `this` 只可能出現在上面的五種情形。


### 常見誤解

儘管大部分的情況都是這樣，不過第一個被認為是設計錯誤的地方，因為他沒有實際的用途。

    Foo.method = function() {
        function test() {
            // this is set to the global object
        }
        test();
    }

一個常見的錯誤 `test` 中的 `this` 會指向 `Foo` 對象，但其實不是。

為了在 `test` 中獲得對 `Foo` 物件的引用，我們需要在 `method` 函式內創建一個局部變數指向 `Foo` 對象。

    Foo.method = function() {
        var that = this;
        function test() {
            // Use that instead of this here
        }
        test();
    }

`that` 只是一個普通的變數名，我們可以用來指向 `this`。在 [closures](#function.closures)，我們可以看到 `that` 用來參數傳遞。

### 方法賦值的表達式

另一個看起來奇怪的地方式函式別名，也就是將一個方法賦值到另一個變數。

    var test = someObject.methodTest;
    test();

上面的 `test` 就像普通的函式一樣被調用，因此，函式內的 `this` 不再被指向到 `someObject` 物件。

雖然 `this` 的綁定似乎並不好，但是它是在 [prototypal inheritance](#object.prototype)中讓他運作的原因。

    function Foo() {}
    Foo.prototype.method = function() {};

    function Bar() {}
    Bar.prototype = Foo.prototype;

    new Bar().method();

當 `method` 被使用時， `this` 將會指向 `Bar` 的物件。


