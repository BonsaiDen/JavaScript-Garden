## 建構函式 

JavaScript 中的建構函式和其他語言中的建構函式是不同的。
用 `new` 的關鍵字方式調用的函式都被認為是建構函式。
在建構函式內部 - 被呼叫的函式 - `this` 指向一個新建立的 `object`。[prototype](#object.prototype) 這是一個新的物件一個被指向函式的 `prototype` 的建構函式。

If the function that was called has no explicit `return` statement, then it
implicitly returns the value of `this` - the new object. 
如果被使用的函式沒有明顯的呼叫 `return` 的表達式，它會回傳一個隱性的 `this` 的新物件。

    function Foo() {
        this.bla = 1;
    }

    Foo.prototype.test = function() {
        console.log(this.bla);
    };

    var test = new Foo();

在上面的例子中 `Foo` 建立一個建構函式，並設立一個 `prototype` 來創建一個新的物件叫 `Foo.prototype`。
這個情況下它顯示的 `return` 一個表達式，但他 **只** 返回一個 `Object`。

    function Bar() {
        return 2;
    }
    new Bar(); // 返回一個新物件

    function Test() {
        this.value = 2;

        return {
            foo: 1
        };
    }
    new Test(); // 回傳物件

如果 `new` 的關鍵字被忽略，函式就 **不會** 回傳一個新的物件。

    function Foo() {
        this.bla = 1; // 獲取一個全域的參數
    }
    Foo(); // undefined

雖然上面有些情況也能正常運行，但是由於 JavaScript 中 [`this`](#funciton.this) 的工作原理，這裡的 `this` 指向 *全域對象*。

### 工廠模式

為了不使用 `new` 關鍵字，建構函式必須顯性的返回一個值。

    function Bar() {
        var value = 1;
        return {
            method: function() {
                return value;
            }
        }
    }
    Bar.prototype = {
        foo: function() {}
    };

    new Bar();
    Bar();

上面兩個呼叫 `Bar` 的方法回傳的值都一樣，一個新創建的擁有 `method` 屬性被返回，這裡創建了一個 [Closure](#function.closures).

還有注意， `new Bar()` 並 **不會** 改變返回物件的原型。
因為建構函式的原型會指向剛剛創立的新物件，而在這裡的 `Bar` 沒有把這個新物件返回。
在上面的例子中，使用或者不使用 `new` 關鍵字沒有什麼功能性的區別


### 通過工廠模式創建的新對象

常聽到建議 **不要** 使用 `new`，因為如果忘記如何使用它會造成錯誤。
為了創建一個新的物件，我們可以用工廠方法，來創造一個新的物件在那個方法中。

    function Foo() {
        var obj = {};
        obj.value = 'blub';

        var private = 2;
        obj.someMethod = function(value) {
            this.value = value;
        }

        obj.getPrivate = function() {
            return private;
        }
        return obj;
    }

雖然上面的方式比起 `new` 的調用方式更不容易出錯，並且可以充分的使用 [私有變數](#function.closures)所帶來的便利，但是還是有一些不好的地方


1.  會占用更多的記憶體，因為創建的物件 **沒有** 辦法放在在同一個原型上。
2.  為了要用繼承的方式，工廠方法需要複製所有的屬性或是把一個物件作為新的物件的原型。
3.  放棄原型鏈僅僅是因為防止遺漏 `new` 所帶來的問題，這與語言本身的思想鄉違背。

### 結語

雖然遺漏 `new` 關鍵字可能會導致問題，但這並 **不是** 放棄只用原型的藉口。
最終使用哪種方式取決於應用程式的需求，選擇一種程式語言風格並堅持下去才是最重要的。
