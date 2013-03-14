## 類型轉換

JavaScript 是一個 *弱類型* 的程式語言，所以在 **任何** 情況下都可以 *強制類型轉換*。

    // 這些都是真
    new Number(10) == 10; // Number.toString() is converted
                          // back to a number

    10 == '10';           // Strings gets converted to Number
    10 == '+10 ';         // More string madness
    10 == '010';          // And more 
    isNaN(null) == false; // null converts to 0
                          // which of course is not NaN
    
    // 下面都假
    10 == 010;
    10 == '-10';

> **ES5 注意:** 如果數字字面值的開頭是 `0` 它會強制轉為八進位數字解析。
> 而在 ES5 嚴格模式下，它已經被刪除了。


To avoid the issues above, use of the [strict equal operator](#types.equality) 
is **highly** recommended. Although this avoids a lot of common pitfalls, there 
are still many further issues that arise from JavaScript's weak typing system.
為了去避免上驗的事件發生，我們會用 [嚴格等於操作符](#types.equality) 這是強烈建議。
因為它可以避免很多常見的問題，但 JavaScript 的弱類型系同仍然會導致一些其他問題。

### 內置類型的建構函式

內置類型（比如 `Number` 和 `String`)在被調用時，使用或不使用 `new` 的結果完全不同。

    new Number(10) === 10;     // False, Object and Number
    Number(10) === 10;         // True, Number and Number
    new Number(10) + 0 === 10; // True, due to implicit conversion

使用內置類型 `Number` 作為建構函式會建造一個新的 `Number` 物件，而在不使用 `new` 關鍵字的 `Number` 函式更像是一個數字轉換器。

另外，在比較中引入物件的字面值會導致更加複雜的強制類型轉換。

最好的方式是比較值的 **顯示** 的轉換成最有可能的三種形態

### 轉換成字符串

    '' + 10 === '10'; // true

將一個值加上空字符串可以輕鬆轉為字符串類型。

### 轉換成一個數字

    +'10' === 10; // true

使用 **一元** 的加號操作符，可以把字符串轉為數字。

### 轉換成一個 Bool
通過使用 **否** 操作符兩字，可以把一個值轉換為 Bool。

    !!'foo';   // true
    !!'';      // false
    !!'0';     // true
    !!'1';     // true
    !!'-1'     // true
    !!{};      // true
    !!true;    // true


