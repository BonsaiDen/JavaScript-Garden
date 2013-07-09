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

當使用 `function.prototype` 上的 `call` 或是 `apply` 方法時，函式內的 `this` 將會被 **顯示設置** 為函式調用的第一個參數。

As a result, in the above example the *method case* does **not** apply, and `this` 
inside of `foo` will be set to `bar`.

> **Note:** `this` **cannot** be used to refer to the object inside of an `Object`
> literal. So `var obj = {me: this}` will **not** result in `me` referring to
> `obj`, since `this` only gets bound by one of the five listed cases.

### 常見誤解

While most of these cases make sense, the first can be considered another
mis-design of the language because it **never** has any practical use.

    Foo.method = function() {
        function test() {
            // this is set to the global object
        }
        test();
    }

A common misconception is that `this` inside of `test` refers to `Foo`; while in
fact, it **does not**.

In order to gain access to `Foo` from within `test`, it is necessary to create a 
local variable inside of `method` that refers to `Foo`.

    Foo.method = function() {
        var that = this;
        function test() {
            // Use that instead of this here
        }
        test();
    }

`that` is just a normal variable name, but it is commonly used for the reference to an 
outer `this`. In combination with [closures](#function.closures), it can also 
be used to pass `this` values around.

### Assigning Methods

Another thing that does **not** work in JavaScript is function aliasing, which is
**assigning** a method to a variable.

    var test = someObject.methodTest;
    test();

Due to the first case, `test` now acts like a plain function call; therefore,
`this` inside it will no longer refer to `someObject`.

While the late binding of `this` might seem like a bad idea at first, in 
fact, it is what makes [prototypal inheritance](#object.prototype) work. 

    function Foo() {}
    Foo.prototype.method = function() {};

    function Bar() {}
    Bar.prototype = Foo.prototype;

    new Bar().method();

When `method` gets called on an instance of `Bar`, `this` will now refer to that
very instance. 


