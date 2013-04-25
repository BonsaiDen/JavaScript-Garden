## `delete` 控制符

簡單來說，那是 *不可能* 去刪除一個全域變數，函式和其他東西在 JavaScript 中有一個 `DontDelete` 的屬性

### 全域和函式

當一個變數或是一個函式在一個全域範圍被定義或是在一個 [funciton scope](#function.scopes) ，這些屬性可能是動態的物件或是全域的物件。這些特性有一系列的屬性。其中一個就是 `DontDelete`。
在這些變數和函式的宣告都會有一個屬性叫 `DontDelete`，這會使得它無法被刪除。

    // 全域變數
    var a = 1; // DontDelete 屬性被建立
    delete a; // false
    a; // 1

    // normal function:
    function f() {} // DontDelete 屬性被建立
    delete f; // false
    typeof f; // "function"

    // reassigning doesn't help:
    f = 1;
    delete f; // false
    f; // 1

### 明確的屬性

明確的屬性可以被簡單的刪除。

    // explicitly set property:
    var obj = {x: 1};
    obj.y = 2;
    delete obj.x; // true
    delete obj.y; // true
    obj.x; // undefined
    obj.y; // undefined

在上面的例子中， `obj.x` 和 `obj.y` 可以被刪除是因為他們沒有 `DontDelete` 的屬性。
所以下面的例子也可以這樣用。

    // 可以運作，除了 IE:
    var GLOBAL_OBJECT = this;
    GLOBAL_OBJECT.a = 1;
    a === GLOBAL_OBJECT.a; // true - just a global var
    delete GLOBAL_OBJECT.a; // true
    GLOBAL_OBJECT.a; // undefined

這裡我們想要去刪除 `a`。 [`this`](#funciton.this) 這裡指向一個全域的物件，和我們明確了地定義 `a` 是它的屬性，所以可以刪除它。

IE 有些臭蟲，所以上面的程式碼無法使用（至少 6~8）

### 函式的參數和內建

函式的普通參數，[`arguments` object](#function.arguments) 還有一些內建的屬性都有 `DontDelete` 的建立

    // function 參數和屬性
    (function (x) {
    
      delete arguments; // false
      typeof arguments; // "object"
      
      delete x; // false
      x; // 1
      
      function f(){}
      delete f.length; // false
      typeof f.length; // "number"
      
    })(1);

### 接受物件
 
控制符可以接受無法預測的物件。由於一些特別的情況，會允許它能夠 `delete`

### 結語

`delete` 控制符通常都有難以預料的行為，所以我們只可以安全的刪除顯著的屬性在普通的物件上。


