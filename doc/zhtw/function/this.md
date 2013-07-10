##`this` 的工作原理

JavaScript 有一套相對於其它大多數語言來說完全不同的 `this` 處理機制。
在 **五** 種不同的情况下 ，`this` 指向的各不相同。

###全域範圍

    this;

當在全域範圍内使用 `this`，它將會指向 *全域* 物件。

> **[簡中譯者注][30]：** 在瀏覽器的中運行的 JavaScript，這個全域物件是 `window`。

###呼叫函數

    foo();

這裡`this` 也會指向 *全域* 物件。

> **ES5 注意:** 在嚴格模式下（strict mode），不存在上述全域範圍物件。
> 這種情况下 `this` 將會是 `undefined`。

###呼叫方法

    test.foo(); 

這個例子中，`this` 指向 `test` 物件。

###呼叫建構函數

    new foo(); 

如果函數頃向於和 `new` 關鍵詞一塊使用，則我們稱這個函數是 [建構函數](#function.constructors)。
在函數内部，`this` 指向 *新建立* 的物件。

###外顯方式設定 `this`

    function foo(a, b, c) {}
                          
    var bar = {};
    foo.apply(bar, [1, 2, 3]); // Array將會被擴展，如下所示
    foo.call(bar, 1, 2, 3); // 傳遞到foo的參數是：a = 1, b = 2, c = 3

當使用 `Function.prototype` 上的 `call` 或者 `apply` 方法時，函數内的 `this` 將會以 
**外顯方式設定** 為函數呼叫的第一個參數。

因此 *呼叫函數* 的規則在上例中已經不適用了，在`foo` 函數内 `this` 被設置成了 `bar`。

> **注意:** 在物件的字面聲明語法中，`this` **不能** 用來指向物件本身。
> 因此 `var obj = {me: this}` 中的 `me` 不會指向 `obj`，因為 `this` 只可能出現在上述的五種情况中。
> **[簡中譯者注][30]：** 這個例子中，如果是在瀏覽器中運行，`obj.me` 等於 `window` 物件。

###常見誤解

儘管大部分的情况都說的過去，不過第一個規則（ **[簡中譯者注][30]：** 這裡指的應該是第二個規則，也就是直接呼叫函數時，`this` 指向全域物件）
被認為是JavaScript語言另一錯誤設計的地方，因为它 **從來** 就没有實際的用途。

    Foo.method = function() {
        function test() {
            // this 將會被設置為全域物件（簡中譯者注：瀏覽器中也就是 window 物件）
        }
        test();
    }

一個常見的誤解是 `test` 中的 `this` 將會指向 `Foo` 物件，實際上 **不是** 這樣子的。

為了在 `test` 中獲取 `Foo` 物件，我們需要在 `method` 函數内部建立一個區域變數指向 `Foo` 物件。

    Foo.method = function() {
        var that = this;
        function test() {
            // 使用 that 来指向 Foo 对象
        }
        test();
    }

`that` 只是我們随意起的名字，不過這個名字被廣泛的用來指向外部的 `this` 物件。
在 [閉包](#function.closures) 一節，我們可以看到 `that` 可以作為參數傳遞。

###方法的賦值表達式

另一個看起來奇怪的地方是函數别名，也就是將一個方法 **賦值** 给一個變數。

    var test = someObject.methodTest;
    test();

上例中，`test` 就像一個普通的函數被呼叫；因此，函數内的 `this` 將不再被指向到 `someObject` 物件。

雖然 `this` 的後期绑定特性似乎並不友好，但這確實是[基於原型繼承](#object.prototype)而賴以生存的土壤。

    function Foo() {}
    Foo.prototype.method = function() {};

    function Bar() {}
    Bar.prototype = Foo.prototype;

    new Bar().method();

當 `method` 被呼叫時，`this` 將會指向 `Bar` 的實例。

[30]: http://cnblogs.com/sanshi/
