## `for in` 迴圈

就像其他的 `in` 操作符一樣， `for in` 循環也進入所有在物件中的屬性

> **注意: ** `for in` 迴圈 **不會** 進入那些 `enumerable` 屬性是 `false`，舉例來說， 陣列中 `length` 的屬性
    
    // 修改 Object.prototype
    Object.prototype.bar = 1;

    var foo = {moo: 2};
    for(var i in foo) {
        console.log(i); // 輸出兩個屬性：bar 和 moo
    }

由於不可能改變 `for in` 本身的行為，因為有必要過濾出那些不希望在迴圈出現的屬性，這可以用 `Object.prototype` 原型上的 [`hasOwnProperty`](#object.hasownproperty) 的函數來完成。

> **注意: ** 由於 `for in` 總是要到所有原型鏈裡，因此如果物件的繼承層次太深的話會影響性能。


### 用 `hasOwnProperty` 來過濾

    // foo 變數是上面範例中的
    for(var i in foo) {
        if (foo.hasOwnProperty(i)) {
            console.log(i);
        }
    }

這個版本的程式碼是唯一正確的寫法。由於我們使用了 `hasOwnProperty`，這次 **只** 輸出 `moo`。
如果不只用這個程式碼在原型物件中(比如 `Object.prototype`)被擴展可能會出錯。

一個廣泛的模組 [Prototype][1]就礦展了圓型的 JavaScript 物件。
因此，但這模組包含在頁面中時，不使用 `hasOwnProperty` 過濾的 `for in` 尋難免會出問題。

### 總結

推薦 **總是** 使用 `hasOwnProperty`。不要對程式碼的環境做任何假設，不要假設原生的對象是否被擴張

[1]: http://www.prototypejs.org/

