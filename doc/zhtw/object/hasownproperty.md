## `hasOwnProperty`

為了判斷一個物件是否包含 *自定義* 屬性而 *不是* [原型](#object.prototype)上的屬性，我們需要使用繼承 `Object.prototype` 的 `hasOwnProperty` 方法。

> **注意:** 判斷一個屬性是否 `undefined` 是 **不夠的**。
> 因為一個屬性可能存在，但是它的值被設成 `undefined`。

`hasOwnProperty` 是 JavaScript 中唯一一個處理屬性但是 **不** 找原型鏈的函式。

    // 修改 Object.prototype
    Object.prototype.bar = 1;
    var foo = {goo: undefined};

    foo.bar; // 1
    'bar' in foo; // true

    foo.hasOwnProperty('bar'); // false
    foo.hasOwnProperty('goo'); // true

只有 `hasOwnProperty` 給予正確的結果，這對進入物件的屬性很有效果，**沒有** 其他方法可以用來排除原型上的屬性，而不是定義在物件 *自己* 上的屬性。

### `hasOwnProperty` 作為屬性

JavaScript **不會** 保護 `hasOwnProperty`被占用，因此如果碰到存在這個屬性，就需要使用 *外部* 的 `hasOwnProperty` 來獲取正確的結果。

    var foo = {
        hasOwnProperty: function() {
            return false;
        },
        bar: 'Here be dragons'
    };

    foo.hasOwnProperty('bar'); // 永遠返回 false

    // 使用其他對象的 hasOwnProperty，並將其上下設置為 foo
    ({}).hasOwnProperty.call(foo, 'bar'); // true

    // 也可以透過原生 Object prototype 的 hasOwnProperty 函數來達成目的
    Object.prototype.hasOwnProperty.call(foo, 'bar'); // true

### 結論

當檢查一個物件是否存在的時候， `hasOwnProperty` 是 **唯一** 可用的方法。
同時在使用 [`for in loop`](#object.forinloop)
建議使用 `hasOwnProperty` 避免 [原型](#object.prototype)所帶來的干擾。
