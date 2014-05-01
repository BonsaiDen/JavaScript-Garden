### `setTimeout` 和 `setInterval`

由於 Javascript 是一個非同步傳輸的系統，因此可以執行一個函式用 `setTimeout` 和 `setInterval`。

> **注意:** Timeouts 不在 ECMAScript 的標準中。它們是 [DOM][1] 其中的一部分

    function foo() {}
    var id = setTimeout(foo, 1000); // returns a Number > 0

當 `setTimeout` 被呼叫，它會回傳一個 ID 標準並是計畫在將來 **大約** 1000 毫秒後在在去呼叫 `foo` 函式。
`foo` 函式只會被執行 **一次**。

基於 JavaScript 引擎的計時策略，以及基本的單線程運行的方式，所以其他的程式碼可以被阻塞。
因此 **沒法確保**函式會在 `setTimeout` 指定的時可被調用。

第一個參數被函式呼叫的會在 *全域物件* 被呼叫，這代表 [`this`](#function.this)在這個函式會指向全域物件。

    function Foo() {
        this.value = 42;
        this.method = function() {
            // 指向全域
            console.log(this.value); // 會跑出 undefined
        };
        setTimeout(this.method, 500);
    }
    new Foo();

> **注意: ** `setTimeout` 第一個參數是 **參數的物件**，這是一個很常見的錯誤使用 `setTimeout(foo(), 1000)，
> 這裡會調用 `foo` 的 **return value** 而 **不是** `foo` 本身。
> 如果函式返回 `undefined` ， `setTimeout` 也不會出錯。

### `setInterval` 的堆調用

`setTimeout` 只會在函式上跑一次而已， `setInterval` - 則會在每隔 `X` 毫秒執行函式一次。但不鼓勵這種寫法。

當回傳函式的執行被阻塞時， `setInterval` 仍然會發佈更多的回傳函式。在很小的定時間隔情況像會使得回傳函式被堆疊起來。

    function foo(){
        // 執行 1 秒
    }
    setInterval(foo, 1000);

上面的程式中， `foo` 會執行一次然後被阻塞了一分鐘

在 `foo` 被阻塞的時候 `setInterval` 還是會組織將對回傳函式的調用。因此當第一次 `foo` 函式調用結束時，已經有 **10** 次函式的調用在等待執行。

### 處理可能被阻塞的調用

最簡單的解決方法，也是最容易控制的解決方法，就是在函式中使用 `setTimeout`。

    function foo(){
        // something that blocks for 1 second
        setTimeout(foo, 1000);
    }
    foo();

這樣不只封裝了 `setTimeout`，也防止了堆疊的呼叫，還有給它更多的控制。 `foo` 可以去決定要不要繼續執行。

### 手動清理 Timeouts

清除 timeouts 所產生的 ID 標準傳遞給 `clearTimeout` 或 `clearInterval` 函式來清除定時，
至於使用哪個函式取決於調用的時候使用的是 `setTimeout` 還是 `setInterval`。

    var id = setTimeout(foo, 1000);
    clearTimeout(id);

### 清除所有 Timeouts

由於沒有一個內建的方法可以一次清空所有的 timeouts 和 intervals，所以只有用暴力法來達到這樣的需求。

    // clear "all" timeouts
    for(var i = 1; i < 1000; i++) {
        clearTimeout(i);
    }

可能還有一些定時器不會在上面的代碼中被清除，因此我們可以事先保存所有的定時器 ID，然後一把清除。


    // clear "all" timeouts
    var biggestTimeoutId = window.setTimeout(function(){}, 1),
    i;
    for(i = 1; i <= biggestTimeoutId; i++) {
        clearTimeout(i);
    }

### 隱藏使用 `eval`

`setTimeout` and `setInterval` can also take a string as their first parameter.
This feature should **never** be used because it internally makes use of `eval`.

> **Note:** Since the timeout functions are **not** specified by the ECMAScript
> standard, the exact workings when a string is passed to them might differ in
> various JavaScript implementations. For example, Microsoft's JScript uses
> the `Function` constructor in place of `eval`.

    function foo() {
        // will get called
    }

    function bar() {
        function foo() {
            // never gets called
        }
        setTimeout('foo()', 1000);
    }
    bar();

Since `eval` is not getting called [directly](#core.eval) in this case, the string
passed to `setTimeout` will be executed in the *global scope*; thus, it will
not use the local variable `foo` from the scope of `bar`.

It is further recommended to **not** use a string to pass arguments to the
function that will get called by either of the timeout functions.

    function foo(a, b, c) {}

    // NEVER use this
    setTimeout('foo(1, 2, 3)', 1000)

    // Instead use an anonymous function
    setTimeout(function() {
        foo(1, 2, 3);
    }, 1000)

> **Note:** While it is also possible to use the syntax
> `setTimeout(foo, 1000, 1, 2, 3)`, it is not recommended, as its use may lead
> to subtle errors when used with [methods](#function.this).

### In Conclusion

A string should **never** be used as the parameter of `setTimeout` or
`setInterval`. It is a clear sign of **really** bad code, when arguments need
to be supplied to the function that gets called. An *anonymous function* should
be passed that then takes care of the actual call.

Furthermore, the use of `setInterval` should be avoided because its scheduler is not
blocked by executing JavaScript.

[1]: http://en.wikipedia.org/wiki/Document_Object_Model "Document Object Model"
