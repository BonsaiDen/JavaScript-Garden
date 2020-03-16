## `typeof` 操作符

`typeof` 操作符 (和
[`instanceof`](#types.instanceof)) 可能是最大的設計錯誤在 JavaScript，因為它幾乎不可能從它們那裡得到想要的結果。

雖然 `instanceof` 還是有一些限制上的使用， `typeof` 只有一個實際上的運用情形，但是 **不是** 用在檢查物件的類型。

> **注意:** 由於 `typeof` 也可以像函式的語法被調用，例如 `typeof(obj)`，但這並是一個函數調用。
> 那兩個小括號只是用來計算一個表達式的值，這個返回值會作為 `typeof` 操作符的一個操作數。
> 實際上 **不存在** 名為 `typeof` 的函式。 


### JavaScript 類型表格

    Value               Class      Type
    -------------------------------------
    "foo"               String     string
    new String("foo")   String     object
    1.2                 Number     number
    new Number(1.2)     Number     object
    true                Boolean    boolean
    new Boolean(true)   Boolean    object
    new Date()          Date       object
    new Error()         Error      object
    [1,2,3]             Array      object
    new Array(1, 2, 3)  Array      object
    new Function("")    Function   function
    /abc/g              RegExp     object (function in Nitro/V8)
    new RegExp("meow")  RegExp     object (function in Nitro/V8)
    {}                  Object     object
    new Object()        Object     object

上面的表格中， *Type* 這一系列表示 `typeof` 的操作符的運算結果。可以看到，這個值的大多數情況下都返回物件。

*Class* 表示物件內部的屬性 `[[Class]]` 的值。


> **JavaScript 標準文檔中定義：** `[[Class]]`的值只可能是下面字符串中的一個：
> `Arguments`, `Array`, `Boolean`, `Date`, `Error`,
> `Function`, `JSON`, `Math`, `Number`, `Object`, `RegExp`, `String`

為了獲取對象的 `[[Class]]`，我們可以使用定義在 `Object.prototype` 上的方法 `toString`。

### 物件的類定義

JavaScript 標準文檔只給出了一種獲取 `[[Class]]` 值的方法，那就是使用 `Object.prototype.toString`。

    function is(type, obj) {
        var clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && clas === type;
    }
    
    is('String', 'test'); // true
    is('String', new String('test')); // true

上面的例子中，**`Object.prototype.toString` 用 [this](#function.this)的值來來調用被設置需要獲取 `[[Class]]` 值的物件。

> **ES5 Note:** 為了回傳 `Object.prototyp.toString` 值的方便
> `null` 和 `undefined` 被 **改變** 從 `object` 到 `null` 和 `undefined` 在 ECMAScript 5。

### 測試未定義變數

    typeof foo !== 'undefined'

上面的例子確認 `foo` 是否真的被宣告。如果沒有定義會導致 `ReferenceError` 這是 `typeof` 唯一有用的地方

### 結語

為了去檢查一個物件，強烈建議去使用 `Object.prototype.toString` 因為這是唯一可以依賴的方式。
正如上面所看到的 `typeof` 的事先返回值在標準文檔中未定義，因此不同的引擎可能不同。

除非為了檢測一個變數是否定義，我們應該避免使用 `typeof` 操作符。


