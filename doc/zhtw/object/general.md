## 物件的使用和屬性

每個變數可以表現像 JavaScript 物件，除了 [`null`](#core.undefined) 和 [`undefined`](#core.undefined)。

    false.toString(); // 'false'
    [1, 2, 3].toString(); // '1,2,3'
    
    function Foo(){}
    Foo.bar = 1;
    Foo.bar; // 1

一個常見的誤解就是字面值（literal）不是物件。這是因為 JavaScript 編譯器的一個錯誤，它試圖把 *點操作符* 解析為浮點數的字面值的一部分。

    2.toString(); // 出錯： SyntaxError

有很多變通方法可以讓數字的字面值看起來像物件。

    2..toString(); // 第二個點號可以正常解析
    2 .toString(); // 注意點號前面的空格
    (2).toString(); // 2 先被計算

### 物件做為數據類型

JavaScript 的物件可以作為 [*Hashmaps*][1]使用，主要用來保存命名的建與值的對應關係。

使用物件的字面語法 - `{}` - 可以創建一個簡單的物件。 這個新創建的物件從 `Object.prototype` [繼承](#object.prototype)，下面，沒有任何 [字定義屬性](#object.hasownproperty)。

    var foo = {}; // 一個空的物件

    // 一個新的物件，有值為 12 的自定義屬性 'test'
    var bar = {test: 12}; 

### 訪問屬性

有兩種訪問物件的屬性，點操作或是中括號操作。
    
    var foo = {name: 'kitten'}
    foo.name; // kitten
    foo['name']; // kitten
    
    var get = 'name';
    foo[get]; // kitten
    
    foo.1234; // SyntaxError
    foo['1234']; // works

兩種語法是相等的，但是中括號在下面兩個情況依然有效

- 動態設定屬性
- 屬性不是一個有效的變數名

### 刪除屬性

唯一刪除屬性的方式就是用 `delete` 操作符。設置屬性為 `undefined` 或是 `null` 只有刪除的屬性和值的關聯，沒有真的刪掉屬性

    var obj = {
        bar: 1,
        foo: 2,
        baz: 3
    };
    obj.bar = undefined;
    obj.foo = null;
    delete obj.baz;

    for(var i in obj) {
        if (obj.hasOwnProperty(i)) {
            console.log(i, '' + obj[i]);
        }
    }

上面的輸出結果有 `bar undefined` 和 `foo null`
只有 `baz` 真正被刪除而已，所以從輸出結果中消失。


### 屬姓名的語法

    var test = {
        'case': 'I am a keyword, so I must be notated as a string',
        delete: 'I am a keyword, so me too' // raises SyntaxError
    };

物件的屬性名可以使用字符串或是普通的宣告。但是由於 JavaScript 編譯器有個另外一個錯誤設計。
上面的兩種方式在 ECMAScript 5之前都會拋出 `SyntaxError` 的錯誤。

這個錯誤的原因是 `delete` 是 JavaScript 語言的一個 *關鍵字* 因此為了在更低的版本能執行最好用 *string literal*

[1]: http://en.wikipedia.org/wiki/Hashmap

