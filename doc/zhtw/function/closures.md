## Closures 和 References

JavaScript 有一個很重要的特徵就是 **closures**
因為有 Closures，所以作用域 **永遠** 能夠去訪問作用區間外面的變數。
[函數區間](#function.scopes) 是JavaScript 中唯一擁有自生作用域的結構，因此 Closures 的創立需要依賴函數

### 模仿私有變數

    function Counter(start) {
        var count = start;
        return {
            increment: function() {
                count++;
            },

            get: function() {
                return count;
            }
        }
    }

    var foo = Counter(4);
    foo.increment();
    foo.get(); // 5

這裡，`Counter` 返回兩個 Closures，函數 `increment` 還有 `get`。這兩個函數都維持著對外部作用域 `Counter` 的引用，因此總可以訪問作用域的變數 `count`。


### 為什麼不可以在外部訪問私有變數

因為 Javascript **不可以** 對作用域進行引用或賦值。因此外部的地方沒有辦法訪問 `count` 變數。
唯一的途徑就是經過那兩個 Closures

    var foo = new Counter(4);
    foo.hack = function() {
        count = 1337;
    };

在上面的例子中 `count` **不會** 改變到 `Counter` 裡面的 `count` 的值。因為 `foo.hack` 沒有在 **那個** 作用域內被宣告。它只有會覆蓋或者建立在一個 **全域** 的變數 `count`

### 在循環內的 Closures 

一個常見的錯誤就是在 Closures 中使用迴圈，假設我們要使用每次迴圈中所使用的進入變數

    for(var i = 0; i < 10; i++) {
        setTimeout(function() {
            console.log(i);  
        }, 1000);
    }

在上面的例子中它 **不會** 輸出數字從 `0` 到 `9`，但只會出現數字 `10` 十次。
在 `console.log` 被呼叫的時候，這個 *匿名* 函數中保持一個 **參考** 到 i ，此時 `for`迴圈已經結束， `i` 的值被修改成了 `10`。
為了要達到想要的結果，需要在每次創造 **副本** 來儲存 `i` 的變數。

### 避免引用錯誤

為了要有達到正確的效果，最好是把它包在一個
[匿名函數](#function.scopes).

    for(var i = 0; i < 10; i++) {
        (function(e) {
            setTimeout(function() {
                console.log(e);  
            }, 1000);
        })(i);
    }

匿名外部的函數被呼叫，並把 `i` 作為它第一個參數，此時函數內 `e` 變數就擁有了一個 `i` 的拷貝。
當傳遞給 `setTimeout` 這個匿名函數執行時，它就擁有了對 `e` 的引用，而這個值 **不會** 被循環改變。
另外有一個方法也可以完成這樣的工作，那就是在匿名函數中返回一個函數，這和上面的程式碼有同樣的效果。

    for(var i = 0; i < 10; i++) {
        setTimeout((function(e) {
            return function() {
                console.log(e);
            }
        })(i), 1000)
    }

