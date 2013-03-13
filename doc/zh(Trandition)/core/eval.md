## 為什麼不要使用 `eval`

因為 `eval` 函數會在 Javascript 的區域性的區間執行那段程式碼。

    var foo = 1;
    function test() {
        var foo = 2;
        eval('foo = 3');
        return foo;
    }
    test(); // 3
    foo; // 1

但是， `eval` 只接受直接的呼叫而且那個函數只能叫做 `eval`，才能在一個區段中執行。

    var foo = 1;
    function test() {
        var foo = 2;
        var bar = eval;
        bar('foo = 3');
        return foo;
    }
    test(); // 2
    foo; // 3

所有的 `eval` 都應該去比免試用。有 99.9% 的使用情況都可以 **不必** 使用到而達到同等效果。
    
### 偽裝的 `eval`
 
[定時函數](#other.timeouts) `setTimeout` 和 `setInterval` 都可以接受一個字串當做他們第一個參數。這些字串 **永遠** 都會在全域範圍內執行，因此在這種情況下 `eval` 沒有被直接的使用。

### 安全上的顧慮

`eval` 同樣有安全上的問題，因為所有的程式碼都可以被直接執行。
而他不應去執行一串未知的字串或是來自不幸任的來源。

### 結語

`eval` 應該永遠不要去只用它，任何的程式在被他執行後都有性能和安全上的考慮。如果有情況需要去使用他，他都不應該列為第一順位的解決方法。

應該有更好的方法能夠去使用，但是最好都不要去使用 `eval`。

