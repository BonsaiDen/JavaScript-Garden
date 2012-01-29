## `delete`演算子

端的に言って、JavaScriptの関数やその他の要素は`DontDelete`属性が設定されているので、グローバル変数を消去する事は*不可能*です。

### グローバルコードと関数コード

変数や、関数がグローバルまたは[関数スコープ](#function.scopes)で定義された時は、そのプロパティは有効なオブジェクトかグローバルオブジェクトになります。このようなプロパティは属性のセットを持っていますが、それらの内の1つが`DontDelete`になります。変数や関数がグローバルや関数コードで宣言されると、常に`DontDelete`属性を作るために、消去できません。

    // グローバル変数:
    var a = 1; // DontDelete属性が設定される
    delete a; // false
    a; // 1

    // 通常関数:
    function f() {} // DontDelete属性が設定される
    delete f; // false
    typeof f; // "function"

    // 再代入も役に立たない:
    f = 1;
    delete f; // false
    f; // 1

### Explicit properties

There are things which can be deleted normally: these are explicitly set 
properties.

    // explicitly set property:
    var obj = {x: 1};
    obj.y = 2;
    delete obj.x; // true
    delete obj.y; // true
    obj.x; // undefined
    obj.y; // undefined

In the example above `obj.x` and `obj.y` can be deleted because they have no 
`DontDelete` atribute. That's why an example below works too.

    // this works fine, except for IE:
    var GLOBAL_OBJECT = this;
    GLOBAL_OBJECT.a = 1;
    a === GLOBAL_OBJECT.a; // true - just a global var
    delete GLOBAL_OBJECT.a; // true
    GLOBAL_OBJECT.a; // undefined

Here we use a trick to delete `a`. [`this`](#function.this) here refers 
to the Global object and we explicitly declare variable `a` as it's property 
which allows us to delete it.

IE (at least 6-8) has some bugs, so code above doesn't work.

### Function arguments and built-ins

Functions' normal arguments, [`arguments` object](#function.arguments) 
and built-in properties also have `DontDelete` set.

    // function arguments and properties:
    (function (x) {
    
      delete arguments; // false
      typeof arguments; // "object"
      
      delete x; // false
      x; // 1
      
      function f(){}
      delete f.length; // false
      typeof f.length; // "number"
      
    })(1);

### Host objects
    
Behaviour of `delete` operator can be unpredictable for hosted objects. Due to 
specification, host objects are allowed to implement any kind of behavior. 

### In conclusion

`delete` operator often has an unexpected behaviour and can be safely used 
only for dealing with explicitly set properties on normal objects.
