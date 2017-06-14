## Prototype

JavaScript 不包含傳統繼承的模型，它使用的是*原型*模型。

儘管常常有人提及 JavaScript 的缺點，但基於原型的繼承模型比傳統繼承更強大。
實現傳統的類繼承模型是很簡單。但是在 JavaScript 中實現原型的繼承模型則要困難很多。

由於 JavaScript 是唯一一個被廣泛使用的基於原型繼承的語言，所以我們必須要花時間來理解這兩者的不同。

第一個不同之處在於 JavaScript 使用 *原型鏈* 的繼承方式。

> **注意: ** 簡單的使用 `Bar.prototype = Foo.prototype` 將會導致兩個對象共享 **相同** 的原型。
>因此，改變任一個原型都會去影響到另外一個，這在大部分的時候不是想得到的結果。

    function Foo() {
        this.value = 42;
    }
    Foo.prototype = {
        method: function() {}
    };

    function Bar() {}

    // 設置 Bar 的 prototype 屬性為 Foo 的實例對象
    Bar.prototype = new Foo();
    Bar.prototype.foo = 'Hello World';

    // 修正 Bar.prototype.constructor 為 Bar 本身
    Bar.prototype.constructor = Bar;

    var test = new Bar(); // 開啟一個新的實例

    // 原型鏈
    test [instance of Bar]
        Bar.prototype [instance of Foo]
            { foo: 'Hello World', value: 42 }
            Foo.prototype
                { method: ... }
                Object.prototype
                    { toString: ... /* etc. */ }

上面的例子中，物件 `test` 會繼承來自 `Bar.prototype` 和 `Foo.prototype`。因此它可以進入來自 `Foo` 原型的方法 `method`。
同時它也可以訪問 **那個** 定義在原型上的 `Foo` 實例屬性 `value`。

要注意的是 `new Bar()` **沒有** 創立一個新的 `Foo` 實例，它重複利用的原本的 prototype。因此， `Bar` 的實例會分享到 **相同** 的 `value` 屬性。

> **注意:** **不要** 使用 `Bar.prototype = Foo`，因為這不會執行 `Foo` 的原型，而是指向函式 `Foo`。
> 因此原型鏈將回碩到 `Function.prototype` 而不是 `Foo.prototype` ，因此 `method` 將不會在 Bar 的原型鏈上。

### 屬性查詢

當查詢一個物件的屬性時，JavaScript 會 **向上** 查詢，直到查到指定名稱的屬性為止。

如果他查到原型鏈的頂部 - 也就是 `Object.prototype` - 但是仍然沒有指定的屬定，就會返回 [undefined](#core.undefined)。

### 原型屬性

當原型屬性用來建造原型鏈，它還是有可能去把 **任意** 類型的值給它

    function Foo() {}
    Foo.prototype = 1; // 無效

分派物件，在上面的例子中，將會動態的創建原型鏈。

### 效能

如果看在屬性在原型鏈的上端，對於查詢都會有不利的影響。特別的，試圖獲取一個不存在的屬性將會找遍所有原型鏈。

並且，當使用 [迴圈](#object.forinloop)找尋所有物件的屬性時，原型鏈上的 **所有** 屬性都會被訪問。

### 擴展 Native Prototype

一個經常發生的錯誤，那就是擴展 `Object.prototype` 或者是其他內建類型的原型物件。

這種技術叫做 [monkey patching][1] 並且會破壞 *封裝*。雖然被廣泛的應用到一些 Javascript 的架構，像是 [Prototype](http://prototypejs.org) ， 但仍然沒有好的理由新增一個 *非標準* 的功能去搞亂內建型別。

擴展內置類型的 **唯一** 理由是為了和新的 JavaScript 保持一致，比如說 [`Array.forEach`][3]

### 總結

在寫複雜的程式碼的時候，要 **充分理解** 所有程式繼承的屬性還有原型鏈。
還要提防原型鏈過長帶來的性能問題，並知道如何通過縮短原型鏈來提高性能。
絕對 **不要使用** `native prototype` 除非是為了和新的 JavaScript 引擎作兼容。

[1]: http://en.wikipedia.org/wiki/Monkey_patch
[2]: http://prototypejs.org/
[3]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
