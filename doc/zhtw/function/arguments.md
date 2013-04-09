## `arguments` 物件

所有函數在 JavaScript 中都可以有個特別的參數 `arguments`。
這個變數掌握了一列傳入函數中的參數

> **注意:** 由於 `arguments` 都已經在函數中被定義了
> 經過 `var` 定義或是用 `arguments` 宣告參數
> `arguments` 物件都不會被建立

`arguments` 物件 **不是** 一個 `Array`，雖然都有很多 Array 的語法 - 就像是 `length` 屬性 - 但是它沒有繼承來自 `Array.prototype` 事實上它繼承 `object`。

由於這些原因，這 **不可能** 用 Array 的一些功能像是 `push`、`pop`或是 `slice` 在 `arguments`。
但是像 `for` 迴圈這些迴圈都是可以用的，如果真的需要使用一些標準的 `Array` 功能可以先把它轉成真的 `Array` 再去使用。

### 轉為 Array

下面的程式可以回傳一個新的 `Array` 包含所有的元素在 `Arguments`的物件中

    Array.prototype.slice.call(arguments);

這種轉化方式比較 **慢** ，不建議使用這種作法如果再追求效率的程式中。


### 傳遞參數

下面是建議用這種方式去傳參數到另一個函數

    function foo() {
        bar.apply(null, arguments);
    }
    function bar(a, b, c) {
        // 在這裡做一些事情
    }

另一個技巧是用 `call` 和 `apply` 放在一起來創造一個更快的解綁定包裝器

    function Foo() {}

    Foo.prototype.method = function(a, b, c) {
        console.log(this, a, b, c);
    };

    // Create an unbound version of "method" 
    // 輸入的參數: this, arg1, arg2...argN
    Foo.method = function() {

        // 結果: Foo.prototype.method.call(this, arg1, arg2... argN)
        Function.call.apply(Foo.prototype.method, arguments);
    };


### 自動更新

在 `Arguments` 物件創造的 *getter* 和 *setter* 的函數方法，可以被視為原本函數的變數。

因此，改變了一個變數會跟著改變它的值而且也間接的改變稻香對應的 `arguments` 的物件，反之亦然。

    function foo(a, b, c) {
        arguments[0] = 2;
        a; // 2

        b = 4;
        arguments[1]; // 4

        var d = c;
        d = 9;
        c; // 3
    }
    foo(1, 2, 3);

### 性能

`arguments` 總是會被宣告，但除了兩個情況，一個是在一個函式中或是在其中一個參入。而不論他是否有被使用。

*getters* 和 *setter* 會永遠被創造。然而，他們對任何性能都沒有影響，除非對它的屬性有多次的訪問


> **ES5 提示:** 那些 *getters* 和 *setters* 在嚴格的模式像不會被建立

然而會有一種情況來降低 JavaScript 引擎的效能。就是使用 `arguments.callee`。

    function foo() {
        arguments.callee; // 做一些在這個函數物件
        arguments.callee.caller; // 然後呼叫這個函數物件
    }

    function bigLoop() {
        for(var i = 0; i < 100000; i++) {
            foo(); // 通常會在內聯
        }
    }

在上面的程式中， `foo` 不再是一個單存的互聯函數
因為它需要知道他自己和它的調用者。
這不僅減低了它的性能，而且還破壞的封裝

**強烈建議不要使用**  `arguments.callee` 或是其他它的屬性

> **ES5 Note:** 在嚴格的模式下 `arguments.callee` 會丟出一個 `TypeError`， 因為這種方法已經被廢除了

[1]: http://en.wikipedia.org/wiki/Inlining


