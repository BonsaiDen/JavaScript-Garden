## `this` 的工作原理

JavaScript 有一道完全不屬於其他語言處理 `this` 的處理機制。
在 **五** 種不同的情況下， `this` 指向的各不相同

### 全域變數

    this;

如果再全域範圍內使用 `this`，會指向 *全域* 的物件


### 呼叫一個函式

    foo();

這裡 `this` 也會指向 *全域* 物件。

> **ES5 注意:** 在嚴格模式下，不存在全域變數。
> `this` 將會是 `undefined`。

### 呼叫一個方法

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

因此，在以上的例子中已不適用*函式調用*的原則，而且`this`會被設定指向`bar`。

> **Note:** `this` **cannot** be used to refer to the object inside of an `Object`
> literal. So `var obj = {me: this}` will **not** result in `me` referring to
> `obj`, since `this` only gets bound by one of the five listed cases.

### 常見誤解

儘管大部分的例子都合理，但第一個例子(譯者注: 應該是指前面呼叫一個函式的那個例子)可以被視為一個語言的不良設計，因為它**從來**就沒有實際用途。

    Foo.method = function() {
        function test() {
            // this 設定為全域
        }
        test();
    };

一個常見的誤解是 `test` 中的 `this` 指向 `Foo` 物件，但實際上並**不是**。

為了在 `test` 中使用 `Foo` 物件，我們需要在 `method` 函式内部建立一個區域變數指向 `Foo`。

    Foo.method = function() {
        var that = this;
        function test() {
            // 這裡使用 that 而非 this
        }
        test();
    };

`that` 只是普通的名字，不過這個名字常被用用來指向外部的 `this`。 在 [閉包](#function.closures) 一節，可以看到它(`that`)可以取代 `this` 傳遞。

在 ECMAScript 5 ，你可以使用 `bind` 結合匿名函式達到相同結果。

    Foo.method = function() {
        var test = function() {
            // this 指向 Foo
        }.bind(this);
        test();
    };

### 函式表達式

另一個在 JavaScript 中**不會**運作的就是 function aliasing，也就是函式**賦值**給一個變數。

    var test = someObject.methodTest;
    test();

上例中，`test` 就像一個普通的函式被调用；因此，函式内的 this 將不再指向 `someObject`。

雖然起初 `this` 的绑定特性似乎像是個壞主意，但事實上，它使得 [原型繼承](#object.prototype)得以運作。

    function Foo() {}
    Foo.prototype.method = function() {};

    function Bar() {}
    Bar.prototype = Foo.prototype;

    new Bar().method();

當 `method` 被呼叫時，`this` 將會指向 `Bar` 的實體物件。

