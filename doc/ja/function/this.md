## `this`はどのように動作するのか

JavaScriptの`this`と名付けられた特殊なキーワードは他のプログラム言語と違うコンセプトを持っています。JavaScriptの`this`は正確に**5個**の別々の使い道が存在しています。

### グローバルスコープとして

    this;

`this`をグローバルスコープ内で使用すると、単純に*グローバル*オブジェクトを参照するようになります。


### 関数呼び出しとして

    foo();

この`this`は、再度*グローバル*オブジェクトを参照しています。

> **ES5での注意点:** strictモードでは、このグローバルのケースは**もはや**存在していません。
> この場合`this`の代わりに`undefined`値を持つことになります。

### メソッド呼び出しとして

    test.foo(); 

この例では`this`は`test`を参照します。

### コンストラクター呼び出し

    new foo(); 

`new`キーワードが付いた関数呼び出しは[コンストラクター](#function.constructors)として機能します。関数内部では`this`は*新規に作成された*`Oject`を参照します。

### Explicit Setting of `this`

    function foo(a, b, c) {}
                          
    var bar = {};
    foo.apply(bar, [1, 2, 3]); // array will expand to the below
    foo.call(bar, 1, 2, 3); // results in a = 1, b = 2, c = 3

When using the `call` or `apply` methods of `Function.prototype`, the value of
`this` inside the called function gets **explicitly set** to the first argument 
of the corresponding function call.

As a result, the above example the *method case* does **not** apply, and `this` 
inside of `foo` will be set to `bar`.

> **Note:** `this` **cannot** be used to refer to the object inside of an `Object`
> literal. So `var obj = {me: this}` will **not** result in `me` referring to
> `obj`, since `this` only gets bound by one of the five listed cases.

### Common Pitfalls

While most of these cases make sense, the first one is to be considered another
mis-design of the language, as it **never** has any practical use.

    Foo.method = function() {
        function test() {
            // this is set to the global object
        }
        test();
    }

A common misconception is that `this` inside of `test` refers to `Foo`, while in
fact it **does not**.

In order to gain access to `Foo` from within `test` it is necessary to create a 
local variable inside of `method` which refers to `Foo`.

    Foo.method = function() {
        var that = this;
        function test() {
            // Use that instead of this here
        }
        test();
    }

`that` is just a normal variable name, but it is commonly used for the reference to an 
outer `this`. In combination with [closures](#function.closures), it can also 
be used to pass `this` values around.

### Assigning Methods

Another thing that does **not** work in JavaScript is function aliasing, that is,
**assigning** a method to a variable.

    var test = someObject.methodTest;
    test();

Due to the first case `test` now acts like a plain function call; therefore,
`this` inside it will no longer refer to `someObject`.

While the late binding of `this` might seem like a bad idea at first, it is in 
fact what makes [prototypal inheritance](#object.prototype) work. 

    function Foo() {}
    Foo.prototype.method = function() {};

    function Bar() {}
    Bar.prototype = Foo.prototype;

    new Bar().method();

When `method` gets called on a instance of `Bar`, `this` will now refer to that
very instance. 


