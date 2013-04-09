## Array 迴圈和屬性

雖然在 Javascript 中 Array 都是 Objects，但是沒有好的理由要使用他
在 [`for in`](#object.forinloop) 的迴圈中。事實上有很多原因要避免使用 `for in` 在 Array 之中

> **注意:** Javascript Arrays **不是** *關連性 Arrays*
> 只有 [objects](#object.general) 來管理建值的相對應關係
> Arrays 是**保持** 順序的，Objects **則沒有**

因為 `for in` 迴圈會列舉所有在原型 Array 上的屬性因為他會使用[`hasOwnProperty`](#object.hasownproperty), 這會使得 Array 比原本的 `for` 迴圈慢上二十幾倍

### 迴圈

為了要達到最好的性能所以最好使用 `for` 迴圈來讀取一個 Array 裡面的數值。

    var list = [1, 2, 3, 4, 5, ...... 100000000];
    for(var i = 0, l = list.length; i < l; i++) {
        console.log(list[i]);
    }

在上面的例子中利用 `l = list.length` 來處理 Array 的長度問題。

雖然 `length` 屬性是屬於 Array 中其中一個屬性，但是他還使有一定的性能消耗在每次循環的訪問。
近期 Javascript 使用 **may** 來解決在這上面的效率問題，但是在現在的引擎上還不一定有支援。

實際上，不使用暫存 Array 長度的方式比使用暫存的版本還要慢很多。

### `length` 的屬性

`length` 屬性中的 *getter* 直接回傳在 Array 之中的程度，而 *setter* 可以用來 **刪除** Array。

    var foo = [1, 2, 3, 4, 5, 6];
    foo.length = 3;
    foo; // [1, 2, 3]

    foo.length = 6;
    foo.push(4);
    foo; // [1, 2, 3, undefined, undefined, undefined, 4]

在上面的例子可以看到，如果給的長度比較小他就會去刪除 Array 中的數值。如果比較大的話，他就會自己增加一些 `undefined` 的數值進去

### 結語

為了達到更好的效率，建議使用 `for` 迴圈還有暫存 `length` 的屬性。
而 `for in` 迴圈則是會讓程式中有更多的錯誤和性能問題。

