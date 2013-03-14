## 相等與比較

JavaScript 有兩個不同的方式來比較兩個物件是否相等。

### 等於操作符

等於操作符是由兩個等號組成: `==`

JavaScript 是一個 *弱類型* 語言。這代表它會為了比較兩個值而做 **強制類型轉換**。
    
    ""           ==   "0"           // false
    0            ==   ""            // true
    0            ==   "0"           // true
    false        ==   "false"       // false
    false        ==   "0"           // true
    false        ==   undefined     // false
    false        ==   null          // false
    null         ==   undefined     // true
    " \t\r\n"    ==   0             // true

上面的表格可以看出來這些結果強制轉換類型，這也代表說用 `==` 是一個不好的習慣，因為它會很難追蹤問題由於它複雜的規則。

此外，也有效率上面的問題在強制轉換類型。
例如說一個字串會被轉成數字來和別的數字做比較。

### 嚴格等於操作符

不像普通的等於操作符 `===` 不會做強制類型轉換。

    ""           ===   "0"           // false
    0            ===   ""            // false
    0            ===   "0"           // false
    false        ===   "false"       // false
    false        ===   "0"           // false
    false        ===   undefined     // false
    false        ===   null          // false
    null         ===   undefined     // false
    " \t\r\n"    ===   0             // false

上面的結果比較清楚，也有利於程式碼的分析。如果這兩個操作數的類型不一樣都就不會相等，有助於它性能的提昇。

### 比較物件

雖然 `==` 和 `===` 都是等於操作符，但其中有一個操作數為物件時，它的行為就會不同。

    {} === {};                   // false
    new String('foo') === 'foo'; // false
    new Number(10) === 10;       // false
    var foo = {};
    foo === foo;                 // true

在這裡等於操作符比較 **不是** 值的相等，而是否是 **相同** 的身分。
有點像 Python 的 `is` 和 C 中的指標。

### 結論

強烈建議使用 **嚴格等於**
如果要轉換類型，應該要在 [explicitly](#types.casting)的時候轉換，而不是在語言本身用複雜的轉換規則。


